import React from "react";
import ScrollableColumn from "./ScrollableColumn";

export default function SlaveScrollableColumn({children, className, ...props}) {
	return <ScrollableColumn children={children} className={`slave-column ${className || ''}`} {...props}/>
}
