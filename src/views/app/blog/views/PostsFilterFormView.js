import {withRouter} from "react-router";
import {connect} from "../../../../stores/base/StoreManager";
import Posts from "../stores/Posts";
import React from "react";
import ListPostView from "./posts/ListPostView";
import PaginatedRemoteStorePage from "../../../base/PaginatedRemoteStorePage";
import Box from "../../../base/refactored/box/Box";
import Body from "../../../base/Body";
import CategoriesTabContainerView from "./CategoriesTabContainerView";

class BlogHomePage extends PaginatedRemoteStorePage {
	static getRemoteStore(props) {
		return Posts.map();
	}

	render() {
		return (
			<div className={'full-height'}>
				<CategoriesTabContainerView/>
				{super.render()}
			</div>
		);
	}


	getFilterForm() {
		return <Box>
			SALAM
			<Body/>
			<Body/>
			<Body/>
			<Body/>
			<Body/>
			<Body/>
		</Box>
	}

	mapItemToView(item, index) {
		return <ListPostView post={item} key={item.id}/>;
	}
}

export default withRouter(connect(BlogHomePage))
