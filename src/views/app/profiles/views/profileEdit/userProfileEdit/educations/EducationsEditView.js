import {connect} from "../../../../../../../stores/base/StoreManager";
import Res from "../../../../../../../assets/Res";
import React from "react";
import EducationEditView from "./EducationEditView";
import HeaderRow from "../../../../../../base/refactored/headerRow/HeaderRow";
import ButtonView from "../../../../../../base/forms/button/ButtonView";
import MasterColumn from "../../../../../../base/MasterColumn";
import BoxListRemoteStoreView from "../../../../../../base/BoxListRemoteStoreView";
import Educations from "../../../../stores/educations/Educations";

class EducationsEditView extends BoxListRemoteStoreView {
	static getRemoteStore(props) {
		let profileId = props.profileId;
		return Educations.map(profileId, {profileId});
	}


	getHeaderView() {
		return (
			<HeaderRow>
				<MasterColumn>
					<h2>{Res.string.profiles.educations.educations_title}</h2>
				</MasterColumn>
				<ButtonView id={this.getState().createButton.id}/>
			</HeaderRow>
		);
	}

	mapItemToView(item, index) {
		return <EducationEditView education={item} profileId={this.props.profileId} key={item.id}/>
	}
}

export default connect(EducationsEditView);
