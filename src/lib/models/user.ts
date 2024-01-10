import mongoose from "mongoose";
import yup from "@/lib/utils/yupExtended";

const userSchema = new mongoose.Schema({
  profilePicture: {
    type: String,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
  },
  favorites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  role: {
    type: String,
    enum: ["artist", "user", "admin"],
    default: "user",
  },
  averageRating: {
    type: Number,
    default: 0,
  },
  totalRatings: {
    type: Number,
    default: 0,
  },
  images: [String],
  styles: [String],
  tattooType: {
    type: String,
  },
  gender: {
    type: String,
  },
  location: {
    type: String,
  },
  hourlyRate: {
    type: Number,
  },
  walkInsAccepted: {
    type: Boolean,
  },
  contactInfo: {
    email: String,
    phone: String,
    facebook: String,
    instagram: String,
  },
  settings: {
    newsletter: {
      type: Boolean,
      default: false,
    },
  },
});

userSchema.index({ firstName: "text", lastName: "text", username: "text" });

const User = mongoose.models.User || mongoose.model("User", userSchema);

export const userValidation = yup.object().shape({
  profilePicture: yup.string().nullable(),
  firstName: yup
    .string()
    .ifrequired("First name is required")
    .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ ,.'-]+$/i, "First name may include letters and common special characters")
    .min(2, "First name must be at least 2 characters")
    .max(20, "First name must be no more than 20 characters"),

  lastName: yup
    .string()
    .ifrequired("Last name is required")
    .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ ,.'-]+$/i, "Last name may include letters and common special characters")
    .min(2, "Last name must be at least 2 characters")
    .max(20, "Last name must be no more than 20 characters"),

  username: yup
    .string()
    .ifrequired("Username is required")
    .matches(/^\S*$/, "No spaces allowed")
    .matches(/^[A-Za-z0-9]{3,20}$/, "Username must be 3-20 characters, no special characters")
    .test("Unique Username", "Username already in use", async (username) => {
      if (!username) return true;
      const lowercaseUsername = username.toLowerCase();
      const existingUser = await User.findOne({ username: { $regex: new RegExp("^" + lowercaseUsername + "$", "i") } });
      return !existingUser;
    }),

  email: yup
    .string()
    .ifrequired("Email is required")
    .email("Must be a valid email")
    .matches(/^\S*$/, "No spaces allowed")
    .test("Unique Email", "Email already in use", async (email) => {
      if (!email) return true;
      const lowercaseEmail = email.toLowerCase();
      const existingUser = await User.findOne({ email: { $regex: new RegExp("^" + lowercaseEmail + "$", "i") } });
      return !existingUser;
    }),

  password: yup
    .string()
    .ifrequired("Password is required")
    .password()
    .min(8, "Password must be at least 8 characters")
    .minUppercase(1, "Password must have at least one uppercase letter")
    .minLowercase(1, "Password must have at least one lowercase letter")
    .minNumbers(1, "Password must have at least one number")
    .minSymbols(0, "Password can contain symbols")
    .matches(/^\S*$/, "Password cannot contain spaces"),
  bio: yup.string().nullable().max(500, "Bio must be no more than 500 characters"),
  role: yup.string().oneOf(["artist", "user", "admin"], "Invalid role"),
  images: yup.array().of(yup.string()).nullable(),
  gender: yup.string().oneOf(["m", "f"], "Invalid gender"),
  tattooType: yup.string(),
  location: yup.string(),
  hourlyRate: yup.number(),
  walkInsAccepted: yup.boolean(),
  styles: yup.array().of(yup.string()),
  contactInfo: yup.object().shape({
    email: yup.string().email("Must be a valid email"),
    phone: yup.string().matches(/^\S*$/, "No spaces allowed"),
    facebook: yup.string().matches(/^\S*$/, "No spaces allowed"),
    instagram: yup.string().matches(/^\S*$/, "No spaces allowed"),
  }),
  settings: yup.object().shape({
    newsletter: yup.boolean(),
  }),
});

export default User;
