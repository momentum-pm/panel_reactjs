import {withRouter} from "react-router";
import {connect} from "../../../../../../../stores/base/StoreManager";
import ExperienceEditForm from "../../../../stores/experiences/ExperienceEditForm";
import ScrollableFormBox from "../../../../../../base/forms/ScrollableFormBox";


class ExperienceEditFormView extends ScrollableFormBox {
	static getForm(props) {
		let profileId = props.match.params.profileId;
		let experienceId = props.match.params.experienceId;
		return ExperienceEditForm.map(experienceId, {experienceId, profileId});
	}
}

export default withRouter(connect(ExperienceEditFormView));
