import {withRouter} from "react-router";
import {connect} from "../../../../../../stores/base/StoreManager";
import ScrollableFormBox from "../../../../../base/forms/ScrollableFormBox";
import SampleCreateForm from "../../../stores/samples/SampleCreateForm";


class SampleCreateFormView extends ScrollableFormBox {
	static getForm(props) {
		let profileId = props.match.params.profileId;
		return SampleCreateForm.map(profileId, {profileId});
	}
	getFormClass() {
		return `${super.getFormClass()} compact-form`;
	}
}

export default withRouter(connect(SampleCreateFormView));
