import {withRouter} from "react-router";
import {connect} from "../../../../stores/base/StoreManager";
import FormPage from "../../../base/forms/FormPage";
import PostEditForm from "../stores/PostEditForm";


class PostCreatePage extends FormPage {
	static getForm(props) {
		let authorId = props.match.params.authorId;
		return PostEditForm.map(authorId, {authorId});
	}
}

export default withRouter(connect(PostCreatePage))
