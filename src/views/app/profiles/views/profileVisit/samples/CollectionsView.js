import {connect} from "../../../../../../stores/base/StoreManager";
import React from "react";
import Row from "../../../../../base/Row";
import RemoteStoreView from "../../../../../base/RemoteStoreView";
import Collections from "../../../stores/samples/Collections";
import CollectionView from "./CollectionView";

class CollectionsEditView extends RemoteStoreView {
	static getRemoteStore(props) {
		let profileId = props.profileId;
		return Collections.map(profileId, {profileId});
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
		return <CollectionView collection={item} profileId={this.props.profileId} key={item.id}/>
	}
}

export default connect(CollectionsEditView);
