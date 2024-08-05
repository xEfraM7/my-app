import { ArticleInterface } from "@/types/FormTypes";
import { useCallback } from "react";

type Article = {
  id: string;
  nameItem: string;
  quantity: string;
  price: string;
};

const useArticles = (
  watch: () => { articles: Article[] },
  setValue: (key: string, value: any) => void
) => {
  const handleChangeArticle = useCallback(
    (article: Article) => {
      const articleExist =
        watch().articles.find((e: Article) => e.id === article.id) !==
        undefined;
      if (articleExist) {
        setValue(
          "articles",
          watch().articles.map((e: Article) =>
            e.id === article.id ? article : e
          )
        );
      } else {
        setValue("articles", [...watch().articles, article]);
      }
    },
    [watch, setValue]
  );

  const handleRemoveArticle = useCallback(
    (article: Article) => {
      setValue(
        "articles",
        watch().articles.filter((e: Article) => e.id !== article.id)
      );
    },
    [watch, setValue]
  );

  return { handleChangeArticle, handleRemoveArticle };
};

export default useArticles;
