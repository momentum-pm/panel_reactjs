import React from "react";
import SampleView from "../../profileVisit/samples/SampleView";
import InstantFileIconView from "../../../../../base/instantFileIconView/InstantFileIconView";
import ButtonView from "../../../../../base/forms/button/ButtonView";

export default class SampleEditView extends SampleView {
	render() {
		return (
			<div className={'sample-edit-view'}>
				<InstantFileIconView fileAddress={this.props.sample.file.is_private?this.props.sample.file.public:this.props.sample.file.original}/>
				<ButtonView id={this.props.sample.deleteButton.id}/>
			</div>
		)
	}
}
