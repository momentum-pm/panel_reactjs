import {withRouter} from "react-router";
import {connect} from "../../../../../../stores/base/StoreManager";
import ScrollableFormBox from "../../../../../base/forms/ScrollableFormBox";
import AccountLinkEditForm from "../../../stores/accountLinks/AccountLinkEditForm";


class AccountLinkEditFormView extends ScrollableFormBox {
	static getForm(props) {
		let profileId = props.match.params.profileId;
		let accountLinkId = props.match.params.accountLinkId;
		return AccountLinkEditForm.map(accountLinkId, {accountLinkId, profileId});
	}
}

export default withRouter(connect(AccountLinkEditFormView));
