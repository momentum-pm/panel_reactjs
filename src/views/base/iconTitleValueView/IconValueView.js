import React from "react";
import "./IconTitleValueView.scss";

export default function IconValueView({icon, value, className, ...props}) {
	return <div className={`row icon-title-value-view ${className || ''}`} {...props}>
		{icon}
		<div className={'icon-title-value-view-content'}>
			<p className={'small icon-value-view-value'}>
				{value}
			</p>
		</div>
	</div>;
}
