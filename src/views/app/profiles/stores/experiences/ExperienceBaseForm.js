import Form from "../../../../../stores/base/form/Form";
import CharField from "../../../../../stores/base/form/fields/CharField";
import Res from "../../../../../assets/Res";
import AutoCompleteField from "../../../../../stores/base/form/fields/AutoCompleteField";
import Step from "../../../../../stores/base/form/fields/Step";
import RichTextField from "../../../../../stores/base/form/fields/RichTextField";
import SwitchField from "../../../../../stores/base/form/fields/SwitchField";
import DateField from "../../../../../stores/base/form/fields/DateField";
import {GregorianCalendar} from "../../../../../utils/CalendarUtils";
import Validators from "../../../../../utils/Validators";

export default class ExperienceBaseForm extends Form {
	static storeName = 'ExperienceBaseForm';

	createFields(args) {
		return [
			Step.create({
				name: 'title-step',
				index: 1,
				label: Res.string.profiles.experiences.step_title_label,
			}),
			CharField.create({
				name: 'title',
				label: Res.string.profiles.experiences.title_label,
				placeholder: Res.string.profiles.experiences.title_placeholder,
				hint: Res.string.profiles.experiences.title_hint,
				className: 'inline-half-row-responsive',
			}),
			AutoCompleteField.create({
				name: 'organization',
				label: Res.string.profiles.experiences.organization_label,
				placeholder: Res.string.profiles.experiences.organization_placeholder,
				url: 'organizations/organizations/search/',
				itemToTitle: item => item.name,
				itemToValue: item => item.name,
				className: 'inline-half-row-responsive',
			}),
			Step.create({
				name: 'duration-step',
				index: 2,
				label: Res.string.profiles.experiences.step_duration_label,
			}),
			SwitchField.create({
				name: 'still-working',
				required: false,
				className: 'half-row-responsive',
				question: Res.string.profiles.experiences.still_working_title,
			}),
			DateField.create({
				name: 'start',
				minValue: "1991-03-21",
				maxValue: GregorianCalendar.getToday(),
				defaultValue: GregorianCalendar.getToday(),
				className: 'inline-half-row-responsive',
				label: Res.string.profiles.experiences.start_label,
			}),
			DateField.create({
				name: 'end',
				minValue: "1991-03-21",
				maxValue: GregorianCalendar.getToday(),
				defaultValue: GregorianCalendar.getToday(),
				className: 'inline-half-row-responsive',
				label: Res.string.profiles.experiences.end_label,
			}),

			Step.create({
				name: 'description-step',
				index: 3,
				label: Res.string.profiles.experiences.step_description_label,
			}),
			RichTextField.create({
				name: 'about',
				required: false,
				validators: [Validators.at_last(500, Res.string.characters, true)],
				label: Res.string.profiles.experiences.about_label,
				placeholder: Res.string.profiles.experiences.about_placeholder,
				rows: 2,
			}),
		]
	}

	createButtons(args) {
		return [];

	}


	onFieldChange(field) {
		if (field.state.name === 'still-working') {
			let endField = this.getField('end');
			if (field.state.value) {
				endField.setProperty('className', 'invisible-field inline-half-row-responsive');
				endField.resetValue(null);
				endField.setProperty('required', false);

			} else {
				endField.setProperty('className', 'inline-half-row-responsive');
				endField.setProperty('required', true);
			}
		}
	}
}
