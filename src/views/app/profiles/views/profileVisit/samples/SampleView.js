import React from "react";
import PropTypes from "prop-types";
import InstantFileIconView from "../../../../../base/instantFileIconView/InstantFileIconView";

export default class SampleView extends React.Component {
	render() {
		return (
			<InstantFileIconView
				className={this.props.className}
				fileAddress={this.props.sample.file.is_private ? this.props.sample.file.public : this.props.sample.file.original}/>
		)
	}
}


SampleView.propTypes = {
	sample: PropTypes.object.isRequired,
};
