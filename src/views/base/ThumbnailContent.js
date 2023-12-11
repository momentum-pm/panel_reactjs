import React from "react";

export default function ThumbnailContent({children,className}) {
	return (
		<div className={`main-flex ${className || ''}`}>
			{children}
		</div>
	);
}
