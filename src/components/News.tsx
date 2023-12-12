import React from "react";

type NewsProps = {
  data: any;
};

const News: React.FC<NewsProps> = ({ data }) => {
  console.log(data);
  return <div>News</div>;
};

export default News;
