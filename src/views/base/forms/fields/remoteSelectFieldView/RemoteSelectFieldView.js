import React from 'react';
import PropTypes from "prop-types";
import Res from "../../../../../assets/Res";
import RemoteSelectField from "../../../../../stores/base/form/fields/RemoteSelectField";
import {connect} from "../../../../../stores/base/StoreManager";
import {LOADING_STATE} from "../../../../../stores/base/RemoteStore";
import {SelectFieldView} from "../selectFieldView/SelectFieldView";

class RemoteSelectFieldView extends SelectFieldView {
	static getField(props) {
		return RemoteSelectField.map(props.id);
	}

	constructor(props) {
		super(props);
		this.getIconView = this.getIconView.bind(this);
		this.onClick = this.onClick.bind(this);
	}

	getInputView() {
		let state = this.getState();
		if (this.getState().loadingState === LOADING_STATE.LOADED) {
			return super.getInputView();
		} else {
			return (
				<div className={`select-field-view select-field-view-loading`}>
					<div className={'select-field-view-icon'} onClick={this.onClick}>
						{this.getIconView()}
					</div>
					<select name={state.name}
							className={'select-field-view-input'}
							onChange={this.onChange}
							disabled={state.items.length === 0}>
						{this.mapItemToView(null)}
					</select>

				</div>
			)
		}
	}

	getIconView() {
		let state = this.getState();
		switch (state.loadingState) {
			case LOADING_STATE.LOADING:
				return Res.icon.ripple_loading;
			case LOADING_STATE.FAILED:
				return Res.icon.refresh;
			default:
				return Res.icon.downArrow;
		}
	}

	onClick() {
		if (this.getState().loadingState === LOADING_STATE.FAILED) {
			this.getField().reload();
		}
	}

}

RemoteSelectFieldView.propTypes = {
	id: PropTypes.number.isRequired,
};
export default connect(RemoteSelectFieldView);
