import "./ArticleDetails.less";
import imageUrl from "../../assets/design.png";
import CategoriesDisplay from "../../components/CategoriesDisplay/CategoriesDisplay";

const ArticleDetails = () => {
  return (
    <article className="article-details">
      <header className="article-details__header">
        <CategoriesDisplay categories={["Student", "Profesor"]} />
        <h1 className="article-details__title">
          Naming components in React is an important aspect of your code's
          readability and maintainability.
        </h1>
        <div className="article-details__metadata">
          <span className="article-details__metadata__author">
            By <span>Dominik Wędzina</span>
          </span>
          <time className="article-details__metadata__date">20.12.2023</time>
          <span className="article-details__metadata__comments-count">
            {" "}
            '23' Comments
          </span>
          <span className="article-details__metadata__read-time">
            '23' Minutes Read
          </span>
        </div>
      </header>
      <figure className="article-details__figure">
        <img
          src={imageUrl}
          alt={"title"}
          className="article-details__figure__image"
        />
      </figure>
      <section className="article-details__content">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
        tempore, ab ea velit nobis consectetur dolorem harum temporibus facilis
        nostrum cum necessitatibus debitis, doloremque ex corrupti deleniti
        veniam culpa explicabo. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Sapiente tempore, ab ea velit nobis consectetur
        dolorem harum temporibus facilis nostrum cum necessitatibus debitis,
        doloremque ex corrupti deleniti veniam culpa explicabo. Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Sapiente tempore, ab ea
        velit nobis consectetur dolorem harum temporibus facilis nostrum cum
        necessitatibus debitis, doloremque ex corrupti deleniti veniam culpa
        explicabo. Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Sapiente tempore, ab ea velit nobis consectetur dolorem harum temporibus
        facilis nostrum cum necessitatibus debitis, doloremque ex corrupti
        deleniti veniam culpa explicabo. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Sapiente tempore, ab ea velit nobis consectetur
        dolorem harum temporibus facilis nostrum cum necessitatibus debitis,
        doloremque ex corrupti deleniti veniam culpa explicabo. Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Sapiente tempore, ab ea
        velit nobis consectetur dolorem harum temporibus facilis nostrum cum
        necessitatibus debitis, doloremque ex corrupti deleniti veniam culpa
        explicabo.
      </section>
    </article>
  );
};

export default ArticleDetails;
