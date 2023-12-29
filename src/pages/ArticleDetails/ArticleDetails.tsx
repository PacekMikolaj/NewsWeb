import "./ArticleDetails.less";
import imageUrl from "../../assets/design.png";
import CategoriesDisplay from "../../components/CategoriesDisplay/CategoriesDisplay";
import { useEffect } from "react";
import { getNews } from "../../services/newsAPI";

const ArticleDetails = () => {
  useEffect(() => {
    getNews("9ovyHTmFn04ZpfDuTUgS").then((response) => {
      console.log(response);
    });
  }, []);
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
        Naming components in React plays a crucial role in the readability and
        maintainability of your code. Good naming conventions help developers
        understand the structure and purpose of components at a glance,
        facilitating easier navigation and modification of the codebase. Here's
        an exploration of this topic: Importance of Proper Naming Clarity:
        Clear, descriptive names convey the component's function, making the
        codebase more intuitive and less error-prone. Consistency: Consistent
        naming conventions across the project enhance uniformity, making it
        easier for team members to collaborate. Refactoring and Scalability:
        With proper naming, refactoring and scaling the application becomes more
        manageable, as it's easier to identify and modify specific components.
        Best Practices for Naming React Components Descriptive Names: Choose
        names that clearly describe the component's purpose, such as UserProfile
        or NavigationMenu. PascalCase Convention: React recommends using
        PascalCase for component names and their file names, e.g.,
        ShoppingCart.jsx. Avoid Generic Names: Names like Data or Info are too
        vague. Instead, use specific names like CustomerData or ProductInfo.
        Reflect the Domain Context: Names should reflect the business logic or
        domain, like InvoiceList for a billing application. Prefix or Suffix for
        Special Types: Use prefixes or suffixes for higher-order components,
        like withUserData, or for component types, like ButtonGroup. Component
        Hierarchy in Names: In complex projects, you can include the component
        hierarchy in the name, like SettingsPanel inside a UserProfile.
        Component File Structure and Naming Directory Structure: Organize
        components in a folder structure that mirrors the UI structure or
        feature set. Index File for Exports: Use an index.js file in each
        directory to export components, simplifying imports elsewhere. Naming in
        Large Projects In larger projects, standardize naming conventions across
        teams: UI Library Conventions: If using a UI library or design system,
        align component names with the library's terminology. Naming Guidelines
        Document: Create a document outlining naming conventions and best
        practices for new team members. Handling Common and Shared Components
        Shared Component Naming: For components used across the application,
        such as Button or Modal, keep names generic but descriptive. Folder
        Structure for Shared Components: Store these in a common folder like
        components/common or components/shared. Conclusion Effective naming in
        React not only aids in code clarity and maintenance but also contributes
        to efficient team collaboration and project scalability. By adhering to
        established best practices and being mindful of the component's role
        within the application, developers can create a codebase that is easier
        to understand, manage, and evolve. This approach to naming in React
        highlights the importance of thoughtful and systematic naming
        conventions in software development, particularly in a collaborative
        environment.
      </section>
    </article>
  );
};

export default ArticleDetails;
