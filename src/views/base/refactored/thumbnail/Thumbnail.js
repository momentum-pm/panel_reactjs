import React from "react";
import "./Thumbnail.scss";

export default function Thumbnail({src, alt, placeholder, className, svg, ...props}) {
	if (svg) {
		return <div className={`thumbnail ${className}`}>{svg}</div>
	}
	return (
		<img className={`thumbnail ${src ? 'has-src' : ''} ${className}`} alt={alt}
			 src={src ? src : placeholder} {...props}/>
	)

}
