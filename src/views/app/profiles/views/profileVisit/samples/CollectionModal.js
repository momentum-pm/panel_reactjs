import {connect} from "../../../../../../stores/base/StoreManager";
import React from "react";
import Row from "../../../../../base/Row";
import SampleView from "./SampleView";
import Collection from "../../../stores/samples/Collection";
import BoxListRemoteStoreView from "../../../../../base/BoxListRemoteStoreView";
import {withRouter} from "react-router";
import Res from "../../../../../../assets/Res";
import Body from "../../../../../base/Body";
import ButtonView from "../../../../../base/forms/button/ButtonView";
import {BUTTON_TYPE} from "../../../../../../stores/base/form/buttons/Button";
import History from "../../../../../../History";
import Scrollable from "../../../../../base/refactored/scrollable/Scrollable";

class CollectionModal extends BoxListRemoteStoreView {
	static getRemoteStore(props) {
		let profileId = props.match.params.profileId;
		let collectionId = props.match.params.collectionId;
		return Collection.map(collectionId, {collectionId, profileId});
	}

	getOkView() {
		return (
			<div className={'scrollable-column full-item'}>
				<h2 className={'form-title background border-bottom'}>
					{this.getData().title}
				</h2>
				<Scrollable>
					<Body>
						<Row className={'centered samples-view-in-modal'}>
							{this.getData().samples.map(this.mapItemToView)}
						</Row>
					</Body>
				</Scrollable>
				<div className={'reverse row  background border-top'}>
					<ButtonView type={BUTTON_TYPE.BUTTON}
								title={Res.string.close}
								className={'flat primary'}
								icon={Res.icon.cross}
								onClick={() => History.goBack()}/>

				</div>
			</div>

		)
	}


	mapItemToView(item, index) {
		return <SampleView sample={item} profileId={this.props.profileId} key={item.id}/>
	}
}

export default withRouter(connect(CollectionModal));
