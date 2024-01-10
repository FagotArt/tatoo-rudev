import mongoose from "mongoose";
import yup from "../utils/yupExtended";

const reviewSchema = new mongoose.Schema(
  {
    description: String,
    rating: Number,
    artist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export const reviewValidation = yup
  .object()
  .shape({
    artist: yup.mixed().required(),
    user: yup.mixed().required(),
    description: yup.string().required('Description is required').max(500, "Description must be less than 500 characters"),
    rating: yup.number().required('Rating is required').min(1, 'Rating must be between 1 and 5').max(5, 'Rating must be between 1 and 5'),
  })
  .test("already-reviewed", "You have already reviewed this artist", async function (value) {
    const { artist, user } = value;
    console.log("validation values ", artist, user);
    const review = await Review.findOne({ artist: artist, user: user });
    if (review) return this.createError({ message: "You have already sent a review for this artist",path:'description' });
    return true;
  }).test("not-artist", "You cannot review yourself", async function (value) {
    const { artist, user } = value;
    if (artist?.toString() == user?.toString()) return this.createError({ message: "You cannot review yourself",path:'description' });
    return true;
  })

const Review = mongoose.models.Review || mongoose.model("Review", reviewSchema);

export default Review;
