import React from "react";
import ScrollableColumn from "./ScrollableColumn";

export default function MasterScrollableColumn({children, className, ...props}) {
	return <ScrollableColumn children={children} className={`master-column ${className || ''}`} {...props}/>
}
