import Form from "../../../../../stores/base/form/Form";
import {STORE_TYPE} from "../../../../../stores/base/Store";
import CharField from "../../../../../stores/base/form/fields/CharField";
import Validators from "../../../../../utils/Validators";
import Res from "../../../../../assets/Res";
import Button from "../../../../../stores/base/form/buttons/Button";
import History from "../../../../../History";
import Wallet from "./Wallet";
import {CACHE_POLICY} from "../../../../../stores/base/RemoteStore";
import BooleanField from "../../../../../stores/base/form/fields/BooleanField";
import Withdraws from "./Withdraws";
import App from "../../../../../stores/app/App";


export default class WithdrawCreateForm extends Form {
	static storeName = 'WithdrawCreateForm';
	static type = STORE_TYPE.SINGLETON;


	getSubmitUrl() {
		return `accounting/profiles/${App.getId()}/withdraws/`;
	}

	createFields(args) {
		return [
			CharField.createNumber({
				name: 'amount',
				unit: Res.string.tooman,
				auto_complete: "off",
				validators: [Validators.at_least_num(1000, Res.string.tooman),
					Validators.at_last_num(Wallet.getBalance(), Res.string.tooman)],
				label: Res.string.dashboard.accounting.amount_label,
				placeholder: Res.string.dashboard.accounting.amount_placeholder,
			}),
			BooleanField.create({
				name: 'use_all',
				question: Res.string.dashboard.accounting.use_all,
			})
		]
	}


	onFieldChange(field) {
		if (field.state.name === 'use_all') {
			if (field.state.value === true) {
				this.getField('amount').setValue(Wallet.getBalance());
			}
		}
	}

	getValues() {
		let superValues = super.getValues();
		return {
			amount: parseInt(superValues.amount)
		}
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
		Withdraws.get().load(CACHE_POLICY.UPDATE);
		this.setContext({});

	}


	forceSetContext() {
		return true;
	}

}
