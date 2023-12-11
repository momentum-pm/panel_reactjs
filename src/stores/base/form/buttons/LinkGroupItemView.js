import Link from "../../../../views/base/Link";
import React from "react";

export default function LinkGroupItemView({item}) {
	if (item.url) {
		return (
			<Link to={item.url} className={`link-group-item ${item.active ? 'link-group-item-active' : ''}`}>
				{item.title}
			</Link>
		)
	} else {
		return (
			<p className={`link-group-item-indicator`}>
				{item.title}
			</p>
		)
	}

}
