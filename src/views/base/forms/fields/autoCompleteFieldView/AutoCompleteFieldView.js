import PropTypes from "prop-types";
import React from "react";
import "./AutoCompleteField.scss";
import {connect} from "../../../../../stores/base/StoreManager";
import AutoCompleteField from "../../../../../stores/base/form/fields/AutoCompleteField";
import {CharFieldView} from "../charFieldView/CharFieldView";
import LoadingView from "../../../refactored/loadingView/LoadingView";

class AutoCompleteFieldView extends CharFieldView {
	static getField(props) {
		return AutoCompleteField.map(props.id);
	}

	constructor(props) {
		super(props);
		this.itemToView = this.itemToView.bind(this);
		this.onSelect = this.onSelect.bind(this);
	}

	getInputView() {
		return (
			<div className={'auto-complete-field-view'}>
				{super.getInputView()}
				{this.itemsToView()}
			</div>
		);
	}


	itemsToView() {
		if (!this.getState().selected) {
			if (this.getState().loading) {
				return <div className={'auto-complete-field-view-items'}>
					<LoadingView className={'small'}/>
				</div>
			}
			if ((this.getState().items !== undefined) && this.getState().items.length > 0) {
				return <div className={'auto-complete-field-view-items'}>
					{this.getState().items.map(this.itemToView)}
				</div>
			}
		}
	}


	itemToView(item) {
		let value = this.getState().itemToValue(item);
		let title = this.getState().itemToTitle(item);
		return <p className={'auto-complete-field-view-item'}
				  key={value}
				  onClick={() => this.onSelect(item, value)}>
			{title}
		</p>
	}

	onSelect(item, value) {
		this.getField().selectValue(item, value);
	}


}


AutoCompleteFieldView.propTypes = {
	id: PropTypes.number.isRequired,
};
export default connect(AutoCompleteFieldView);
