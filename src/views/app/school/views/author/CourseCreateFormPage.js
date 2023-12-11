import FormPage from "../../../../base/forms/FormPage";
import CourseCreateForm from "../../stores/author/CourseCreateForm";
import {connect} from "../../../../../stores/base/StoreManager";
import {withRouter} from "react-router";


class CourseCreateFormPage extends FormPage {

	static getForm(props) {
		let {authorId} = props.match.params;
		return CourseCreateForm.map(authorId, {authorId});
	}
}

export default withRouter(connect(CourseCreateFormPage));
