import React from "react";
import "./Box.scss";

export default function Box({children, className, ...props}) {
	return (
		<div className={`box ${className ? className : ''}`} {...props}>
			{children}
		</div>
	);
}
