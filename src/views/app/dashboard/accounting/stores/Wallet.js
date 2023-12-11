import RemoteStore from "../../../../../stores/base/RemoteStore";
import {STORE_TYPE} from "../../../../../stores/base/Store";
import WalletEditForm from "./WalletEditForm";
import Button from "../../../../../stores/base/form/buttons/Button";
import Res from "../../../../../assets/Res";
import History from "../../../../../History";
import MessageQueue from "../../../../../stores/base/MessageQueue";
import App from "../../../../../stores/app/App";

export default class Wallet extends RemoteStore {
	static storeName = 'Wallet';
	static type = STORE_TYPE.SINGLETON;


	getInitialState(args) {

		return {
			...super.getInitialState(),
			withdrawButton: Button.create_button({
				name: 'withdrawButton',
				title: Res.string.dashboard.accounting.withdraw_button,
				className: 'raised success full',
				onClick: () => this.withdraw(),
			}),
			walletEditButton: Button.create_button({
				name: 'walletEdit',
				title: Res.string.dashboard.accounting.wallet_edit_button,
				className: 'raised primary full',
				onClick: () => this.walletEdit(),
			}),
		}
	}

	getUrl() {
		return `accounting/profiles/${App.getId()}/wallet/`;
	}

	success(data, status) {
		super.success(data, status);
		WalletEditForm.get().setContext(data);
	}

	static getBalance() {
		return Wallet.get().state.data.balance;
	}

	walletEdit() {
		History.pushSmallModal('/dashboard/accounting/wallet-edit/')

	}

	withdraw() {
		if (this.state.data.credit_card && this.state.data.sheba) {
			History.pushSmallModal('/dashboard/accounting/withdraw/')
		} else {
			MessageQueue.show(
				Res.string.dashboard.accounting.withdraw_data_error,
				'danger',
			)
		}
	}
}
