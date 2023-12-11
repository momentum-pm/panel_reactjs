import React from "react";

export default function MasterColumn({children, className}) {
	return (
		<div className={`master-column ${className}`}>
			{children}
		</div>
	);
}
