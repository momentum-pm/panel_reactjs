import {withRouter} from "react-router";
import {connect} from "../../../../../../stores/base/StoreManager";
import ScrollableFormBox from "../../../../../base/forms/ScrollableFormBox";
import CollectionCreateForm from "../../../stores/samples/CollectionCreateForm";


class CollectionCreateFormView extends ScrollableFormBox {
	static getForm(props) {
		let profileId = props.match.params.profileId;
		return CollectionCreateForm.map(profileId, {profileId});
	}

	getFormClass() {
		return `${super.getFormClass()} compact-form`;
	}
}

export default withRouter(connect(CollectionCreateFormView));
