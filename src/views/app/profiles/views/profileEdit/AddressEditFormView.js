import AddressEditForm from "../../stores/AddressEditForm";
import {connect} from "../../../../../stores/base/StoreManager";
import CollapsedFormView from "../../../../base/forms/CollapsedFormView";
import IconTitleValueView from "../../../../base/iconTitleValueView/IconTitleValueView";
import Res from "../../../../../assets/Res";
import React from "react";
import {getAddress} from "../profileVisit/AddressView";

class AddressEditFormView extends CollapsedFormView {
	static getForm(props) {
		let profileId = props.profileId;
		return AddressEditForm.map(profileId, {profileId});
	}

	getClosedView() {
		let address = getAddress(this.getState().context);
		return (
			<IconTitleValueView icon={Res.icon.location}
								value={address ? address : Res.string.profiles.unknown_address}/>
		)
	}

}

export default connect(AddressEditFormView);
