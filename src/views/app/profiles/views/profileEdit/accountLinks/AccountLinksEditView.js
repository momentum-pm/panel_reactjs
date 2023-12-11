import {connect} from "../../../../../../stores/base/StoreManager";
import Res from "../../../../../../assets/Res";
import React from "react";
import AccountLinkEditView from "./AccountLinkEditView";
import ButtonView from "../../../../../base/forms/button/ButtonView";
import MasterColumn from "../../../../../base/MasterColumn";
import BoxListRemoteStoreView from "../../../../../base/BoxListRemoteStoreView";
import AccountLinks from "../../../stores/accountLinks/AccountLinks";
import Row from "../../../../../base/Row";

class AccountLinksEditView extends BoxListRemoteStoreView {
	static getRemoteStore(props) {
		let profileId = props.profileId;
		return AccountLinks.map(profileId, {profileId});
	}


	getHeaderView() {
		return (
			<div className={'padding-one-before-after'}>
				<Row className={`centered padding-one-sides`}>
					<MasterColumn className={'padding-one-sides'}>
						<h3>{Res.string.profiles.accountLinks.account_links_title}</h3>
					</MasterColumn>
					<ButtonView id={this.getState().createButton.id}/>
				</Row>
			</div>
		);
	}

	// getEmptyView() {
	// 	return null;
	// }


	getOkView() {
		return <div className={'padding-one'}>
			{super.getOkView()}
		</div>
	}

	mapItemToView(item, index) {
		return <AccountLinkEditView accountLink={item} profileId={this.props.profileId} key={item.id}/>
	}
}

export default connect(AccountLinksEditView);
