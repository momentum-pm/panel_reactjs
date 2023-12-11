import "../charFieldView/CharFieldView.scss";
import React from 'react';
import FieldView from "../FieldView";
import PropTypes from "prop-types";
import TextField from "../../../../../stores/base/form/fields/TextField";
import {connect} from "../../../../../stores/base/StoreManager";

class TextFieldView extends FieldView {
	static getField(props) {
		return TextField.map(props.id);
	}

	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
	}

	getInputView() {
		let state = this.getState();
		return (
			<textarea name={state.name}
					  value={state.value || ''}
					  className={'char-field-view'}
					  rows={state.rows}
					  placeholder={state.placeholder}
					  onChange={this.onChange}/>
		);
	}


	onChange(event) {
		let value = event.target.value;
		this.getField().setValue(value);
		event.preventDefault();
	}
}

TextFieldView.propTypes = {
	id: PropTypes.number.isRequired,
};

export default connect(TextFieldView);
