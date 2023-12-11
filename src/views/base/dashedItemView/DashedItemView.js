import React from "react";
import "./DashedItemView.scss";
import MasterColumn from "../MasterColumn";
import Line from "../Line";
import Row from "../Row";

export default function DashedItemView({title, value, className,valueClassName}) {
	return (
		<Row className={`centered dashed-item-view ${className}`}>
			<p className={`dashed-item-title padding-one-sides`}>{title}</p>
			<MasterColumn>
				<Line className={'dashed'}/>
			</MasterColumn>
			<p className={`dashed-item-value padding-one-sides ${valueClassName}`}>{value}</p>
		</Row>
	)
}
