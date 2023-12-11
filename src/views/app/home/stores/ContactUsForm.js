import Form from "../../../../stores/base/form/Form";
import {STORE_TYPE} from "../../../../stores/base/Store";
import CharField from "../../../../stores/base/form/fields/CharField";
import Res from "../../../../assets/Res";
import Validators from "../../../../utils/Validators";
import TextField from "../../../../stores/base/form/fields/TextField";
import Button from "../../../../stores/base/form/buttons/Button";

export default class ContactUsForm extends Form {
	static storeName = 'ContactUsForm';
	static type = STORE_TYPE.SINGLETON;

	createFields(args) {
		return [
			CharField.create({
				name: 'first_name',
				label: Res.string.home.contact_us_first_name_label,
				placeholder: Res.string.home.contact_us_first_name_placeholder,
				className: 'inline-half-row-responsive',
				validators: [Validators.at_last(50, Res.string.characters)]
			}),
			CharField.create({
				name: 'last_name',
				label: Res.string.home.contact_us_last_name_label,
				placeholder: Res.string.home.contact_us_last_name_placeholder,
				className: 'inline-half-row-responsive',
				validators: [Validators.at_last(50, Res.string.characters)]
			}),
			CharField.createEmail({
				name: 'email',
				label: Res.string.home.contact_us_email_label,
				placeholder: Res.string.home.contact_us_email_placeholder,
				className: 'inline-half-row-responsive',
			}),
			CharField.createPhoneNumber({
				name: 'phone_number',
				label: Res.string.home.contact_us_phone_number_label,
				placeholder: Res.string.home.contact_us_phone_number_placeholder,
				className: 'inline-half-row-responsive',
			}),
			TextField.create({
				name: 'message',
				rows: 2,
				label: Res.string.home.contact_us_message_label,
				placeholder: Res.string.home.contact_us_message_placeholder,
				validators:[Validators.at_last(2000,Res.string.characters)]
			}),
		]
	}

	createButtons(args) {
		return [
			Button.createSubmit({
				onClick: () => this.submit(),
				title: Res.string.home.contact_us_submit,
				className: 'raised large success',
				icon: Res.icon.check,
			}),
		]
	}

	getSubmitUrl() {
		return 'home/contact-us/';
	}

	onSubmitCallback(response) {
		this.setContext({});
	}

	forceSetContext() {
		return true;
	}
}
