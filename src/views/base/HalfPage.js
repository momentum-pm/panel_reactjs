import React from "react";
import Row from "./Row";
import SlaveColumn from "./SlaveColumn";
import MasterColumn from "./MasterColumn";

export default function HalfPage({children}) {
	return (
		<Row>
			<SlaveColumn/>
			<MasterColumn>
				{children}
			</MasterColumn>
			<SlaveColumn/>
		</Row>
	);
}
