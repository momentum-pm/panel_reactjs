import {withRouter} from "react-router";
import {connect} from "../../../../stores/base/StoreManager";
import Posts from "../stores/Posts";
import React from "react";
import ListPostView from "./posts/ListPostView";
import PaginatedRemoteStorePage from "../../../base/PaginatedRemoteStorePage";

class BlogHomePage extends PaginatedRemoteStorePage {
	static getRemoteStore(props) {
		return Posts.map();
	}


	mapItemToView(item, index) {
		return <ListPostView post={item} key={item.id}/>;
	}
}

export default withRouter(connect(BlogHomePage))
