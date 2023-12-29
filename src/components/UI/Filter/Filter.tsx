import Select from "react-select";
import "./Filter.less";

import { StylesConfig } from "react-select";

type FilterProps = {
  onChange: (e: any) => void;
  value: string;
};

const Filter: React.FC<FilterProps> = ({ onChange, value }) => {
  const options = [
    { value: value, label: value },
    { value: "", label: "All" },
  ];

  const styles: StylesConfig = {
    control: (baseStyles, state) => ({
      ...baseStyles,
      fontSize: "1.4rem",
      width: "14rem",
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

  return (
    <div className="filter-component">
      <label className="filter-component__label">Filters:</label>
      <Select
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
