import ScrollableFormBox from "../../../../base/forms/ScrollableFormBox";
import {withRouter} from "react-router";
import {connect} from "../../../../../stores/base/StoreManager";
import OpenForForm from "../../stores/author/OpenForForm";

class OpenForModal extends ScrollableFormBox {
	static getForm(props) {
		let {authorId, courseId} = props.match.params;
		return OpenForForm.map(courseId, {authorId, courseId});
	}
}

export default withRouter(connect(OpenForModal))
