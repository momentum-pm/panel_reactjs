import "../charFieldView/CharFieldView.scss";
import React from 'react';
import FieldView from "../FieldView";
import PropTypes from "prop-types";
import {connect} from "../../../../../stores/base/StoreManager";
import URLField from "../../../../../stores/base/form/fields/URLField";

class URLFieldView extends FieldView {
	static getField(props) {
		return URLField.map(props.id);
	}

	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
	}

	getInputView() {
		let state = this.getState();
		return (
			<input name={state.name}
				   value={state.visibleValue || ''}
				   className={'char-field-view'}
				   autoComplete={state.auto_complete.toString()}
				   type={"link"}
				   placeholder={state.placeholder}
				   onChange={this.onChange}/>
		)
	}

	onChange(event) {
		let value = event.target.value;
		this.getField().setValue(value);
		event.preventDefault();
	}
}

URLFieldView.propTypes = {
	id: PropTypes.number.isRequired,
};

export default connect(URLFieldView);
