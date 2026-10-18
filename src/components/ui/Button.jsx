import React from "react";
import Link from "next/link";
import styles from "./Button.module.css";

export default function Button({
  children,
  href,
  onClick,
  variant = "primary", // "primary" | "outline" | "text"
  size = "medium",      // "small" | "medium" | "large"
  className = "",
  type = "button",
  disabled = false,
  ...props
}) {
  const buttonClasses = `${styles.btn} ${styles[variant]} ${styles[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={buttonClasses} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={buttonClasses}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
