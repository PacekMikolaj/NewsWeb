import React from "react";
import "./Input.less";

type InputProps = {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: any) => void;
  icon?: JSX.Element;
  className?: string;
  required?: boolean;
};

const Input: React.FC<InputProps> = ({
  type,
  placeholder,
  value,
  onChange,
  icon,
  className = "",
  required = false,
}) => {
  return (
    <div className={`${className} input-container`} style={ icon ? {
      gridTemplateColumns: "15% 85%"
    } : {
      padding: "0 1.4rem"
    }}>
      {icon}

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
  </div>
  );
};

export default Input;
