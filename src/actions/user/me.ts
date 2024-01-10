"use server";

import Unlock from "@/lib/models/unlock";
import User, { userValidation } from "@/lib/models/user";
import { withServerAuth } from "@/lib/utils/auth/auth";
import { saveUserAsset, saveUserAssets } from "@/lib/utils/fileUpload/fileupload";
import { validate } from "@/lib/utils/validation";
import bcrypt from "bcryptjs";

export const getMe = withServerAuth(async (session) => {
  return session.user;
});

export const updateMe = withServerAuth(async (session, updates) => {
  //validate the user
  let valErrors = {};
  if (updates.profilePicture) {
    const { url, error: pperror } = await saveUserAsset({ ...updates.profilePicture }, session?.user, {
      baseFileName: "profilepicture",
      overwrite: true,
    });
    if (pperror) {
      valErrors = {
        ...valErrors,
        profilePicture: pperror,
      };
    } else if (url) {
      updates.profilePicture = url;
    }
  }

  if (updates.images) {
    const { urls, errors } = await saveUserAssets(updates.images, session?.user, {
      subDir: "images",
    });

    if (errors) {
      valErrors = {
        ...valErrors,
        images: errors,
      };
    } else if (urls) {
      updates.images = urls;
    }
  }

  if (updates.password) {
    if (updates.password !== updates.confirmPassword) {
      valErrors = {
        ...valErrors,
        confirmPassword: "Passwords do not match",
      };
    }

    // if updates.currentPassword is not provided or incorrect
    if (!updates.currentPassword || !bcrypt.compareSync(updates.password, session?.user?.password)) {
      valErrors = {
        ...valErrors,
        currentPassword: "Incorrect password",
      };
    }
  }

  const { error, data } = await validate(updates, userValidation);

  // if there are validation errors including valErrors then return both
  if (error || Object.keys(valErrors).length > 0) {
    return { error: { ...error, ...valErrors } };
  }

  // Prepare update data for nested objects
  const updateData = Object.keys(data).reduce<Record<string, any>>((acc, key) => {
    // Check if the key is an array
    if (Array.isArray(data[key])) {
      acc[key] = data[key];
    }
    // If the key represents a nested object, use dot notation for each property
    else if (typeof data[key] === "object" && data[key] !== null) {
      Object.keys(data[key]).forEach((nestedKey) => {
        acc[`${key}.${nestedKey}`] = data[key][nestedKey];
      });
    } else {
      acc[key] = data[key];
    }
    return acc;
  }, {});

  //update the user
  delete updateData.confirmPassword;
  delete updateData.currentPassword;
  delete updateData.role;
  if (updateData.password) {
    updateData.password = bcrypt.hashSync(updateData.password, 10);
  }
  await User.updateOne({ _id: session.user._id }, { $set: updateData });

  //return the updated user
  const user = await User.findOne({ _id: session.user._id });

  return { data: user?.toObject() };
});

export const deleteMe = withServerAuth(async (session) => {
  //delete the user
  await User.deleteOne({ _id: session.user._id });

  //delete all unlcoks for the user
  await Unlock.deleteMany({ user: session.user._id });

  return { data: { message: "User deleted" } };
});

export const toggleFavorite = withServerAuth(async (session, artistId) => {
  //add the artist to the user's favorites
  const updateOp = session.user.favorites?.some((favId:any) => favId.toString() === artistId) ? "$pull" : "$addToSet";
  console.log("updateOp", updateOp);
  console.log("artistId", artistId);
  await User.updateOne({ _id: session.user._id }, { [updateOp]: { favorites: artistId } });
  return { data: { message: "Artist added to favorites" } };
});
