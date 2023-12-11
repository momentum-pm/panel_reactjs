import {withRouter} from "react-router";
import {connect} from "../../../stores/base/StoreManager";
import React from "react";
import PaginatedRemoteStoreView from "../../base/PaginatedRemoteStoreView";
import AdminBlogComments from "./stores/AdminBlogComments";
import CommentView from "../school/views/CommentView";

class AdminBlogCommentsView extends PaginatedRemoteStoreView {
	static getRemoteStore(props) {
		return AdminBlogComments.map();
	}


	mapItemToView(item, index) {
        return <div><CommentView commentType={"blog"} comment={item}  isAdmin={true} /></div>
	}
}

export default withRouter(connect(AdminBlogCommentsView))
