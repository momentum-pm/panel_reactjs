import {withRouter} from "react-router";
import {connect} from "../../../../../../stores/base/StoreManager";
import ScrollableFormBox from "../../../../../base/forms/ScrollableFormBox";
import AccountLinkCreateForm from "../../../stores/accountLinks/AccountLinkCreateForm";


class AccountLinkCreateFormView extends ScrollableFormBox {
	static getForm(props) {
		let profileId = props.match.params.profileId;
		return AccountLinkCreateForm.map(profileId, {profileId});
	}
}

export default withRouter(connect(AccountLinkCreateFormView));
