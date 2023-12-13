import React, { useEffect, useState } from "react";
import { getDownloadURL, ref } from "firebase/storage";
import { firebaseStorage } from "../../../../firebase";
import "./Article.less";

type ArticleProps = {
  data: any;
};

const Article: React.FC<ArticleProps> = ({ data }) => {
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const url = await getDownloadURL(
          ref(firebaseStorage, `news_images/${data.image}`)
        );
        setUrl(url);
      } catch (err) {
        console.log(err);
      }
    };
    fetchImage();
  }, []);

  console.log(data);
  return (
    <li>
      <article className="article">
        <img className="article__image" width="200px" src={url} alt={url} />
        <div className="article__content">
          <h5 className="article__title">{data.title}</h5>
          <p className="article__summary p1">{data.context}</p>
          {/* <a className="article__read-more" href="#">
          Read More
        </a> */}
        </div>
        <div className="article__categories">
          <ul>
            {data.categories.map((category: string) => (
              <li className="article__categories__category">{category}</li>
            ))}
          </ul>
        </div>
        <div className="article__footer">
          <p className="article__footer__author">{data.author}</p>
          <p className="article__footer__date">{data.date}</p>
        </div>
      </article>
    </li>
  );
};

export default Article;
