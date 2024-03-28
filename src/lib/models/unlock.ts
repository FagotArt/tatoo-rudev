import mongoose from "mongoose";
import yup from "../utils/yupExtended";
import User from "./user";

const unlockSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  unlockAll: {
    type: Boolean,
    default: false,
  },
},{
  timestamps: true
});

const Unlock = mongoose.models.Unlock || mongoose.model("Unlock", unlockSchema);

const checkIfUserIsArtist = async (userId: any) => {
  const user = await User.findById(userId);
  if (!user) return false;

  if (user.role === "artist") return true;
  return false;
};

export const UnlockValidation = yup
  .object()
  .shape(
    {
      user: yup.string().required(),
      artist: yup
        .string().when('unlockAll',function([value],sch){
            if(!value) return sch.required("artist or unlockAll must be provided")
            return sch
        })
        .test("is-artist", "This User is not an Artist", async (value) => {
          if (!value) return true;
          //check if user is a valid artist
          const isArtist = await checkIfUserIsArtist(value);
          return isArtist;
        }),
      unlockAll: yup.boolean().when('artist',function([value],sch){
            if(!value) return sch.required("artist or unlockAll must be provided")
            return sch
        }),
    },
    [["artist", "unlockAll"]])
  .transform(function (value, originalValue) {
    if (value.unlockAll) {
      const { artist, ...rest } = value;
      return rest;
    }
    return value;
  })
  .test("check-unlock", "Unlock Validation Failed", async function (value) {
    const { user, artist } = value;
    // check if user already has an unlockAll
    const unlockAllExists = await Unlock.findOne({ user, unlockAll: true });
    if (unlockAllExists)
      return this.createError({
        path: "artist",
        message: "You have already unlocked all artists",
      });

    // check if user has already unlocked the artist
    const artistExists = await Unlock.findOne({ user, artist });
    if (artistExists)
      return this.createError({
        path: "artist",
        message: "You have already unlocked this artist",
      });

    return true;
  });

export default Unlock;
