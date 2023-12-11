import React from "react";
import "./ScrollableColumn.scss";

export default function ScrollableColumn({children, className, ...props}) {
	return <div className={`scrollable-column ${className || ''}`} {...props}>
		{children}
	</div>
}
