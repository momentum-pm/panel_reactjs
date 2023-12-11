import React from "react";
import "./Item.scss";

export default function Item({children, className, ...props}) {
	return (
		<li className={`item ${className || ''}`} {...props}>
			{children}
		</li>
	);
}
