import {connect} from "../../../../../../stores/base/StoreManager";
import React from "react";
import ButtonView from "../../../../../base/forms/button/ButtonView";
import Row from "../../../../../base/Row";
import RemoteStoreView from "../../../../../base/RemoteStoreView";
import Collections from "../../../stores/samples/Collections";
import CollectionEditView from "./CollectionEditView";

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
				<ButtonView id={this.getState().newCollectionButton.id}/>
				{this.getData().map(this.mapItemToView)}
			</Row>
		)
	}

	mapItemToView(item, index) {
		return <CollectionEditView collection={item} profileId={this.props.profileId} key={item.id}/>
	}
}

export default connect(CollectionsEditView);
