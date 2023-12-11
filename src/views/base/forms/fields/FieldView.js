import "./Field.scss"
import React from 'react'
import PropTypes from "prop-types";
import StoreView from "../../StoreView";
import Res from "../../../../assets/Res";
import MasterColumn from "../../MasterColumn";
import Row from "../../Row";

class FieldView extends StoreView {
	static getField(props) {
	}

	static mapPropsToStores(props) {
		return {
			field: this.getField(props),
			ref: props.ref
		};
	}

	constructor(props) {
		super(props);
		this.reff = React.createRef();
	}

	getField() {
		return this.props.field;
	}

	getState() {
		return this.getField().state;
	}

	render() {
		let state = this.getState();
		return <div
			ref={this.reff}
			className={`field ${state.className} ${this.hasError() ? 'danger' : ''} ${this.isValid() ? 'success' : ''}`}>
			{this.getFieldDetailsView()}
			{this.getInputView()}
		</div>
	}

	getInputView() {
		throw Error(`You should override get_input in ${this.constructor.name}`);
	}

	getFieldDetailsView() {
		if (this.hasFieldDetailsView()) {
			return <Row className={'padding-one centered'}>
				{this.getFieldIconView()}
				<MasterColumn>
					{this.getLabelView()}
				</MasterColumn>
				{this.hasError() ? this.getErrorView() : this.getHintView()}
			</Row>
		}

	}

	hasFieldDetailsView() {
		return this.getState().icon || this.getState().label || this.hasError() ||
			(!this.hasError() && this.getState().hint);
	}

	getFieldIconView() {
		if (this.getState().icon) {
			return (
				<div className={'field-icon'}>
					{this.getState().icon}
				</div>
			)
		}
	}

	getLabelView() {
		if (this.getState().label) {
			return (
				<p className={'field-label'}>
					{this.getState().label}
					{this.getState().showLabelDetails ? this.getState().required ?
						<b className={'primary'}>*</b> : ` (${Res.string.optional})` : null}
				</p>
			)
		}
	}

	getErrorView() {
		if (this.hasError()) {
			return (<div className={'field-error'}>
				<p className={'field-error-bullet'}>!</p>
				<p className={'field-error-text'}>{this.getState().error}</p>
			</div>);
		}
	}

	getHintView() {
		if (this.getState().hint) {
			return (<div className={'field-hint'}>
				<p className={'field-hint-bullet small'}>i</p>
				<p className={'field-hint-text'}>{this.getState().hint}</p>
			</div>);
		}

	}


	hasError() {
		let state = this.getState();
		return state.error && state.touched;
	}

	isValid() {
		let state = this.getState();
		return !state.error && state.touched && state.value;
	}

	scrollInto() {
		if (this.reff && this.reff.current && this.reff.current.scrollIntoView){
			this.reff.current.scrollIntoView();
		}
	}
}

FieldView.propTypes = {
	id: PropTypes.number.isRequired,
};

export default FieldView;
