import {withRouter} from "react-router";
import {connect} from "../../../../../../stores/base/StoreManager";
import FormBox from "../../../../../base/forms/FormBox";
import ImagePartEditForm from "../../../stores/ImagePartEditForm";

class ImagePartEditFormView extends FormBox {
	static getForm(props) {
		let authorId = props.match.params.authorId;
		let postId = props.match.params.postId;
		let partId = props.partId;
		return ImagePartEditForm.map(partId, {postId, partId, authorId});
	}

	getFieldsClassName() {
		return `${super.getFieldsClassName()} padding-one`
	}
}

export default withRouter(connect(ImagePartEditFormView));
