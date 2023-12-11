import RemoteStore from "../../../../../stores/base/RemoteStore";
import Button from "../../../../../stores/base/form/buttons/Button";
import Res from "../../../../../assets/Res";
import App from "../../../../../stores/app/App";

export default class Ticket extends RemoteStore {
	static storeName = 'Ticket';

	getInitialState(args) {
		return {
			...super.getInitialState(args),
			toggleButton: Button.create_button({
				name: 'toggleButton',
				onClick: () => this.toggle(),
				icon: Res.icon.downArrow,
				className: 'large primary'
			}),
			open: false,
		}
	}

	setClosed() {
		this.state.open = false;
		this.save();
	}

	toggle() {
		this.state.open = !this.state.open;
		if (this.state.open) {
			this.state.toggleButton.setIcon(Res.icon.upArrow);
		} else {
			this.state.toggleButton.setIcon(Res.icon.downArrow);
		}
		this.save();
	}

	getUrl() {
		return `support/profiles/${App.getId()}/tickets/${this.state.ticketId}/`;
	}
}
