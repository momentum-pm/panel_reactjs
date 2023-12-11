import React from "react";
import Line from "../Line";
import Link from "../Link";
import {withRouter} from "react-router";

export default class TabsContainerView extends React.Component {

	constructor(props) {
		super(props);
		this.tabRefs = [];
		for (let i = 0; i < props.length; i++) {
			this.tabRefs.push(React.createRef());
		}
	}

	render() {
		return (
			<div className={`tabs-container ${this.props.className || ''}`}>
				<div className={'container'}>
					<ul className={`tabs-row padding-two-sides ${this.props.listClassName || ''}`}>
						{this.props.children.map((child, index) =>
							<li className={this.props.itemClassName || ''} key={index}>{child}</li>
						)}
					</ul>
				</div>
				<Line className={'tabs-container-line'}/>
			</div>);
	}

}

export const NewTabsView = withRouter(class NewTabsView extends React.Component {

	render() {
		let path = this.props.location.pathname;
		return <ul className={'tabs-view row border-bottom background-white'}>
			{this.props.links.map(link => <li className={this.props.itemsClassName || 'master-column'} key={link.title}>
				{link}	<Link
					to={link.link}
					className={`tab-view ${path.startsWith(link.link) ? 'tab-view-active' : ''}`}>{link.title}</Link>
			</li>)}
		</ul>
	}
});
