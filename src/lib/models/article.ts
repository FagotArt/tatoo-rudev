import mongoose from "mongoose";
import yup from "../utils/yupExtended";

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

articleSchema.index({ title: "text", content: "text" });

const Article = mongoose.models.Article || mongoose.model("Article", articleSchema);

export const articleValidation = yup.object().shape({
  title: yup.string().required().min(3, "title must be at least 3 characters long").max(100, "title must be no more than 100 characters"),
  slug: yup
    .string()
    .required()
    .min(3, "slug must be at least 3 characters long")
    .max(100, "slug must be no more than 100 characters")
    .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "slug may include letters, numbers, and dashes")
    .test("unique-slug", "There's already an article with this slug", async (value,{options}:any) => {
      console.log(options?.context)
      if(!options?.context.checkDatabase) return true;
      const article = await Article.findOne({ slug: value });
      return !article;
    }),
  description: yup.string().nullable(),
  content: yup.string().required("content is required"),
  author: yup.string().required(),
  image: yup.string().required(),
});

export default Article;
