import React from "react";

export default function Page({children,className}) {
	return (
		<div className={`full-height ${className}`}>
			<div className={'full-height container'}>
				{children}
			</div>
		</div>
	);
}
