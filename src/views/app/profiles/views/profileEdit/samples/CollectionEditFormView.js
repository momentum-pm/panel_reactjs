import {withRouter} from "react-router";
import {connect} from "../../../../../../stores/base/StoreManager";
import ScrollableFormBox from "../../../../../base/forms/ScrollableFormBox";
import CollectionEditForm from "../../../stores/samples/CollectionEditForm";
import Body from "../../../../../base/Body";
import Row from "../../../../../base/Row";
import React from "react";
import CollectionEditSamplesView from "./CollectionEditSamplesView";

class CollectionEditFormView extends ScrollableFormBox {
	static getForm(props) {
		let profileId = props.match.params.profileId;
		let collectionId = props.match.params.collectionId;
		return CollectionEditForm.map(collectionId, {collectionId, profileId});
	}

	getFieldsView() {
		let state = this.getState();
		return <div className={this.getFieldsClassName()}>
			<Body>
				<Row>
					{this.mapFieldToView(state.fields[0])}
					{this.mapFieldToView(state.fields[1])}
					{this.mapFieldToView(state.fields[2])}
					<CollectionEditSamplesView profileId={this.props.match.params.profileId}
											   collectionId={this.props.match.params.collectionId}/>
					{this.mapFieldToView(state.fields[3])}
				</Row>
			</Body>

		</div>;
	}

	getFormClass() {
		return `${super.getFormClass()} compact-form`;
	}
}

export default withRouter(connect(CollectionEditFormView));
