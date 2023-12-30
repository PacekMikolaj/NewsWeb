import React, { useContext } from "react";
import "./AddArticle.less";
import { UserContext } from "../../UserContext";
import { Button } from "../../components/UI/Button/Button";
import { useState } from "react";
import { uploadImage } from "../../services/storageAPI";
import { Article, uploadArticle } from "../../services/articleAPI";
import { useNavigate } from "react-router-dom";

type FormDataType = {
  title: string;
  content: string;
  entry: string;
  image: File | null;
  categories: string[];
};

const AddArticle = () => {
  const { userData } = useContext(UserContext);
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
    <div className="add-article-page">
      <form className="add-article" onSubmit={handleSubmit}>
        <h1>Add Article</h1>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          required
          value={formData.title}
          onChange={handleChange}
        />
        <label htmlFor="entry">Entry</label>
        <textarea
          id="entry"
          required
          value={formData.entry}
          onChange={handleChange}
        />
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          required
          value={formData.content}
          onChange={handleChange}
        />
        <label htmlFor="image">Image</label>
        <input
          type="file"
          id="image"
          accept="image/*"
          required
          onChange={handleChange}
        />
        <label>
          <input
            type="checkbox"
            value="Student"
            checked={formData.categories.includes("Student")}
            onChange={handleCategoryChange}
          />
          Student
        </label>
        <label>
          <input
            type="checkbox"
            value="Professor"
            checked={formData.categories.includes("Professor")}
            onChange={handleCategoryChange}
          />
          Professor
        </label>
        <Button type="submit">Add Article</Button>
      </form>
    </div>
  );
};

export default AddArticle;
