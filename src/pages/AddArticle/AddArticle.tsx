import React, { useContext } from "react";
import "./AddArticle.less";
import { UserContext } from "../../UserContext";
import { Button } from "../../components/UI/Button/Button";
import { useState } from "react";
import { uploadImage } from "../../services/storageAPI";

type FormDataType = {
  title: string;
  content: string;
  entry: string;
  image: File | null;
  category: string;
};

const AddArticle = () => {
  const userData = useContext(UserContext);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log(formData);

    if (!formData.image) return;
    let url;
    try {
      url = await uploadImage(formData.image.name, formData.image);
      console.log(url);
    } catch (err) {
      console.log(err);
    }
    if (!url) return;
  };

  const [formData, setFormData] = useState<FormDataType>({
    title: "",
    content: "",
    entry: "",
    image: null,
    category: "",
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

  return (
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
      <label htmlFor="content">Content</label>
      <textarea
        id="content"
        required
        value={formData.content}
        onChange={handleChange}
      />
      <label htmlFor="entry">Entry</label>
      <input
        type="text"
        id="entry"
        required
        value={formData.entry}
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
      <label htmlFor="category">Category</label>
      <select id="category" value={formData.category} onChange={handleChange}>
        <option value="student">Student</option>
        <option value="Profesor">Profesor</option>
      </select>
      <Button type="submit">Add Article</Button>
    </form>
  );
};

export default AddArticle;
