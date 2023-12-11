import {withRouter} from "react-router";
import {connect} from "../../../../../../stores/base/StoreManager";
import ParagraphEditForm from "../../../stores/ParagraphEditForm";
import FormBox from "../../../../../base/forms/FormBox";

class ParagraphEditFormView extends FormBox {
	static getForm(props) {
		let authorId = props.match.params.authorId;
		let postId = props.match.params.postId;
		let partId = props.partId;
		return ParagraphEditForm.map(partId, {postId, partId, authorId});
	}

	getFieldsClassName() {
		return `${super.getFieldsClassName()} padding-one`
	}
}

export default withRouter(connect(ParagraphEditFormView));
