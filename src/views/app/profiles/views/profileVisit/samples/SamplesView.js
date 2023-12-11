import {connect} from "../../../../../../stores/base/StoreManager";
import Res from "../../../../../../assets/Res";
import React from "react";
import HeaderRow from "../../../../../base/refactored/headerRow/HeaderRow";
import MasterColumn from "../../../../../base/MasterColumn";
import BoxListRemoteStoreView from "../../../../../base/BoxListRemoteStoreView";
import Samples from "../../../stores/samples/Samples";
import Body from "../../../../../base/Body";
import SingleSamplesView from "./SingleSamplesView";
import CollectionsView from "./CollectionsView";

class SamplesView extends BoxListRemoteStoreView {
	static getRemoteStore(props) {
		let profileId = props.profileId;
		return Samples.map(profileId, {profileId});
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
				<MasterColumn>
					<h2>{Res.string.profiles.samples.samples_title}</h2>
				</MasterColumn>
			</HeaderRow>
		);
	}

	getOkView() {
		let profileId = this.props.profileId;
		return (
			<Body>
				<CollectionsView profileId={profileId}/>
				<SingleSamplesView profileId={profileId}/>
			</Body>
		)
	}

}

export default connect(SamplesView);
