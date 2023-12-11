import StoreView from "../../../../views/base/StoreView";
import React from "react";
import LinkGroupItemView from "./LinkGroupItemView";
import "./LinkGroupView.scss"
import LinkGroup from "./LinkGroup";
import {withRouter} from "react-router";
import {connect} from "../../StoreManager";

class LinkGroupView extends StoreView {
	static mapPropsToStores(props) {
		return {
			linkGroup: LinkGroup.map(props.id),
		}
	}

	componentDidUpdate() {
		this.props.linkGroup.locationChanged();
	}

	render() {
		let items = this.props.linkGroup.state.items;
		if (items && items.length > 1) {
			let className = this.props.linkGroup.state.className;
			return (
				<div className={`link-group-view ${className}`}>
					<div className={'link-group-items'}>
						{items.map((item, index) => <LinkGroupItemView key={index} item={item}/>)}
					</div>
				</div>
			)
		} else {
			return null;
		}

	}

}

export default withRouter(connect(LinkGroupView));
