import "./BooleanFieldView.scss";
import React from 'react';
import FieldView from "../FieldView";
import PropTypes from "prop-types";
import {connect} from "../../../../../stores/base/StoreManager";
import BooleanField from "../../../../../stores/base/form/fields/BooleanField";
import Row from "../../../Row";

class BooleanFieldView extends FieldView {
	static getField(props) {
		return BooleanField.map(props.id);
	}

	getInputView() {
		let state = this.getState();
		let field = this.getField();
		return <div className={'boolean-field-view'}>
				<div className={`boolean-field-container ${state.value ? 'boolean-field-container-checked' : ''}`}>

					<Row className={'boolean-field-content centered'}>
						<div className={'boolean-field-check'}>
							<div className={'boolean-field-checked'}/>
						</div>
						<p className={'text padding-one-sides'}>{state.question}</p>
					</Row>
					<input className={'boolean-field-input'} type="checkbox" checked={state.value} value={'main'}
						   onChange={field.toggle}/>
				</div>
		</div>
	}


}

BooleanFieldView.propTypes = {
	id: PropTypes.number.isRequired,
};
export default connect(BooleanFieldView);
