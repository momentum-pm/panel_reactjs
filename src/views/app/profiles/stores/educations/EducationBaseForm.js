import Form from "../../../../../stores/base/form/Form";
import Res from "../../../../../assets/Res";
import AutoCompleteField from "../../../../../stores/base/form/fields/AutoCompleteField";
import Step from "../../../../../stores/base/form/fields/Step";
import RemoteSelectField from "../../../../../stores/base/form/fields/RemoteSelectField";
import Stages from "../Stages";
import FixedDayDateField from "../../../../../stores/base/form/fields/FixedDayDateField";
import RichTextField from "../../../../../stores/base/form/fields/RichTextField";
import SwitchField from "../../../../../stores/base/form/fields/SwitchField";
import Validators from "../../../../../utils/Validators";

export default class EducationBaseForm extends Form {
	static storeName = 'EducationBaseForm';

	createFields(args) {
		return [
			Step.create({
				name: 'title-step',
				index: 1,
				label: Res.string.profiles.educations.step_title_label,
			}),
			AutoCompleteField.create({
				name: 'organization',
				label: Res.string.profiles.educations.organization_label,
				placeholder: Res.string.profiles.educations.organization_placeholder,
				url: 'organizations/organizations/search/',
				itemToTitle: item => item.name,
				itemToValue: item => item.name,
				className: 'inline-half-row-responsive',
			}),
			AutoCompleteField.create({
				name: 'major',
				label: Res.string.profiles.educations.major_label,
				placeholder: Res.string.profiles.educations.major_placeholder,
				url: 'profiles/majors/search/',
				itemToTitle: item => Res.get_attribute(item, 'title'),
				itemToValue: item => Res.get_attribute(item, 'title'),
				className: 'inline-half-row-responsive',
			}),
			RemoteSelectField.create({
				name: 'stage',
				label: Res.string.profiles.educations.stage_label,
				placeholder: Res.string.profiles.educations.stage_placeholder,
				remoteStore: Stages.get(),
				itemToTitle: item => Res.get_attribute(item, 'title'),
				itemToValue: item => item.id,
				className: 'half-row-responsive',
			}),
			Step.create({
				name: 'duration-step',
				index: 2,
				label: Res.string.profiles.educations.step_duration_label,
			}),
			FixedDayDateField.create({
				name: 'start',
				minDate: "1991-03-21",
				fixedDay: 1,
				className: 'half-row-responsive',
				label: Res.string.profiles.educations.start_label,
			}),
			SwitchField.create({
				name: 'graduated',
				required: false,
				className: 'half-row-responsive',
				question: Res.string.profiles.educations.graduated_title,
			}),

			Step.create({
				name: 'description-step',
				index: 3,
				label: Res.string.profiles.educations.step_description_label,
			}),
			RichTextField.create({
				name: 'about',
				required: false,
				validators: [Validators.at_last(500, Res.string.characters, true)],
				label: Res.string.profiles.educations.about_label,
				placeholder: Res.string.profiles.educations.about_placeholder,
				rows: 2,
			}),
		]
	}

	createButtons(args) {
		return [];

	}


}
