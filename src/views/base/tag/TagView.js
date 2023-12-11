import React from "react";
import "./TagView.scss";

export default class TagView extends React.Component {
	render() {
		return (
			<div
				className={`centered row tag-view ${this.props.about ? 'has-about' : ''} ${this.props.className || ''}`}>
				{this.props.icon}
				<p className={'tag-view-title'}>{this.props.title}</p>
				{this.props.about ? <div className={'about-data'} data-title={this.props.about}/> : null}
			</div>
		)
	}
}



