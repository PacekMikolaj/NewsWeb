import "./ArticleDetails.less";
import CategoriesDisplay from "../../CategoriesDisplay/CategoriesDisplay";
import { useEffect, useState } from "react";
import { getImage } from "../../../services/storageAPI";
import { Article } from "../../../services/articleAPI";
type ArticleDetailsProps = {
  articleData: Article;
};

const ArticleDetails: React.FC<ArticleDetailsProps> = ({ articleData }) => {
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    const fetch = async () => {
      setUrl(await getImage(articleData.image));
    };
    fetch();
  }, [articleData]);

  return (
    <article className="article-details">
      <header className="article-details__header">
        <CategoriesDisplay categories={articleData.categories} />
        <h1 className="article-details__title">{articleData.title}</h1>
        <div className="article-details__metadata">
          <span className="article-details__metadata__author">
            By <span>{articleData.author}</span>
          </span>
          <time className="article-details__metadata__date">
            {articleData.date}
          </time>
        </div>
      </header>
      <figure className="article-details__figure">
        <img
          src={url}
          alt={"title"}
          className="article-details__figure__image"
        />
      </figure>
      <section className="article-details__content">
        {articleData.content}
      </section>
    </article>
  );
};

export default ArticleDetails;
