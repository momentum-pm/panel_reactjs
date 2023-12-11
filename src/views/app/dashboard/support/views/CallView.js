import Row from "../../../../base/Row";
import MasterColumn from "../../../../base/MasterColumn";
import ItemInfo from "../../../../base/refactored/itemInfo/ItemInfo";
import Res from "../../../../../assets/Res";
import StoreView from "../../../../base/StoreView";
import CallFillForm from "../stores/CallFillForm";
import {connect} from "../../../../../stores/base/StoreManager";
import {withRouter} from "react-router";
import ButtonView from "../../../../base/forms/button/ButtonView";
import React from "react";
import Ticket from "../stores/Ticket";


class CallView extends StoreView {
	static mapPropsToStores(props) {
		let call = props.call;
		let ticketId = props.match.params.ticketId;
		return {call: CallFillForm.map(call.id, {call, ticketId}), ticket: Ticket.map(ticketId)};
	}

	render() {
		let call = this.props.call.state.call;
		if (call.filled) {
			return <Row>
				<MasterColumn>
					<ItemInfo>
						{Res.get_attribute(call.type, 'title')}
					</ItemInfo>
				</MasterColumn>
				<p className={call.success ? 'success' : 'danger'}>{call.success ? Res.string.dashboard.support.success_call : Res.string.dashboard.support.failed_call}</p>
			</Row>
		} else {
			return (<Row>
				<MasterColumn>
					<ItemInfo className={'success'}>
						{Res.get_attribute(call.type, 'title')}
					</ItemInfo>
					<Row className={'centered'}>
						<MasterColumn>
							<p className={'subtitle'}>{Res.string.dashboard.support.call_fill_question}</p>
						</MasterColumn>
						<ButtonView id={this.props.call.state.successButton.id}/>
						<ButtonView id={this.props.call.state.failedButton.id}/>
					</Row>

				</MasterColumn>
			</Row>);
		}
	}
}

export default withRouter(connect(CallView));
