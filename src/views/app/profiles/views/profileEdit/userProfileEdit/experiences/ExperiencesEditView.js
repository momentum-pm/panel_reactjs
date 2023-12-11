import {connect} from "../../../../../../../stores/base/StoreManager";
import Experiences from "../../../../stores/experiences/Experiences";
import Res from "../../../../../../../assets/Res";
import React from "react";
import ExperienceEditView from "./ExperienceEditView";
import HeaderRow from "../../../../../../base/refactored/headerRow/HeaderRow";
import ButtonView from "../../../../../../base/forms/button/ButtonView";
import MasterColumn from "../../../../../../base/MasterColumn";
import BoxListRemoteStoreView from "../../../../../../base/BoxListRemoteStoreView";

class ExperiencesEditView extends BoxListRemoteStoreView {
	static getRemoteStore(props) {
		let profileId = props.profileId;
		return Experiences.map(profileId, {profileId});
	}


	getHeaderView() {
		return (
			<HeaderRow>
				<MasterColumn>
					<h2>{Res.string.profiles.experiences.experiences_title}</h2>
				</MasterColumn>
				<ButtonView id={this.getState().createButton.id}/>
			</HeaderRow>
		);
	}

	mapItemToView(item, index) {
		return <ExperienceEditView experience={item} profileId={this.props.profileId} key={item.id}/>
	}
}

export default connect(ExperiencesEditView);
