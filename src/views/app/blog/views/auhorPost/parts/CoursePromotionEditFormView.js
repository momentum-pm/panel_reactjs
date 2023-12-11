import {withRouter} from "react-router";
import {connect} from "../../../../../../stores/base/StoreManager";
import FormBox from "../../../../../base/forms/FormBox";
import CoursePromotionEditForm from "../../../stores/CoursePromotionEditForm";

class CoursePromotionEditFormView extends FormBox {
	static getForm(props) {
		let authorId = props.match.params.authorId;
		let postId = props.match.params.postId;
		let partId = props.partId;
		return CoursePromotionEditForm.map(partId, {postId, partId, authorId});
	}

	getFieldsClassName() {
		return `${super.getFieldsClassName()} padding-one`
	}
}

export default withRouter(connect(CoursePromotionEditFormView));
