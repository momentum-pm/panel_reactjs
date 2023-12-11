import {connect} from "../../../../../../../stores/base/StoreManager";
import Educations from "../../../../stores/educations/Educations";
import Res from "../../../../../../../assets/Res";
import React from "react";
import HeaderRow from "../../../../../../base/refactored/headerRow/HeaderRow";
import ListRemoteStoreView from "../../../../../../base/ListRemoteStoreView";
import EducationView from "./EducationView";
import Body from "../../../../../../base/Body";

class EducationsView extends ListRemoteStoreView {
	static getRemoteStore(props) {
		let profileId = props.profileId;
		return Educations.map(profileId, {profileId});
	}

	
	render() {
		if (!this.props.count) {
		  return null;
		} else {
		  return (
			  <Body>
				{this.getHeaderView()}
				{super.render()}
			  </Body>
		  );
		}
	  }

	getHeaderView() {
		return (
			<HeaderRow className={'padding-two-before-after'}>
				<h2>{Res.string.profiles.educations.educations_title}</h2>
			</HeaderRow>
		);
	}

	mapItemToView(item, index) {
		return <EducationView education={item} profileId={this.props.profileId} key={item.id}/>
	}
}

export default connect(EducationsView);
