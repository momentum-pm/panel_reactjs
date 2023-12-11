import "../bulletFieldView/BulletFieldView.scss";
import React from 'react';
import PropTypes from "prop-types";
import {connect} from "../../../../../stores/base/StoreManager";
import {LOADING_STATE} from "../../../../../stores/base/RemoteStore";
import RemoteBulletField from "../../../../../stores/base/form/fields/RemoteBulletField";
import LoadingView from "../../../refactored/loadingView/LoadingView";
import FailedView from "../../../failedView/FailedView";
import {BulletFieldView} from "../bulletFieldView/BulletFieldView";

export class RemoteBulletFieldView extends BulletFieldView {
	static getField(props) {
		return RemoteBulletField.map(props.id);
	}

	getInputView() {
		let state = this.getState();
		switch (state.loadingState) {
			case LOADING_STATE.LOADING:
			case LOADING_STATE.NOT_LOADED:
				return <LoadingView/>;
			case LOADING_STATE.FAILED:
				return <FailedView message={state.error} reload={this.getField().reload}/>;
			default:
				return super.getInputView();
		}
	}
}

RemoteBulletFieldView.propTypes = {
	id: PropTypes.number.isRequired,
};
export default connect(RemoteBulletFieldView);
