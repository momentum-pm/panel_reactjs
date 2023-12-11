import React from "react";
import StoreView from "../StoreView";
import MessageQueue from "../../../stores/base/MessageQueue";
import "./MessageQueueView.scss";
import {connect} from "../../../stores/base/StoreManager";
import Res from "../../../assets/Res";
import {BUTTON_TYPE} from "../../../stores/base/form/buttons/Button";
import ButtonView from "../forms/button/ButtonView";
import Row from "../Row";
import MasterColumn from "../MasterColumn";

class MessageQueueView extends StoreView {
	static mapPropsToStores() {
		return {message_queue: MessageQueue.map()};
	}

	constructor(props) {
		super(props);
		this.map_message_to_view = this.map_message_to_view.bind(this);
	}

	render() {
		return <div className={'message-queue-view'}>
			{this.props.message_queue.state.queue.map(this.map_message_to_view)}
		</div>
	}

	map_message_to_view(message) {
		return <div className={`message-queue-item-view ${message.color}`} key={message.id}>
			<Row>
				<MasterColumn>
					<p>{message.text}</p>
				</MasterColumn>
				<ButtonView className={'flat white'}
							type={BUTTON_TYPE.BUTTON}
							onClick={() => this.props.message_queue.hide(message.id)}
							icon={Res.icon.cross}/>
			</Row>

			<div className={'bar'}/>
		</div>;
	}
}

export default connect(MessageQueueView);
