import {withRouter} from "react-router";
import {connect} from "../../../../../../../stores/base/StoreManager";
import ScrollableFormBox from "../../../../../../base/forms/ScrollableFormBox";
import EducationEditForm from "../../../../stores/educations/EducationEditForm";

class EducationEditFormView extends ScrollableFormBox {
	static getForm(props) {
		let profileId = props.match.params.profileId;
		let educationId = props.match.params.educationId;
		return EducationEditForm.map(educationId, {educationId, profileId});
	}
}

export default withRouter(connect(EducationEditFormView));
