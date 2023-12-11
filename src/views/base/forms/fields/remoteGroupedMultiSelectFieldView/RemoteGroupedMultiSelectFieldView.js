import React from 'react';
import PropTypes from "prop-types";
import {connect} from "../../../../../stores/base/StoreManager";
import {LOADING_STATE} from "../../../../../stores/base/RemoteStore";
import LoadingView from "../../../refactored/loadingView/LoadingView";
import FailedView from "../../../failedView/FailedView";
import {GroupedMultiSelectFieldView} from "../groupedMultiSelectFieldView/GroupedMultiSelectFieldView";
import RemoteGroupedMultiSelectField from "../../../../../stores/base/form/fields/RemoteGroupedMultiSelectField";

class RemoteGroupedMultiSelectFieldView extends GroupedMultiSelectFieldView {
	static getField(props) {
		return RemoteGroupedMultiSelectField.map(props.id);
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

RemoteGroupedMultiSelectFieldView.propTypes = {
	id: PropTypes.number.isRequired,
};
export default connect(RemoteGroupedMultiSelectFieldView);
