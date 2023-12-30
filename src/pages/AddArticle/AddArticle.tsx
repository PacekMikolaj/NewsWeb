import React, { useContext, useRef } from "react";
import "./AddArticle.less";
import { UserContext } from "../../UserContext";
import { Button } from "../../components/UI/Button/Button";
import { useState } from "react";
import { uploadImage } from "../../services/storageAPI";
import { Article, uploadArticle } from "../../services/articleAPI";
import { useNavigate } from "react-router-dom";
import Input from "../../components/UI/Input/Input";
import Select, { GroupBase } from "react-select";
import { StylesConfig } from "react-select";

type FormDataType = {
  title: string;
  content: string;
  entry: string;
  image: File | null;
  category: string;
};

const styles: StylesConfig = {
  control: (baseStyles, state) => ({
    ...baseStyles,
    fontSize: "1.4rem",
    height: "4.4rem",
    cursor: "pointer",
    wordBreak: "break-word",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
  }),
  option: (baseStyles, state) => ({
    ...baseStyles,
    fontSize: "1.4rem",
    textTransform: "capitalize",
    cursor: "pointer",
  }),
  menu: (baseStyles, state) => ({
    ...baseStyles,
    zIndex: 2,
  }),
};

const AddArticle = () => {
  const { userData } = useContext(UserContext);
  const fileRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log(formData);

    if (!formData.image) return;
    let imageData;
    try {
      imageData = await uploadImage(formData.image.name, formData.image);
      console.log(imageData);
    } catch (err) {
      console.log(err);
    }
    if (!imageData) return;

    const article: Article = {
      title: formData.title,
      content: formData.content,
      entry: formData.entry,
      image: imageData.metadata.name,
      categories: formData.categories,
      author: `${userData.name} ${userData.surname}`,
      date: new Date().toISOString().substring(0, 10),
    };

    uploadArticle(article)
      .then((response) => {
        console.log(response);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(article);
  };

  const [formData, setFormData] = useState<FormDataType>({
    title: "",
    content: "",
    entry: "",
    image: null,
    categories: [],
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const value =
      (e.target as HTMLInputElement)?.type === "file"
        ? (e.target as HTMLInputElement)?.files?.[0]
        : (e.target as HTMLInputElement)?.value;
    setFormData({
      ...formData,
      [e.target.id]: value,
    });
  };

  const handleSelectChange = (e: any) => {
    setFormData({
      ...formData,
      category: e.value,
    });
  };

  const options = [
    { value: "student", label: "Student" },
    { value: "profesor", label: "Profesor" },
  ];

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const category = e.target.value;

    if (e.target.checked) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        categories: [...prevFormData.categories, category],
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        categories: prevFormData.categories.filter((c) => c !== category),
      }));
    }
  };

  return (
    <div className="add-article-container" >
      <form className="add-article" onSubmit={handleSubmit}>
        <h3 className="add-article__title">Add Article</h3>
        <div className="add-article__inputs-wrapper">
          <div className="add-article__input-wrapper">
            <label className="add-article__label" htmlFor="title">
              Title
            </label>
            <Input
              type="text"
              id="title"
              required
              value={formData.title}
              onChange={handleChange}
              className="add-article__input"
            />
          </div>
          <div className="add-article__input-wrapper">
            <label className="add-article__label" htmlFor="category">
              Category
            </label>

            <Select
              placeholder="Select category"
              styles={styles}
              id="category"
              onChange={handleSelectChange}
              options={options}
            />
          </div>
        </div>
        <div className="add-article__input-wrapper">
          <label className="add-article__label" htmlFor="entry">
            Entry
          </label>
          <textarea
            className="add-article__textarea add-article__textarea--entry"
            placeholder="Write your entry here..."
            id="entry"
            required
            value={formData.entry}
            onChange={handleChange}
          />
        </div>
        <div className="add-article__input-wrapper">
          <label className="add-article__label" htmlFor="content">
            Content
          </label>
          <textarea
            placeholder="Write your content here..."
            id="content"
            className="add-article__textarea"
            required
            value={formData.content}
            onChange={handleChange}
          />
        </div>
        <div className="add-article__input-wrapper">
          <label
            htmlFor="images"
            className="add-article__drop-container"
            id="dropcontainer"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const files = e.dataTransfer.files;
              console.log(files);
              fileRef.current?.files && (fileRef.current.files = files);

              setFormData({
                ...formData,
                image: files[0],
              });
            }}
          >
            <span className="add-article__drop-container__title">
              Drop files here
            </span>
            <span className="add-article__drop-container__subtitle">or</span>
            <input
              ref={fileRef}
              type="file"
              id="images"
              accept="image/*"
              required
            />
          </label>
        </div>

        <Button className="add-article__btn" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default AddArticle;
