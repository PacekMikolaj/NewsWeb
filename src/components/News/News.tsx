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
  return <div>News
    <img width="200px" src={url} alt={url}/>

  </div>;
};

export default News;
