import {connect} from "../../../../../stores/base/StoreManager";
import FormView from "../../../../base/forms/FormView";
import {withRouter} from "react-router";
import SupportMessageForm from "../stores/SupportMessageForm";
import React from "react";
import Column from "../../../../base/Column";
import ButtonView from "../../../../base/forms/button/ButtonView";


class MessageCreateResponsiveFormView extends FormView {
	static getForm(props) {
		let ticketId = props.ticketId || props.match.params.ticketId;
		return SupportMessageForm.map(ticketId, {ticketId});
	}


	render() {
		return <div>
			<form className={'padding-two-sides compact-form'}>
				{this.getHintView()}
				{this.getFieldsView()}
				{this.getButtonsView()}
			</form>

		</div>

	}

	getHeaderClass() {
		return 'center title padding-two';
	}

	getButtonsView() {
		return <Column className={'centered padding-one-before-after'}>
			<ButtonView id={this.getState().buttons[0].id}/>
		</Column>;
	}

	getFormClass() {
		return 'box';
	}

}

export default withRouter(connect(MessageCreateResponsiveFormView));
