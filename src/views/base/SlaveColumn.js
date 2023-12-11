import React from "react";

export default function SlaveColumn({children,className}) {
	return (
		<div className={`slave-column  ${className}`}>
			{children}
		</div>
	);
}
