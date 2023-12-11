import React from "react";
import {connect} from "../../../../../../stores/base/StoreManager";
import MessageView from "./MessageView";
import Scrollable from "../../../../../base/refactored/scrollable/Scrollable";
import RemoteStoreView from "../../../../../base/RemoteStoreView";
import Ticket from "../../stores/Ticket";
import TitleValueView from "../../../../../base/titleValueView/TitleValueView";
import Res from "../../../../../../assets/Res";
import MasterColumn from "../../../../../base/MasterColumn";
import Row from "../../../../../base/Row";
import ItemTitle from "../../../../../base/refactored/itemTitle/ItemTitle";
import ItemDescription from "../../../../../base/refactored/itemDescription/ItemDescription";
import {getFormalDateTime} from "../../../../../../utils/DateUtils";
import MessageCreateFormView from "../MessageCreateFormView";
import Box from "../../../../../base/refactored/box/Box";
import SlaveColumn from "../../../../../base/SlaveColumn";
import ScrollableColumn from "../../../../../base/refactored/scrollable/ScrollableColumn";
import ButtonView from "../../../../../base/forms/button/ButtonView";
import MessageCreateResponsiveFormView from "../MessageCreateResponsiveFormView";

class TicketPage extends RemoteStoreView {
	static getRemoteStore(props) {
		let ticketId = props.ticketId || props.match.params.ticketId;
		return Ticket.map(ticketId, {ticketId});
	}

	getOkView() {
		return <ScrollableColumn>
			<Scrollable>
				<div className={'container'}>

					<Row>
						<div className={'responsive-only full-width white-background border-bottom'}>
							<Row className={'centered  padding-two'}>
								<MasterColumn>
									<ItemTitle>{Res.string.dashboard.support.create_message}</ItemTitle>
								</MasterColumn>
								<ButtonView id={this.getState().toggleButton.id}/>
							</Row>
							{this.getState().open ?
								<MessageCreateResponsiveFormView ticketId={this.props.ticketId}/>
								: null}
						</div>
						<SlaveColumn className={`dominant desktop-only`}>
							<MessageCreateFormView ticketId={this.props.ticketId}/>
						</SlaveColumn>
						<MasterColumn>
							<Box>
								{this.getHeaderView()}
								<div className={'padding-one'}>
								</div>
								{this.getMessagesView()}

							</Box>
						</MasterColumn>

					</Row>
				</div>
			</Scrollable>

		</ScrollableColumn>

	}

	getHeaderView() {
		return (
			<Row className={'centered header border-bottom padding-one '}>
				<MasterColumn className={'padding-one'}>
					<ItemTitle>{this.getData().title}</ItemTitle>
					<TitleValueView/>
					<ItemDescription>{getFormalDateTime(this.getData().creation)}</ItemDescription>
				</MasterColumn>
				<TitleValueView title={Res.string.dashboard.support.state}
								value={Res.get_attribute(this.getData().state, 'title')}
								className={'primary tag'}/>

			</Row>
		);
	}

	getMessagesView() {
		return <Scrollable className={'reverse column padding-one-sides'}>
			{this.getData().messages.map((message)=>this.mapMessageToView((message)))}
		</Scrollable>
	}


	mapMessageToView(message) {
		return <MessageView key={message.id} message={message} ticket={this.getData()}/>
	}

}

export default connect(TicketPage);
