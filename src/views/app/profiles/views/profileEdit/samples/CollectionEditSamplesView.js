import {connect} from "../../../../../../stores/base/StoreManager";
import React from "react";
import SampleEditView from "./SampleEditView";
import Row from "../../../../../base/Row";
import RemoteStoreView from "../../../../../base/RemoteStoreView";
import Collection from "../../../stores/samples/Collection";

class CollectionEditSamplesView extends RemoteStoreView {
	static getRemoteStore(props) {
		let profileId = props.profileId;
		let collectionId = props.collectionId;
		return Collection.map(collectionId, {collectionId, profileId});
	}

	constructor(props) {
		super(props);
		this.mapItemToView = this.mapItemToView.bind(this);
	}

	getOkView() {
		return (
			<Row className={'centered samples-view-in-modal'}>
				{this.getData().samples.map(this.mapItemToView)}
			</Row>
		)
	}

	mapItemToView(item, index) {
		return <SampleEditView sample={item} profileId={this.props.profileId} key={item.id}/>
	}
}

export default connect(CollectionEditSamplesView);
