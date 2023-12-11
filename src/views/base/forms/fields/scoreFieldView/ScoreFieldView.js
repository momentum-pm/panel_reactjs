import "./ScoreFieldView.scss";
import React from 'react';
import FieldView from "../FieldView";
import PropTypes from "prop-types";
import {connect} from "../../../../../stores/base/StoreManager";
import ScoreField from "../../../../../stores/base/form/fields/ScoreField";
import Row from "../../../Row";
import MasterColumn from "../../../MasterColumn";
import ScoreView from "../../../scoreView/ScoreView";

export class ScoreFieldView extends FieldView {
	static getField(props) {
		return ScoreField.map(props.id);
	}

	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
	}

	render() {
		let state = this.getState();
		let value;
		if (state.hasNull) {
			value = state.value || (state.minValue - this.getStep());
		} else {
			value = state.value || state.minValue;
		}
		let min;
		if (state.hasNull) {
			min = state.minValue - this.getStep();
		} else {
			min = state.minValue;
		}
		return (
			<div
				ref={this.props.fieldRef}
				className={`score-field-view ${state.className} ${this.hasError() ? 'danger' : ''} ${this.isValid() ? 'success' : ''}`}>
				<Row className={'centered score-field-row'}>
					<MasterColumn>
						<p> {state.label}</p>
					</MasterColumn>
					<div className={'score-field-container'}>
						<ScoreView maxScore={state.steps}
								   score={this.getLastFilledIndex()}
								   hasNullIndex={state.hasNull}/>
						<input type="range"
							   min={min}
							   max={state.maxValue}
							   value={value}
							   step={this.getStep()}
							   className={'score-field-input'}
							   onChange={this.onChange}/>
					</div>
				</Row>
			</div>
		)
	}

	getStep() {
		let state = this.getState();
		return (state.maxValue - state.minValue) / (state.steps - 1);
	}

	getLastFilledIndex() {
		let state = this.getState();
		let value = state.value || -1;
		if (value === -1) {
			return -1;
		} else {
			return Math.floor((value - state.minValue) / this.getStep());
		}
	}


	onChange(event) {
		let value = event.target.value;
		value = parseInt(value);
		if (value < this.getState().minValue) {
			value = null;
		}
		this.getField().setValue(value);
		event.preventDefault();
	}
}

ScoreFieldView.propTypes = {
	id: PropTypes.number.isRequired,
};

export default connect(ScoreFieldView);
