import React from "react";

export default function Column({children, className}) {
	return (
		<div className={`column ${className ? className : ''}`}>
			{children}
		</div>
	);
}
