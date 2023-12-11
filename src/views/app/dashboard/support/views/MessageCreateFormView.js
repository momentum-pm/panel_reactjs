import {connect} from "../../../../../stores/base/StoreManager";
import FormView from "../../../../base/forms/FormView";
import {withRouter} from "react-router";
import SupportMessageForm from "../stores/SupportMessageForm";
import React from "react";
import Box from "../../../../base/refactored/box/Box";
import Column from "../../../../base/Column";
import Res from "../../../../../assets/Res";
import App from "../../../../../stores/app/App";
import ButtonView from "../../../../base/forms/button/ButtonView";
import Row from "../../../../base/Row";


class MessageCreateFormView extends FormView {
	static getForm(props) {
		let ticketId = props.ticketId || props.match.params.ticketId;
		return SupportMessageForm.map(ticketId, {ticketId});
	}


	render() {
		return <Box>
			<form className={'padding-two padding-one-sides compact-form'}>
				{this.getTitleView()}
				{this.getHintView()}
				{this.getFieldsView()}
				{this.getButtonsView()}
				<Column className={'centered padding-one-before-after'}>
					<h3 className={'title padding-four-sides'}>{Res.string.dashboard.support.make_a_call}</h3>
					{App.get().state.data.active_support ?
						<Row>
							<ButtonView id={this.getState().buttons[1].id}/>
						</Row>
						:
						<p className={'center small primary padding-one'}>{Res.string.dashboard.support.not_the_time}</p>
					}
				</Column>

			</form>

		</Box>

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

export default withRouter(connect(MessageCreateFormView));
