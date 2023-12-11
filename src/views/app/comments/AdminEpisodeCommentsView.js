import {withRouter} from "react-router";
import {connect} from "../../../stores/base/StoreManager";
import React from "react";
import PaginatedRemoteStoreView from "../../base/PaginatedRemoteStoreView";
import AdminEpisodeComments from "./stores/AdminEpisodeComments";
import CommentView from "../school/views/CommentView";


class AdminEpisodeCommentsView extends PaginatedRemoteStoreView {
	static getRemoteStore(props) {
		return AdminEpisodeComments.map();
	}


	mapItemToView(item, index) {
        return <div><CommentView commentType={"episode"} comment={item} isAdmin={true}  /></div>
	}
}

export default withRouter(connect(AdminEpisodeCommentsView))
