import React from "react";
import IconTitleValueView from "../iconTitleValueView/IconTitleValueView";

export default function TitleValueView({title, value, className, ...props}) {
	return <IconTitleValueView icon={null} title={title} value={value} className={className} {...props}/>;
}
