import {withRouter} from "react-router";
import {connect} from "../../../stores/base/StoreManager";
import React from "react";
import PaginatedRemoteStorePage from "../../base/PaginatedRemoteStorePage";
import AdminCourseComments from "./stores/AdminCourseComments";
import CommentView from "../school/views/CommentView";


class AdminCourseCommentsView extends PaginatedRemoteStorePage {
	static getRemoteStore(props) {
		return AdminCourseComments.map();
	}


	mapItemToView(item, index) {
        return <div><CommentView commentType={"course"} comment={item} isAdmin={true} /></div>
	}
}

export default withRouter(connect(AdminCourseCommentsView))
