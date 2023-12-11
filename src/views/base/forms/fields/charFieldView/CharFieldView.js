import "./CharFieldView.scss";
import React from 'react';
import FieldView from "../FieldView";
import PropTypes from "prop-types";
import CharField from "../../../../../stores/base/form/fields/CharField";
import {connect} from "../../../../../stores/base/StoreManager";
import {normalizeNumber} from "../../../../../utils/StringUtils";

export class CharFieldView extends FieldView {
	static getField(props) {
		return CharField.map(props.id);
	}

	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
	}

	getInputView() {
		let state = this.getState();
		let maxLength = undefined;
		let value = state.value || '';
		if (state.input_type === "tel") {
			maxLength = 11;
			value = normalizeNumber(value);
		}
		return (
			<div>
				<input name={state.name}
					   list={state.options.length ? `options-for-${state.name}-${this.getField().id}` : ''}
					   value={value}
					   className={'char-field-view'}
					   maxLength={maxLength}
					   autoComplete={state.auto_complete.toString()}
					   type={state.input_type}
					   placeholder={state.placeholder}
					   onChange={this.onChange}/>
				{state.options.length ?
					<datalist id={`options-for-${state.name}-${this.getField().id}`}
							  className={'char-field-view-options'}>
						{state.options.map(option => (
							<option className={'char-field-view-option-item'} value={state.optionToTitle(option)}/>
						))}
					</datalist>
					: null}
			</div>

		)
	}


	onChange(event) {
		let value = event.target.value;
		this.getField().setValue(value);
		event.preventDefault();
	}
}

CharFieldView.propTypes = {
	id: PropTypes.number.isRequired,
};

export default connect(CharFieldView);
