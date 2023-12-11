import {connect} from "../../../../../stores/base/StoreManager";
import {withRouter} from "react-router";
import CourseEditForm from "../../stores/author/CourseEditForm";
import RemoteFormView from "../../../../base/forms/RemoteFormView";


class CourseEditModal extends RemoteFormView {

	static getForm(props) {
		let {authorId,courseId} = props.match.params;
		return CourseEditForm.map(courseId, {authorId,courseId});
	}
}

export default withRouter(connect(CourseEditModal));
