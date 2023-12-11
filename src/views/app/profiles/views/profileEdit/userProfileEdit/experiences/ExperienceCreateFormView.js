import {withRouter} from "react-router";
import {connect} from "../../../../../../../stores/base/StoreManager";
import ExperienceCreateForm from "../../../../stores/experiences/ExperienceCreateForm";
import ScrollableFormBox from "../../../../../../base/forms/ScrollableFormBox";


class ExperienceCreateFormView extends ScrollableFormBox {
	static getForm(props) {
		let profileId = props.match.params.profileId;
		return ExperienceCreateForm.map(profileId, {profileId});
	}
}

export default withRouter(connect(ExperienceCreateFormView));
