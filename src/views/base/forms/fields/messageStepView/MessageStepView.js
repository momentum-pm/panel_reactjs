import React from "react";
import "./MessageStepView.scss";
import PropTypes from "prop-types";
import {connect} from "../../../../../stores/base/StoreManager";
import StoreView from "../../../StoreView";
import MessageStep from "../../../../../stores/base/form/fields/MessageStep";

class MessageStepView extends StoreView {
	static mapPropsToStores(props) {
		if (props.id !== undefined) {
			return {
				step: MessageStep.map(props.id),
			};
		} else {
			return {
				step: {
					state: {
						title: props.title,
						text: props.text,
					}
				},
			}
		}
	}


	render() {
		return (
			<div
				className={`full-width padding-two-top padding-two-sides ${this.props.step.state.className}`}>
				<h4 className={'primary title'}>{this.props.step.state.title}</h4>
				<p className={'text'}>{this.props.step.state.text}</p>
			</div>
		)
	}


}

MessageStepView.propTypes = {
	id: PropTypes.number,
	index: PropTypes.number,
	label: PropTypes.string,
};

export default connect(MessageStepView);
