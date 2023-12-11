import React from "react";
import "./ItemDescription.scss";

export default function ItemDescription({children, className, ...props}) {
	return (
		<p className={`item-description ${className ? className : ''}`} {...props}>{children}</p>
	);
}
