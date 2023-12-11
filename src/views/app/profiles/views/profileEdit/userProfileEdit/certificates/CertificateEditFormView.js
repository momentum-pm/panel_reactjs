import {withRouter} from "react-router";
import {connect} from "../../../../../../../stores/base/StoreManager";
import CertificateEditForm from "../../../../stores/certificates/CertificateEditForm";
import ScrollableFormBox from "../../../../../../base/forms/ScrollableFormBox";


class CertificateEditFormView extends ScrollableFormBox {
	static getForm(props) {
		let profileId = props.match.params.profileId;
		let certificateId = props.match.params.certificateId;
		return CertificateEditForm.map(certificateId, {certificateId, profileId});
	}
}

export default withRouter(connect(CertificateEditFormView));
