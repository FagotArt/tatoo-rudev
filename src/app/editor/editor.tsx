"use client";
import { publishArticle, updateArticle } from "@/actions/admin/editor";
import { deleteArticle, getArticles } from "@/actions/articles/articles";
import Button from "@/components/ui/Button";
import ErrorMessage from "@/components/ui/errormessage";
import InfoToolTip from "@/components/ui/infoTooltip";
import Input from "@/components/ui/input";
import Loader from "@/components/ui/loader";
import { PortfolioImage } from "@/components/ui/portfolioeditor";
import { Tab, TabContent } from "@/components/ui/tab";
import TextArea from "@/components/ui/textarea";
import { confirm, modal } from "@/lib/utils/modal";
import dynamic from "next/dynamic";
import Link from "next/link";
import React, { useEffect, useMemo, useRef, useState } from "react";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");

    const DynamicQuill = ({ forwardedRef, ...props }: any) => <RQ ref={forwardedRef} {...props} />;
    DynamicQuill.displayName = "DynamicQuill";

    return DynamicQuill;
  },
  {
    ssr: false, // This line is important. It's what prevents server-side render
    loading: () => (
      <div className="w-full h-full flex justify-center items-center">
        <Loader />
      </div>
    ), // Optional loading component
  }
);

const Editor = () => {
  const [article, setArticle] = useState<any>({ content: "", author: "inkformed" });
  const [errors, setErrors] = useState<any>();
  const [currentTab, setCurrentTab] = useState<any>("New Article");
  const [articles, setArticles] = useState<any>([]);
  const quillRef = useRef<any>(null);

  const fetchArticles = async () => {
    const articles = await getArticles();

    setArticles(articles);
  };
  useEffect(() => {
    fetchArticles();
  }, []);

  const handleContentChange = (content: any) => {
    setArticle({
      ...article,
      content,
    });
  };

  const publish = async () => {
    const pubfunc  = article?._id ? updateArticle : publishArticle;
    const { error, article: published, url } = await pubfunc(article);
    if (error) {
      console.log(error);
      setErrors(error);
    } else {
      setErrors(null);
      setArticle({
        ...article,
        content: "",
        description: "",
        slug: "",
        title: "",
      });
      quillRef.current.getEditor().setContents("");

      const fullUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/articles/${published.slug}`;
      await modal({
        Element: () => (
          <div className="font-['Helvetica']">
            <div>
              Your article <strong>&apos;{published.title}&apos;</strong> was {article?._id ? 'edited' : 'published successfully'}!
            </div>
            <div>
              you can view it at{" "}
              <Link className="text-black/70" href={fullUrl}>
                {fullUrl}
              </Link>
            </div>
          </div>
        ),
      });

      fetchArticles();
    }
  };

  const handleInputChange = (field: any) => (event: any) => {
    if (field === "title") {
      setArticle({
        ...article,
        title: event.target.value,
        slug: event.target.value
          .toLowerCase()
          .replace(/[^\w ]+/g, "")
          .replace(/ +/g, "-"),
      });
    } else {
      setArticle({
        ...article,
        [field]: event.target.value,
      });
    }
  };

  function imageHandler() {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];

      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => {
          const base64 = reader.result?.toString();
          const filename = file.name;

          let existingDelta = quillRef.current.getEditor().getContents();
          let combinedDelta = existingDelta.concat({
            ops: [
              {
                attributes: {
                  alt: filename,
                },
                insert: {
                  image: base64,
                },
              },
            ],
          });
          quillRef.current.getEditor().setContents(combinedDelta);
        };
      }
    };
  }

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, false] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
          ["link", "image"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    }),
    []
  );

  const selectImage = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];

      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = (event: any) => {
          const base64 = event.target.result;
          const filename = file.name;

          setArticle({
            ...article,
            image: {
              type: "file",
              fileName: filename,
              file: base64,
            },
          });
        };
      }
    };
  };

  const removeImage = (e: any) => {
    e.stopPropagation();
    setArticle({
      ...article,
      image: null,
    });
  };

  const handleDeleteArticle = async (id: any) => {
    const conf = await confirm({
      confirmation: "Are you sure you want to delete this article?",
    });
    if (conf) {
      const res = await deleteArticle(id);
      fetchArticles();
    }
  };

  return (
    <div className="px-[1rem]">
      <div className="flex mb-[2rem]">
        <Tab currentTab={currentTab} setTab={setCurrentTab}>
          New Article
        </Tab>
        <Tab currentTab={currentTab} setTab={setCurrentTab}>
          Articles
        </Tab>
      </div>
      <TabContent currentTab={currentTab} tabName="New Article">
        <div className="flex flex-col gap-[1rem] mb-[2rem]">
          <div className="flex gap-[1rem] items-center">
            <Input error={errors?.title} value={article.title} onChange={handleInputChange("title")} label="Title:" />
            <InfoToolTip>This is the title of the article. It will be displayed on the article page and in the article list.</InfoToolTip>
          </div>
          <div className="flex gap-[1rem] items-center">
            <Input error={errors?.slug} value={article.slug} onChange={handleInputChange("slug")} label="slug:" />
            <InfoToolTip>This is the slug of the article. It is used to give the article a unique and SEO friendly url.</InfoToolTip>
          </div>
          <div className="flex gap-[1rem] items-center">
            <Input error={errors?.author} value={article.author} onChange={handleInputChange("author")} label="author:" />
            <InfoToolTip>This is the author of the article. defaults to inkformed.</InfoToolTip>
          </div>
          <div className="flex gap-[1rem] items-center">
            <div>
              <div className="text-white">Description:</div>
              <TextArea error={errors?.description} value={article.description} onChange={handleInputChange("description")} className="min-w-[250px]" />
            </div>
            <InfoToolTip>This is the description of the article. It will be displayed on the article page and in the article list.</InfoToolTip>
          </div>
          <div>
            <div className="text-white mb-[10px]">Article Image:</div>
            <PortfolioImage
              error={errors?.image}
              className="w-[300px] h-[300px]"
              onClick={selectImage}
              onRemove={removeImage}
              image={article.image ? (typeof article.image === "string" ? article.image : article.image.file) : null}
              edit
            />
          </div>
        </div>
        <div className="relative">
          <ReactQuill forwardedRef={quillRef} modules={modules} className=" bg-white mb-[10px] rounded-[10px] text-black" value={article.content} onChange={handleContentChange} />
        </div>
        {errors?.content && errors?.content !== "" && <ErrorMessage className="mb-[2rem]">{errors?.content}</ErrorMessage>}
        <div>
          <Button onClick={publish} className="px-[2rem]">
            Publish
          </Button>
        </div>
      </TabContent>
      <TabContent currentTab={currentTab} tabName="Articles">
        <div className="flex flex-col gap-[1rem]">
          {articles?.map((item: any, i: any) => {
            return (
              <div key={i} className="p-[1rem] max-w-[500px] rounded-[1rem] border-[1px] border-white/30">
                <div className="font-bold text-[1.5rem]">{item.title}</div>
                <div className="mb-[1rem]">{item.description}</div>
                <div className="flex gap-[1rem]">
                  <Button
                    onClick={() => {
                      setArticle(item);
                      setCurrentTab("New Article");
                    }}
                  >
                    Edit
                  </Button>
                  <Button onClick={() => handleDeleteArticle(item._id)}>Delete</Button>
                </div>
              </div>
            );
          })}
        </div>
      </TabContent>
    </div>
  );
};

export default Editor;
