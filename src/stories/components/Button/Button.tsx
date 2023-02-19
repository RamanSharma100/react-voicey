import React from "react";
import "./button.css";

interface ButtonProps {
  primary?: boolean;
  className?: string;
  backgroundColor?: string;
  size?: "small" | "medium" | "large";
  label?: string;
  FaIcon?: any;
  onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */
export const Button = ({
  primary = false,
  size = "medium",
  backgroundColor,
  label,
  className,
  FaIcon,
  ...props
}: ButtonProps) => {
  const mode = primary
    ? "storybook-button--primary"
    : "storybook-button--secondary";
  return (
    <button
      type="button"
      className={[
        "storybook-button",
        `storybook-button--${size}`,
        mode,
        className,
      ].join(" ")}
      style={{ backgroundColor }}
      {...props}
    >
      {FaIcon && <FaIcon />} {label}
    </button>
  );
};
