import {withRouter} from "react-router";
import {connect} from "../../../../../../../stores/base/StoreManager";
import CertificateCreateForm from "../../../../stores/certificates/CertificateCreateForm";
import ScrollableFormBox from "../../../../../../base/forms/ScrollableFormBox";


class CertificateCreateFormView extends ScrollableFormBox {
	static getForm(props) {
		let profileId = props.match.params.profileId;
		return CertificateCreateForm.map(profileId, {profileId});
	}
}

export default withRouter(connect(CertificateCreateFormView));
