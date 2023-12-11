import React from "react";

export default function List({children}) {
	return (
		<ul className={'list'}>
			{children}
		</ul>
	);
}
