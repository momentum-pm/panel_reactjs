import React from "react";
import Box from "./refactored/box/Box";
import Row from "./Row";
import MasterColumn from "./MasterColumn";
import SlaveColumn from "./SlaveColumn";

export default function HalfPageBox({children}) {
	return (
		<Row className={'centered'}>
			<SlaveColumn/>
			<MasterColumn>
				<Box>
					{children}
				</Box>
			</MasterColumn>
			<SlaveColumn/>
		</Row>
	);
}
