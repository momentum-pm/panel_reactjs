import "./SelectFieldView.scss";
import React from 'react';
import FieldView from "../FieldView";
import PropTypes from "prop-types";
import Res from "../../../../../assets/Res";
import SelectField from "../../../../../stores/base/form/fields/SelectField";
import {connect} from "../../../../../stores/base/StoreManager";

export class SelectFieldView extends FieldView {
	static getField(props) {
		return SelectField.map(props.id);
	}

	constructor(props) {
		super(props);
		this.mapItemToView = this.mapItemToView.bind(this);
		this.getValue = this.getValue.bind(this);
		this.getTitle = this.getTitle.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	getInputView() {
		let state = this.getState();
		let fieldValue;
		if ((state.value !== undefined) && (state.value !== null)) {
			fieldValue = state.value;
		} else {
			fieldValue = "";
		}

		return (
			<div className={`select-field-view ${state.value ? 'filled' : ''}`}>
				<div className={'select-field-view-icon'}>
					{Res.icon.downArrow}
				</div>
				<select name={state.name}
						className={'select-field-view-input'}
						onChange={this.onChange}
						value={fieldValue}
						disabled={state.items.length === 0}>

					{this.getState().hideNull ? null : this.mapItemToView("")}
					{state.items.map(this.mapItemToView)}
				</select>

			</div>
		)
	}


	mapItemToView(item) {
		let itemValue = this.getValue(item);
		let title = this.getTitle(item);
		let checked;
		if (itemValue !== "") {
			checked = this.getState().value === itemValue.toString();
		} else {
			checked = this.getState().value === null;
		}

		return (
			<option className='select-field-view-option'
					value={itemValue}
					key={itemValue}
					defaultValue={this.getState().value || ""}
					defaultChecked={checked}>
				{title}
			</option>);
	}

	getValue(item) {
		return item ? this.getState().itemToValue(item) : "";
	}

	getTitle(item) {
		return (item === "") ? this.getState().placeholder : ((item === null) ? Res.string.loading : this.getState().itemToTitle(item));
	}

	onChange(event) {
		let value = event.target.value;
		if (value === "") {
			value = null;
		}
		this.getField().setValue(value);
		event.preventDefault();
	}
}

SelectFieldView.propTypes = {
	id: PropTypes.number.isRequired,
};
export default connect(SelectFieldView);

