import React from "react";

export default function Row({children, className}) {
	return (
		<div className={`row ${className ? className : ''}`}>
			{children}
		</div>
	);
}
