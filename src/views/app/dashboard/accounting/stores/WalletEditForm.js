import Form from "../../../../../stores/base/form/Form";
import {STORE_TYPE} from "../../../../../stores/base/Store";
import CharField from "../../../../../stores/base/form/fields/CharField";
import Validators from "../../../../../utils/Validators";
import Res from "../../../../../assets/Res";
import Button from "../../../../../stores/base/form/buttons/Button";
import History from "../../../../../History";
import Wallet from "./Wallet";
import {CACHE_POLICY} from "../../../../../stores/base/RemoteStore";
import App from "../../../../../stores/app/App";


export default class WalletEditForm extends Form {
	static storeName = 'WalletEditForm';
	static type = STORE_TYPE.SINGLETON;


	getSubmitUrl() {
		return `accounting/profiles/${App.getId()}/wallet/`;

	}

	createFields(args) {
		return [
			CharField.create({
				name: 'credit_card',
				validators: [Validators.numeric, Validators.credit_card],
				label: Res.string.dashboard.accounting.credit_card_label,
				placeholder: Res.string.dashboard.accounting.credit_card_placeholder,
				hint: Res.string.dashboard.accounting.credit_card_hint,
			}),
			CharField.create({
				name: 'sheba',
				validators: [Validators.numeric, Validators.sheba],
				label: Res.string.dashboard.accounting.sheba_label,
				placeholder: Res.string.dashboard.accounting.sheba_placeholder,
				hint: Res.string.dashboard.accounting.sheba_hint,
			})
		]
	}

	createButtons(args) {
		return [
			Button.createSubmit({
				title: Res.string.dashboard.accounting.wallet_edit_form_submit,
				className: 'raised primary',
				icon: Res.icon.check,
				onClick: () => this.submit(),
			}),
			Button.create_back(),
		]
	}


	getTitle(args) {
		return Res.string.dashboard.accounting.wallet_edit_form_title;
	}

	onSubmitCallback(response) {
		History.goBack();
		Wallet.get().load(CACHE_POLICY.UPDATE);
	}
}
