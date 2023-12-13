import React, { useEffect, useState } from "react";
import { getDownloadURL, ref } from "firebase/storage";
import { firebaseStorage } from "../../../firebase";

type NewsProps = {
  data: any;
};

const News: React.FC<NewsProps> = ({ data }) => {
  const [url, setUrl ] = useState<string>("");

  useEffect(()=> {
    getDownloadURL(ref(firebaseStorage, `news_images/${data.image}`)).then((url: string) => {
      console.log(url);
      setUrl(url)
    }).catch(err => console.log(err))


  },[])

  console.log(data);
  return (
    <article className="article-preview">
            <img className="article-preview__image" width="100px" src={url} alt={url} />
            <div className="article-preview__content">
              <h3 className="article-preview__title">Article Title</h3>
              <p className="article-preview__summary">
                Summary of the article...
              </p>
              <a className="article-preview__read-more" href="#">
                Read More
              </a>
            </div>
          </article>
  )
};

export default News;
