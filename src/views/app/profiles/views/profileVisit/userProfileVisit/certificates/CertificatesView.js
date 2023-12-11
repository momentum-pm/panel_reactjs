import {connect} from "../../../../../../../stores/base/StoreManager";
import Certificates from "../../../../stores/certificates/Certificates";
import Res from "../../../../../../../assets/Res";
import React from "react";
import HeaderRow from "../../../../../../base/refactored/headerRow/HeaderRow";
import BoxListRemoteStoreView from "../../../../../../base/BoxListRemoteStoreView";
import CertificateView from "./CertificateView";

class CertificatesView extends BoxListRemoteStoreView {
	static getRemoteStore(props) {
		let profileId = props.profileId;
		return Certificates.map(profileId, {profileId});
	}

	render() {
		if (!this.props.count) {
			return null;
		} else {
			return super.render();
		}
	}

	getHeaderView() {
		return (
			<HeaderRow>
				<h2>{Res.string.profiles.certificates.certificates_title}</h2>
			</HeaderRow>
		);
	}

	mapItemToView(item, index) {
		return <CertificateView certificate={item} profileId={this.props.profileId} key={item.id}/>
	}
}

export default connect(CertificatesView);
