import React from "react";
import "./Input.less";

type InputProps = {
  type: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: JSX.Element;
  className?: string;
  required?: boolean;
  id?: string;
};

const Input: React.FC<InputProps> = ({
  type,
  placeholder,
  value,
  onChange,
  icon,
  className = "",
  required = false,
  id,
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
        id={id}
      />
  </div>
  );
};

export default Input;
