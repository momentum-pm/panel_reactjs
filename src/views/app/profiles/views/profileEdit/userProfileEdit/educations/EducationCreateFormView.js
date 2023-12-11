import {withRouter} from "react-router";
import {connect} from "../../../../../../../stores/base/StoreManager";
import ScrollableFormBox from "../../../../../../base/forms/ScrollableFormBox";
import EducationCreateForm from "../../../../stores/educations/EducationCreateForm";


class EducationCreateFormView extends ScrollableFormBox {
	static getForm(props) {
		let profileId = props.match.params.profileId;
		return EducationCreateForm.map(profileId, {profileId});
	}
}

export default withRouter(connect(EducationCreateFormView));
