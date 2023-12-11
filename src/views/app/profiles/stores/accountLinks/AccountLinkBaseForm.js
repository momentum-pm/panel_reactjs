import Form from "../../../../../stores/base/form/Form";
import Res from "../../../../../assets/Res";
import RemoteSelectField from "../../../../../stores/base/form/fields/RemoteSelectField";
import URLField from "../../../../../stores/base/form/fields/URLField";
import Websites from "../Websites";

export default class AccountLinkBaseForm extends Form {
	static storeName = 'AccountLinkBaseForm';

	createFields(args) {
		return [
			RemoteSelectField.create({
				name: 'website',
				label: Res.string.profiles.accountLinks.website_label,
				itemToTitle: item => Res.get_attribute(item, 'title'),
				itemToValue: item => item.id,
				remoteStore: Websites.get(),
				placeholder: Res.string.profiles.accountLinks.website_placeholder,

			}),
			URLField.create({
				name: 'link',
				label: Res.string.profiles.accountLinks.address_label,
				placeholder: Res.string.profiles.accountLinks.address_placeholder,
			}),
		]
	}

	createButtons(args) {
		return [];

	}

	onFieldChange(field) {
		if (field.state.name === 'website') {
			let linkField = this.getField('link');
			if (field.state.value) {
				let website = field.getItem();
				linkField.setProperty('placeholder', Res.get_attribute(website, 'placeholder'));
			} else {
				linkField.setProperty('placeholder', Res.string.profiles.accountLinks.address_placeholder);
			}
		}
	}


}
