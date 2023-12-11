import React from "react";
import "./Header.scss";

export default function Header({children, className}) {
	return (
		<h2 className={`header ${className ? className : ''}`}>{children}</h2>
	);
}
