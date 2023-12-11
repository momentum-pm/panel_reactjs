import React from "react";
import "./IconTitleValueView.scss";

export default function IconTitleValueView({icon, title, value, className, ...props}) {
	return <div className={`centered row icon-title-value-view ${className || ''}`} {...props}>
		{icon}
		{title ? <h6 className={'small icon-title-value-view-title'}>
			{title}
		</h6> : null
		}

		<p className={'small icon-title-value-view-value'}>
			{value}
		</p>
	</div>;
}
