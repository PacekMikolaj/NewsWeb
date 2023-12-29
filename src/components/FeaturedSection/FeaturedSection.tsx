import { News } from "../../services/newsAPI";
import FeatureCard from "./FeatureCard/FeatureCard";
import "./FeaturedSection.less";
type FeaturedSectionProps = {
  newsList: any;
};

const FeaturedSection: React.FC<FeaturedSectionProps> = ({ newsList }) => {
  return (
    <section className="featured-section-container">
      <ul className="featured-section-container__list">
        {newsList.slice(0, 4).map((news: News, index: number) => (
          <FeatureCard key={index} article={news} />
        ))}
      </ul>
    </section>
  );
};

export default FeaturedSection;
