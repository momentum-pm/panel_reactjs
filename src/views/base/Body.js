import React from "react";

export default function Body({children, className,onClick}) {
	return (
		<div className={`padding-two ${className}`} onClick={onClick}>
			{children}
		</div>
	);
}
