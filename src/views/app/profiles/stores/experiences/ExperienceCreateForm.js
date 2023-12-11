import ExperienceBaseForm from "./ExperienceBaseForm";
import Experiences from "./Experiences";
import {CACHE_POLICY} from "../../../../../stores/base/RemoteStore";
import History from "../../../../../History";
import Button from "../../../../../stores/base/form/buttons/Button";
import Res from "../../../../../assets/Res";

export default class ExperienceCreateForm extends ExperienceBaseForm {
	static storeName = 'ExperienceCreateForm';


	createButtons(args) {
		return [
			Button.createSubmit({
				title: Res.string.profiles.experiences.create_form_submit,
				onClick: () => this.submit(),
				className: 'raised primary',
			}),
			Button.create_back(),
		]
	}

	getSubmitUrl() {
		return `profiles/profiles/${this.state.profileId}/experiences/`;
	}

	onSubmitCallback(response) {
		super.onSubmitCallback(response);
		History.goBack();
		this.setContext({});
		Experiences.get(this.state.profileId).load(CACHE_POLICY.UPDATE);
	}

	forceSetContext() {
		return true;
	}

	getTitle(args) {
		return Res.string.profiles.experiences.create_form_title;
	}
}
