import React, { useEffect, useState } from "react";
import "./ArticleMedium.less";
import noImage from "../../../assets/no-image.jpg";
import { fetchImage } from "../../../App";
type ArticleMediumProps = {
  data: any;
};

const ArticleMedium: React.FC<ArticleMediumProps> = ({ data }) => {
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    const fetch = async () => {
      setUrl(await fetchImage(data));
    }
    fetch();
  }, []);

  console.log(data);
  return (
    <li>
      <article className="article-medium">
        <img className="article-medium__image" width="200px" src={url !== "" ? url : noImage} alt={url} />
        <div className="article-medium__content">
          <h5 className="article-medium__title">{data.title}</h5>
          <p className="article-medium__summary p1">{data.entry}</p>
          {/* <a className="article__read-more" href="#">
          Read More
        </a> */}
        <div className="article-medium__categories">
          <ul>
            {data.categories.map((category: string) => (
              <li className="article-medium__categories__category">{category}</li>
            ))}
          </ul>
        </div>
        <footer className="article-medium__footer">
          <p className="article-medium__footer__author">{data.author}</p>
          <p className="article-medium__footer__date">{data.date}</p>
        </footer>
        </div>
      </article>
    </li>
  );
};

export default ArticleMedium;
