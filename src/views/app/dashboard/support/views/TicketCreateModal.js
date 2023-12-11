import {connect} from "../../../../../stores/base/StoreManager";
import TicketCreateForm from "../stores/TicketCreateForm";
import React from "react";
import ScrollableFormBox from "../../../../base/forms/ScrollableFormBox";
import Row from "../../../../base/Row";

class TicketCreateModal extends ScrollableFormBox {
	static getForm() {
		return TicketCreateForm.map();
	}

	getButtonsView() {
		let state = this.getState();
		return <Row className={'reverse padding-one'}>
			{state.buttons.map(this.map_button_to_view)}
		</Row>;
	}

}

export default connect(TicketCreateModal);
