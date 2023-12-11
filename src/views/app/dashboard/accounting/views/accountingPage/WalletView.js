import RemoteStoreView from "../../../../../base/RemoteStoreView";
import Wallet from "../../stores/Wallet";
import Box from "../../../../../base/refactored/box/Box";
import React from "react";
import {connect} from "../../../../../../stores/base/StoreManager";
import Header from "../../../../../base/refactored/header/Header";
import Res from "../../../../../../assets/Res";
import Body from "../../../../../base/Body";
import ButtonView from "../../../../../base/forms/button/ButtonView";
import IconTitleValueView from "../../../../../base/iconTitleValueView/IconTitleValueView";
import {getCredit} from "../../../../../../utils/StringUtils";
import Row from "../../../../../base/Row";
import Line from "../../../../../base/Line";

class WalletView extends RemoteStoreView {

	static getRemoteStore() {
		return Wallet.map();
	}

	getOkView() {
		return (
			<Box>
				<Header>{Res.string.dashboard.accounting.wallet_info}</Header>
				<Body>
					<IconTitleValueView className={'success large expanded'}
										title={Res.string.dashboard.accounting.balance}
										value={getCredit(this.getData().balance)}
										icon={Res.icon.wallet}/>
				</Body>
				<div className={'padding-two-sides'}>
					<Line/>
				</div>
				<Body>
					<IconTitleValueView className={'expanded'}
										title={Res.string.dashboard.accounting.credit_card_label}
										value={this.getData().credit_card ? this.getData().credit_card : Res.string.dashboard.accounting.not_set}/>

					<IconTitleValueView className={'expanded'}
										title={Res.string.dashboard.accounting.sheba_label}
										value={this.getData().sheba ? `IR${this.getData().sheba}` : Res.string.dashboard.accounting.not_set}/>

				</Body>
				<Row className={'padding-one'}>
					{this.getData().balance > 0 ? <ButtonView id={this.getState().withdrawButton.id}/> : null}
					<ButtonView id={this.getState().walletEditButton.id}/>
				</Row>
			</Box>
		)
	}

}

export default connect(WalletView);
