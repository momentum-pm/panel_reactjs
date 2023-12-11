import RemoteStore from "../../../../stores/base/RemoteStore";
import Button from "../../../../stores/base/form/buttons/Button";
import Res from "../../../../assets/Res";


export default class ProfileUsername extends RemoteStore {
	static storeName = 'ProfileUsername';

	getInitialState(args) {
		return {
			...super.getInitialState(args),
			open: false,
			openButton: Button.create_button({
				name: 'openButton',
				title: Res.string.profiles.set_username_button,
				className: 'raised large success',
				onClick: () => this.open(),
			}),
			closeButton: Button.create_button({
				name: 'closeButton',
				title: Res.string.profiles.set_username_cancel_button,
				className: 'flat large success',
				onClick: () => this.close(),
			})

		}
	}

	open() {
		this.state.open = true;
		this.save();
	}

	close() {
		this.state.open = false;
		this.save();
	}

	getUrl() {
		return `profiles/profiles/${this.state.profileId}/username/`;
	}

}
