import React, {Component} from "react";
import {Link as ReactLink} from "react-router-dom";
import {get_lang_url} from "../../History";

export default class Link extends Component {
	render() {
		let to = get_lang_url(this.props.to);
		return (
			<ReactLink to={to} onClick={this.props.onClick} className={'no-underline ' + this.props.className}>
				{this.props.children}
			</ReactLink>
		);
	}
}
