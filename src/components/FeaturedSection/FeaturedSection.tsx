import { Article } from "../../services/articleAPI";
import FeatureCard from "./FeatureCard/FeatureCard";
import "./FeaturedSection.less";
type FeaturedSectionProps = {
  articlesList: Article[];
};

const FeaturedSection: React.FC<FeaturedSectionProps> = ({ articlesList }) => {
  return (
    <section className="featured-section-container">
      <ul className="featured-section-container__list">
        {articlesList.slice(0, 4).map((article: Article, index: number) => (
          <FeatureCard key={index} article={article} />
        ))}
      </ul>
    </section>
  );
};

export default FeaturedSection;
