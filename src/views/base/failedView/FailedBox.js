import React from "react";
import Res from "../../../assets/Res";
import Header from "../refactored/header/Header";
import Box from "../refactored/box/Box";
import FailedView from "./FailedView";
import Row from "../Row";
import MasterColumn from "../MasterColumn";
import Page from "../Page";

export default function FailedBox({message, reload}) {
	return (
		<Page>
			<Row>
				<MasterColumn>

				</MasterColumn>
				<MasterColumn>
					<Box className={'inline-half-row-responsive'}>
						<Header className={'center'}>{Res.string.attention}</Header>
						<FailedView message={message} reload={reload}/>
					</Box>
				</MasterColumn>
				<MasterColumn>

				</MasterColumn>

			</Row>
		</Page>
	);
}
