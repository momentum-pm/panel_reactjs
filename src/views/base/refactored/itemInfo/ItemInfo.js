import React from "react";
import "./ItemInfo.scss";

export default function ItemInfo({children, className, ...props}) {
	return (
		<p className={`item-info ${className ? className : ''}`} {...props}>{children}</p>
	);
}
