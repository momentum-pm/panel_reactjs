import EducationBaseForm from "./EducationBaseForm";
import Educations from "./Educations";
import {CACHE_POLICY} from "../../../../../stores/base/RemoteStore";
import History from "../../../../../History";
import Button from "../../../../../stores/base/form/buttons/Button";
import Res from "../../../../../assets/Res";

export default class EducationCreateForm extends EducationBaseForm {
	static storeName = 'EducationCreateForm';

	createButtons(args) {
		return [
			Button.createSubmit({
				title: Res.string.profiles.educations.create_form_submit,
				onClick: () => this.submit(),
				className: 'raised primary',
			}),
			Button.create_back(),
		]
	}

	getSubmitUrl() {
		return `profiles/profiles/${this.state.profileId}/educations/`;
	}

	onSubmitCallback(response) {
		super.onSubmitCallback(response);
		History.goBack();
		this.setContext({});
		Educations.get(this.state.profileId).load(CACHE_POLICY.UPDATE);

	}

	forceSetContext() {
		return true;
	}

	getTitle(args) {
		return Res.string.profiles.educations.create_form_title;
	}
}
