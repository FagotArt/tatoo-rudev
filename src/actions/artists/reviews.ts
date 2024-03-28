"use server";

import { User } from "@/lib/models";
import Review, { reviewValidation } from "@/lib/models/review";
import { withServerAuth } from "@/lib/utils/auth/auth";
import { validate } from "@/lib/utils/validation";

export const addReview = withServerAuth(async (session, review) => {
  review.user = session.user._id;

  const { error, data } = await validate(review, reviewValidation);
  if (error) {
    return { error: error };
  }

  const newReview = new Review(data);
  await newReview.save();

  //update artist averageRating
  const artist = await User.findById(review.artist);
  const aggregation = await Review.aggregate([{ $match: { artist: artist._id } }, { $group: { _id: null, average: { $avg: "$rating" } } }]);

  // Check if aggregation result exists and update the averageRating
  if (aggregation && aggregation.length > 0) {
    artist.averageRating = aggregation[0].average;
  }
  artist.totalRatings = await Review.countDocuments({ artist: artist._id });
  await artist.save();

  return { data: newReview?.toObject() };
});

export const getReviews = async (artistId: any) => {
  const reviews = await Review.find({ artist: artistId }).populate("user", "-password -contactInfo");
  return reviews?.map((review) => review.toObject());
};
