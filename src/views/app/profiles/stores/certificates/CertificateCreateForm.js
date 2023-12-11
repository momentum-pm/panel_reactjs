import CertificateBaseForm from "./CertificateBaseForm";
import Certificates from "./Certificates";
import {CACHE_POLICY} from "../../../../../stores/base/RemoteStore";
import History from "../../../../../History";
import Button from "../../../../../stores/base/form/buttons/Button";
import Res from "../../../../../assets/Res";

export default class CertificateCreateForm extends CertificateBaseForm {
	static storeName = 'CertificateCreateForm';


	createButtons(args) {
		return [
			Button.createSubmit({
				title: Res.string.profiles.certificates.create_form_submit,
				onClick: () => this.submit(),
				className: 'raised primary',
			}),
			Button.create_back(),
		]
	}

	getSubmitUrl() {
		return `profiles/profiles/${this.state.profileId}/certificates/`;
	}

	onSubmitCallback(response) {
		super.onSubmitCallback(response);
		History.goBack();
		this.setContext({});
		Certificates.get(this.state.profileId).load(CACHE_POLICY.UPDATE);
	}

	getTitle(args) {
		return Res.string.profiles.certificates.create_form_title;
	}

	forceSetContext() {
		return true;
	}
}

