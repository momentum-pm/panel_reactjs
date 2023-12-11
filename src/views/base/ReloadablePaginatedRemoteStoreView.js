import React from "react";
import PaginatedRemoteStoreView from "./PaginatedRemoteStoreView";
import Box from "./refactored/box/Box";
import Body from "./Body";
import Row from "./Row";
import MasterColumn from "./MasterColumn";
import ButtonView from "./forms/button/ButtonView";

export default class ReloadablePaginatedRemoteStoreView extends PaginatedRemoteStoreView {


	getHeaderView() {
		return (
			<Box>
				<Body>
					<Row>
						<MasterColumn>

						</MasterColumn>
						<ButtonView id={this.getState().reloadButton.id}/>
					</Row>
				</Body>
			</Box>
		)
	}


}
