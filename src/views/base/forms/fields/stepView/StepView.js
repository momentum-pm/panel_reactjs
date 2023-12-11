import React from "react";
import "./StepView.scss";
import Row from "../../../Row";
import PropTypes from "prop-types";
import {connect} from "../../../../../stores/base/StoreManager";
import {normalizeNumber} from "../../../../../utils/StringUtils";
import Step from "../../../../../stores/base/form/fields/Step";
import StoreView from "../../../StoreView";

class StepView extends StoreView {
	static mapPropsToStores(props) {
		if (props.id !== undefined) {
			return {
				step: Step.map(props.id),
			};
		} else {
			return {
				step: {
					state: {
						index: props.index,
						label: props.label,
					}
				},
			}
		}
	}


	render() {
		return (
			<Row
				className={`step-view  ${this.props.className} centered ${this.props.step.state.className}`}>
				<h6 className={'step-view-index'}>{normalizeNumber(this.props.step.state.index)}</h6>
				<h6 className={'step-view-title'}>{this.props.step.state.label}</h6>
			</Row>
		)
	}


}

StepView.propTypes = {
	id: PropTypes.number,
	index: PropTypes.number,
	label: PropTypes.string,
	className: PropTypes.string,
};

export default connect(StepView);
