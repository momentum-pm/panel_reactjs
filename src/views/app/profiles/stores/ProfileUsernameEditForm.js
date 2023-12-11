import {STORE_TYPE} from "../../../../../../stores/base/Store";
import RemoteForm from "../../../../../../stores/base/form/RemoteForm";
import ProfileUsername from "./ProfileUsername";
import {CACHE_POLICY} from "../../../../../../stores/base/RemoteStore";
import SwitchField from "../../../../../../stores/base/form/fields/SwitchField";
import Res from "../../../../../../assets/Res";
import App from "../../../../stores/app/App";


export default class ProfileUsernameEditForm extends RemoteForm {
	static type = STORE_TYPE.SINGLETON;
	static storeName = 'ProfileUsernameEditForm';

	getRemoteStore(args) {
		return ProfileUsername.get();
	}

	createFields(args) {
		return [
			SwitchField.create({
				name: 'active_support',
				question: Res.string.dashboard.admin.support_active_question,
				required: false,
			})
		]
	}

	createButtons(args) {
		return []
	}

	setContext(context) {
		this.state.lastValue = context && context.active_support;
		super.setContext(context);
	}

	onFieldChange(field) {
		if (field.state.value !== this.state.lastValue) {
			this.state.lastValue = field.state.value;
			this.save();
			this.submit();
		}
	}
	submit() {
		super.submit();
	}

	onSubmitCallback(response) {
		this.state.remoteStore.load(CACHE_POLICY.UPDATE);
	}

	getSubmitUrl() {
		return `apiadmin/profiles/${App.getId()}/support-active/`;
	}
}
