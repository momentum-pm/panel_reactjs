import React from "react";
import "./HeaderRow.scss";
import Row from "../../Row";

export default function HeaderRow({children, className}) {
	return (
		<Row className={`centered row header-row ${className ? className : ''}`}>
			{children}
		</Row>
	);
}
