import React from "react";
import support from "../../../../../assets/images/support.svg";
import Res from "../../../../../assets/Res";
import Column from "../../../../base/Column";
import ButtonView from "../../../../base/forms/button/ButtonView";
import {BUTTON_TYPE} from "../../../../../stores/base/form/buttons/Button";
import Row from "../../../../base/Row";
import MasterColumn from "../../../../base/MasterColumn";
import Box from "../../../../base/refactored/box/Box";
import Tickets from "../stores/Tickets";
import {connect} from "../../../../../stores/base/StoreManager";
import ListRemoteStoreView from "../../../../base/ListRemoteStoreView";
import TicketItemView from "./ticketsView/TicketItemView";
import SlaveColumn from "../../../../base/SlaveColumn";
import ScrollableColumn from "../../../../base/refactored/scrollable/ScrollableColumn";
import Scrollable from "../../../../base/refactored/scrollable/Scrollable";
import History from "../../../../../History";
import App from "../../../../../stores/app/App";

class TicketsPage extends ListRemoteStoreView {
	static getRemoteStore() {
		return Tickets.map();
	}

	getLoadedView() {
		return (
			<ScrollableColumn>
				<Scrollable>
					<div className={'full-height'}>
						<Row className={'padding-one-desktop'}>
							{this.getData().length > 0 ? <MasterColumn>
								<Box>
									<div className={'padding-one'}>
										<h3 className={'title padding-two'}>{Res.string.dashboard.support.tickets}</h3>
										<ol className={`no-style ${this.getItemsClass()}`}>
											{this.getData().map(this.mapItemToView)}
										</ol>
									</div>
								</Box>
							</MasterColumn> :null}
							<SlaveColumn className={'dominant'}>
								<Box className={''}>
									<Row className={'master-column full-height centered'}>

										<Column className={'main-flex centered padding-two margin-two'}>
											<img src={support} alt={'support'} className={'clipart'}/>
											<h3>{Res.string.dashboard.support.create_ticket}</h3>
											<p className={'center'}>{Res.string.dashboard.support.create_ticket_text}</p>
											<ButtonView type={BUTTON_TYPE.BUTTON}
														icon={Res.icon.add}
														className={'large raised success'}
														onClick={() => History.pushLargeModal('/dashboard/support/create/')}
														title={Res.string.dashboard.support.create_ticket}/>
											<Column className={'centered padding-one-before-after'}>
												<h3 className={'title padding-four-sides'}>{Res.string.dashboard.support.make_a_call}</h3>
												{App.get().state.data.active_support ?
													<Row>
														<ButtonView id={this.getState().callButton.id}/>
													</Row>
													:
													<p className={'center small primary padding-one'}>{Res.string.dashboard.support.not_the_time}</p>
												}
											</Column>

										</Column>
									</Row>
								</Box>
							</SlaveColumn>

						</Row>
					</div>
				</Scrollable>
			</ScrollableColumn>

		);
	}

	mapItemToView(item, index) {
		return <TicketItemView ticket={item} key={item.id}/>
	}
}

export default connect(TicketsPage)
