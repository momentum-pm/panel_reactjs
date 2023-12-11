import React from "react";
import RemoteStoreView from "../../../../../base/RemoteStoreView";
import Res from "../../../../../../assets/Res";
import {connect} from "../../../../../../stores/base/StoreManager";
import {withRouter} from "react-router";
import TicketItemView from "./TicketItemView";
import EmptyView from "../../../../../base/emptyListView/EmptyView";
import Scrollable from "../../../../../base/refactored/scrollable/Scrollable";
import Tickets from "../../stores/Tickets";
import SlaveScrollableColumn from "../../../../../base/refactored/scrollable/SlaveScrollabelColumn";
import HeaderRow from "../../../../../base/refactored/headerRow/HeaderRow";
import ButtonView from "../../../../../base/forms/button/ButtonView";
import {BUTTON_TYPE} from "../../../../../../stores/base/form/buttons/Button";
import MasterColumn from "../../../../../base/MasterColumn";

class TicketsView extends RemoteStoreView {
	static getRemoteStore(props) {
		return Tickets.map();
	}

	getOkView() {
		return (
			<SlaveScrollableColumn className={'boxed z-index-1'}>
				<HeaderRow className={'padding-one'}>
					<MasterColumn>
						<h2>{Res.string.dashboard.support.tickets}</h2>
					</MasterColumn>
					<ButtonView type={BUTTON_TYPE.LINK}
								className={'flat success'}
								icon={Res.icon.add}
								link={'/dashboard/support/create/'}
								title={Res.string.dashboard.support.create_ticket}/>
				</HeaderRow>
				<Scrollable>
					{this.getListView()}
				</Scrollable>
			</SlaveScrollableColumn>
		);
	}

	getListView() {
		let data = this.getData();
		if (data.length > 0) {
			return (<ol className={'no-style'}>
				{data.map(
					ticket => <TicketItemView key={ticket.id}
											  ticket={ticket}/>
				)}
			</ol>);
		} else {
			return (<EmptyView/>);
		}

	}
}

export default withRouter(connect(TicketsView));
