import {connect} from "../../../../../../stores/base/StoreManager";
import React from "react";
import Row from "../../../../../base/Row";
import SingleSamples from "../../../stores/samples/SingleSamples";
import RemoteStoreView from "../../../../../base/RemoteStoreView";
import SampleView from "./SampleView";

class SingleSamplesView extends RemoteStoreView {
	static getRemoteStore(props) {
		let profileId = props.profileId;
		return SingleSamples.map(profileId, {profileId});
	}

	constructor(props) {
		super(props);
		this.mapItemToView = this.mapItemToView.bind(this);
	}

	getOkView() {
		return (
			<Row className={'centered samples-view'}>
				{this.getData().map(this.mapItemToView)}
			</Row>
		)
	}

	mapItemToView(item, index) {
		return <SampleView sample={item} profileId={this.props.profileId} key={item.id}/>
	}
}

export default connect(SingleSamplesView);
