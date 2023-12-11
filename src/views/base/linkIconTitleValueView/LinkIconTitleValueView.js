import React from "react";
import IconTitleValueView from "../iconTitleValueView/IconTitleValueView";

export default function LinkIconTitleValueView({href, icon, title, value, className}) {
	return <a href={href} target={'_blank'} rel={'noopener noreferrer'}>
		<IconTitleValueView
			icon={icon}
			title={title}
			value={value}
			className={`clickable ${className}`}/>
	</a>
}
