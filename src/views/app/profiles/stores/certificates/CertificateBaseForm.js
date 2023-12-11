import Form from "../../../../../stores/base/form/Form";
import CharField from "../../../../../stores/base/form/fields/CharField";
import Res from "../../../../../assets/Res";
import AutoCompleteField from "../../../../../stores/base/form/fields/AutoCompleteField";
import Step from "../../../../../stores/base/form/fields/Step";
import FixedDayDateField from "../../../../../stores/base/form/fields/FixedDayDateField";
import Validators from "../../../../../utils/Validators";

export default class CertificateBaseForm extends Form {
	static storeName = 'CertificateBaseForm';

	createFields(args) {
		return [
			Step.create({
				name: 'title-step',
				index: 1,
				label: Res.string.profiles.certificates.step_title_label,
			}),
			CharField.create({
				name: 'title',
				label: Res.string.profiles.certificates.title_label,
				placeholder: Res.string.profiles.certificates.title_placeholder,
				className: 'inline-half-row-responsive',
			}),
			CharField.createNumber({
				name: 'rank',
				validators:[Validators.at_last(4),Validators.at_least(1)],
				label: Res.string.profiles.certificates.rank_label,
				placeholder: Res.string.profiles.certificates.rank_placeholder,
				className: 'inline-half-row-responsive',
			}),
			AutoCompleteField.create({
				name: 'organization',
				label: Res.string.profiles.certificates.organization_label,
				placeholder: Res.string.profiles.certificates.organization_placeholder,
				url: 'organizations/organizations/search/',
				itemToTitle: item => item.name,
				itemToValue: item => item.name,
				className: 'inline-half-row-responsive',
			}),
			FixedDayDateField.create({
				name: 'date',
				minDate: "1991-03-21",
				fixedDay: 1,
				className: 'inline-half-row-responsive',
				label: Res.string.profiles.certificates.date_label,
				required: false,
			}),

			// Step.create({
			// 	name: 'description-step',
			// 	index: 2,
			// 	label: Res.string.profiles.certificates.step_description_label,
			// }),
			// RichTextField.create({
			// 	name: 'about',
			// 	validators: [Validators.at_last(500, Res.string.characters, true)],
			// 	required: false,
			// 	label: Res.string.profiles.certificates.about_label,
			// 	placeholder: Res.string.profiles.certificates.about_placeholder,
			// 	rows: 2,
			// }),
		]
	}

	createButtons(args) {
		return [];

	}


}
