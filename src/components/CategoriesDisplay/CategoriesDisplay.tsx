import './CategoriesDisplay.less';

type CategoriesDisplayProps = {
  categories: string[]
}

const CategoriesDisplay: React.FC<CategoriesDisplayProps> = ({categories}) => {
  return (
    <div className="article-categories">
    <ul>
      {categories.map((category: string) => (
        <li className="article-categories__category">
          {category}
        </li>
      ))}
    </ul>
  </div>
  )
}

export default CategoriesDisplay
