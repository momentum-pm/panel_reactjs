import React from "react";
import "./RichText.scss";

export default function ReachText({children, className}) {
	return <div className={`rich-text ${className || ''}`} dangerouslySetInnerHTML={{__html: children}}/>
}
