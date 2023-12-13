import React, { forwardRef, Ref } from "react";
import "./Button.less";

type ButtonProps = {
  size?: "small" | "medium" | "large";
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
  danger?: boolean;
  round?: boolean;
  id?: string;
  disabled?: boolean;
  type?: "submit" | "reset" | "button";
  style?: React.CSSProperties;
  hidden?: boolean;
};

export const Button = forwardRef(
  (
    {
      size = "medium",
      onClick,
      className = "",
      id,
      disabled = false,
      type = "button",
      style = {},
      hidden = false,
      children,
    }: ButtonProps,
    ref: Ref<HTMLButtonElement>
  ) => {
    return (
      <button
        ref={ref}
        id={id}
        type={type}
        style={style}
        hidden={hidden}
        className={`${className} button`}
        disabled={disabled}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
);
