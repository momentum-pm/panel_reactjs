import {connect} from "../../../../../../../stores/base/StoreManager";
import Certificates from "../../../../stores/certificates/Certificates";
import Res from "../../../../../../../assets/Res";
import React from "react";
import CertificateEditView from "./CertificateEditView";
import HeaderRow from "../../../../../../base/refactored/headerRow/HeaderRow";
import ButtonView from "../../../../../../base/forms/button/ButtonView";
import MasterColumn from "../../../../../../base/MasterColumn";
import BoxListRemoteStoreView from "../../../../../../base/BoxListRemoteStoreView";

class CertificatesEditView extends BoxListRemoteStoreView {
	static getRemoteStore(props) {
		let profileId = props.profileId;
		return Certificates.map(profileId, {profileId});
	}


	getHeaderView() {
		return (
			<HeaderRow>
				<MasterColumn>
					<h2>{Res.string.profiles.certificates.certificates_title}</h2>
				</MasterColumn>
				<ButtonView id={this.getState().createButton.id}/>
			</HeaderRow>
		);
	}

	mapItemToView(item, index) {
		return <CertificateEditView certificate={item} profileId={this.props.profileId} key={item.id}/>
	}
}

export default connect(CertificatesEditView);
