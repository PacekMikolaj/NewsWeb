import React, { useContext, useRef } from "react";
import "./AddArticle.less";
import { UserContext } from "../../UserContext";
import { Button } from "../../components/UI/Button/Button";
import { useState } from "react";
import { uploadImage } from "../../services/storageAPI";
import { Article, uploadArticle } from "../../services/articleAPI";
import { useLoaderData, useNavigate } from "react-router-dom";
import Input from "../../components/UI/Input/Input";
import image from "../../assets/add2.svg";
import { getAllUsers } from "../../services/userAPI";
import { User } from "../../services/userAPI";
import Select, { MultiValue, StylesConfig } from "react-select";
import { addNotification } from "../../services/notificationsAPI";
import { Notification } from "../../services/notificationsAPI";

type FormDataType = {
  title: string;
  content: string;
  entry: string;
  image: File | null;
  categories: string[];
};

export const selectStyles: StylesConfig = {
  control: (baseStyles, state) => ({
    ...baseStyles,
    fontSize: "1.4rem",
    // width: "32rem",
    maxWidth: "48rem",
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
    width: "14rem",
  }),
  menu: (baseStyles, state) => ({
    ...baseStyles,
    zIndex: 2,
    width: "14rem",
  }),
};

const AddArticle = () => {
  const { userData } = useContext(UserContext);
  const allUsersList = useLoaderData() as User[];
  const fileRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const usersToNotificate = useRef<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.image) return;
    let imageData;
    try {
      imageData = await uploadImage(formData.image.name, formData.image);
    } catch (err) {
      console.log(err);
      return;
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

    let articleId = "";

    try {
      const addedArticle = await uploadArticle(article);
      articleId = addedArticle.id;
    } catch (err) {
      console.log(err);
      return;
    }

    if (usersToNotificate.current.length === 0) return;
    const notification: Notification = {
      content: article.title,
      date: article.date,
      author: article.author,
      users: usersToNotificate.current,
      articleId: articleId,
    };

    try {
      await addNotification(notification);
      navigate("/");
    } catch (err) {
      console.log(err);
      return;
    }
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

  const handleSelectChange = (e: MultiValue<unknown>) => {
    usersToNotificate.current = e.map(
      (user: unknown) => (user as { value: string }).value
    );
  };

  const handleInputFileChange = (
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
    <div className="add-article-container">
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
              Choose category
            </label>
            <div className="add-article__checkboxes-wrapper">
              <div className="add-article__checkbox-wrapper">
                <input
                  id="category-1"
                  className="add-article__checkbox-wrapper__checkbox"
                  type="checkbox"
                  value="Student"
                  checked={formData.categories.includes("Student")}
                  onChange={handleCategoryChange}
                />
                <label
                  htmlFor="category-1"
                  className="add-article__checkbox-wrapper__label"
                >
                  Student
                </label>
              </div>
              <div className="add-article__checkbox-wrapper">
                <input
                  className="add-article__checkbox-wrapper__checkbox"
                  id="category-2"
                  type="checkbox"
                  value="Professor"
                  checked={formData.categories.includes("Professor")}
                  onChange={handleCategoryChange}
                />
                <label
                  htmlFor="category-2"
                  className="add-article__checkbox-wrapper__label"
                >
                  Professor
                </label>
              </div>
            </div>
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
            onChange={handleInputFileChange}
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
              type="file"
              id="image"
              accept="image/*"
              required
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="add-article__input-wrapper">
          <label className="add-article__label" htmlFor="notification">
            Select users to notificate{" "}
          </label>
          <Select
            placeholder="Select users"
            className="add-article__select"
            isMulti
            styles={selectStyles}
            onChange={handleSelectChange}
            options={allUsersList.map((user) => ({
              value: user.id,
              label: `${user.name} ${user.surname}`,
            }))}
          />
        </div>

        <Button className="add-article__btn" type="submit">
          Submit
        </Button>
      </form>
      <img
        className="add-article-container__image"
        src={image}
        alt="add article iamge"
      />
    </div>
  );
};

export const loader = async () => {
  return await getAllUsers();
};

export default AddArticle;
