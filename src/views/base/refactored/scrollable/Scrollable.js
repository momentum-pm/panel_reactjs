import React from "react";
import "./Scrollable.scss";

export default function Scrollable({ children, className, ref, ...props }) {
  return (
    <div ref={ref} className={`scrollable ${className || ""}`} {...props}>
      {children}
    </div>
  );
}
