import React from "react";
import "./ItemTitle.scss";

export default function ItemTitle({children, className, ...props}) {
	return (
		<h3 className={`item-title ${className ? className : ''}`} {...props}>{children}</h3>
	);
}
