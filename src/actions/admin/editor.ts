"use server";

import Article, { articleValidation } from "@/lib/models/article";
import { withServerAuth } from "@/lib/utils/auth/auth";
import { saveFile } from "@/lib/utils/fileUpload/fileupload";
import { validate } from "@/lib/utils/validation";
import { JSDOM } from "jsdom";

const processContent = async (content: string,dir?:any) => {
  const dom = new JSDOM(content);
  const document = dom.window.document;
  const images = document.querySelectorAll("img");

  //@ts-ignore
  for (const img of images) {
    if (img.src.startsWith("data:image")) {
      const base64 = img.src.split(",")[1];
      const filename = img.alt;

      const { url, error } = await saveFile(base64, filename, {
        Dir: dir || "",
      });

      img.src = url;
      img.removeAttribute("alt");
    }
  }

  return document.body.innerHTML;
};

export const publishArticle = withServerAuth(
  async (session, article) => {
    
    if(article.image && typeof article.image === "object"){
      const { url, error } = await saveFile(article.image.file, article.image.fileName, {
        Dir: `assets/articles/${article.slug}`,
        baseFileName: "featured",
        overwrite: true,
      });

      article.image = url;
    }    
    
    const { error, data } = await validate(article, articleValidation, {
      castToSchema: true,
    });

    if (error) {
      return {
        error,
      };
    }

    //separate images and save them
    const content = await processContent(data.content,`assets/articles/${data.slug}`);
    data.content = content;

    //save article
    const dbArticle = new Article(data);
    await dbArticle.save();

    //return article info
    return {
      article: dbArticle,
      url: `/assets/articles/${dbArticle.slug}`,
    };
  },
  {
    roles: ["admin"],
  }
);
