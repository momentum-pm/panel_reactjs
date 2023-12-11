import SampleBaseForm from "./SampleBaseForm";
import {CACHE_POLICY} from "../../../../../stores/base/RemoteStore";
import History from "../../../../../History";
import Button from "../../../../../stores/base/form/buttons/Button";
import Res from "../../../../../assets/Res";
import SingleSamples from "./SingleSamples";

export default class SampleCreateForm extends SampleBaseForm {
	static storeName = 'SampleCreateForm';


	createButtons(args) {
		return [
			Button.createSubmit({
				title: Res.string.profiles.samples.create_form_submit,
				onClick: () => this.submit(),
				className: 'raised primary',
			}),
			Button.create_back(),
		]
	}

	getSubmitUrl() {
		return `profiles/profiles/${this.state.profileId}/samples/`;
	}


	getTitle(args) {
		return Res.string.profiles.samples.create_form_title;
	}

	submitCallback(response) {
		super.submitCallback(response);
		this.setContext({});
	}

	submit() {
		super.submit();
	}

	onSubmitCallback(response) {
		super.onSubmitCallback(response);
		History.goBack();
		this.setContext({});
		SingleSamples.get(this.state.profileId).load(CACHE_POLICY.UPDATE);
	}

	forceSetContext() {
		return true;
	}
}
