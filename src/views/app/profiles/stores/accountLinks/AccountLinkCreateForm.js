import AccountLinkBaseForm from "./AccountLinkBaseForm";
import AccountLinks from "./AccountLinks";
import {CACHE_POLICY} from "../../../../../stores/base/RemoteStore";
import History from "../../../../../History";
import Button from "../../../../../stores/base/form/buttons/Button";
import Res from "../../../../../assets/Res";

export default class AccountLinkCreateForm extends AccountLinkBaseForm {
	static storeName = 'AccountLinkCreateForm';


	createButtons(args) {
		return [
			Button.createSubmit({
				title: Res.string.profiles.accountLinks.create_form_submit,
				onClick: () => this.submit(),
				className: 'raised primary',
			}),
			Button.create_back(),
		]
	}

	forceSetContext() {

		return true;
	}

	getSubmitUrl() {
		return `profiles/profiles/${this.state.profileId}/account-links/`;
	}

	onSubmitCallback(response) {
		super.onSubmitCallback(response);
		History.goBack();
		this.setContext({});
		AccountLinks.get(this.state.profileId).load(CACHE_POLICY.UPDATE);
		//TODO update score with type
	}

	getTitle(args) {
		return Res.string.profiles.accountLinks.create_form_title;
	}
}
