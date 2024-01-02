import Select from "react-select";
import "./Filter.less";
import { useParams } from "react-router-dom";
import { StylesConfig } from "react-select";

type FilterProps = {
  onChange: (e: any) => void;
  value: string;
};

export const styles: StylesConfig = {
  control: (baseStyles, state) => ({
    ...baseStyles,
    fontSize: "1.4rem",
    width: "16rem",
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

const Filter: React.FC<FilterProps> = ({ onChange, value }) => {
  const options = [
    { value: value, label: value },
    { value: "", label: "All" },
  ];
  const { category } = useParams<{ category: string }>();

  return (
    <div className="filter-component">
      <label className="filter-component__label">Filters:</label>
      <Select
        value={
          category
            ? { value: category, label: category }
            : { value: "", label: "All" }
        }
        placeholder="Select category"
        className="filter-component___select"
        onChange={onChange}
        options={options}
        styles={styles}
      />
    </div>
  );
};

export default Filter;
