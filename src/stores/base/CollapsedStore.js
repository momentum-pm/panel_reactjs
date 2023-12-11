import Res from "../../assets/Res";
import Button from "./form/buttons/Button";
import Store from "./Store";

export default class CollapsedStore extends Store {
	static storeName = 'CollapsedStore';


	getInitialState(args) {
		return {
			...super.getInitialState(args),
			isOpen: args.initialOpen,
			title:this.getTitle(args),
			toggleButton: this.createCollapseButton(args),
		}
	}

	createCollapseButton(args) {
		return Button.create_button({
			name: 'collapse',
			className: args.initialOpen ? this.getOpenClass() : this.getCloseClass(),
			icon: args.initialOpen ? this.getOpenIcon() : this.getCloseIcon(),
			title: args.initialOpen ? this.getOpenTitle() : this.getCloseTitle(),
			onClick: () => this.toggleOpen(),
		});
	}

	getCloseIcon() {
		return Res.icon.downArrow;
	}

	getOpenIcon() {
		return Res.icon.upArrow;
	}

	getOpenClass() {
		return 'flat gray';
	}

	getCloseClass() {
		return 'flat primary';

	}

	getOpenTitle() {
		return '';
	}

	getCloseTitle() {
		return '';
	}

	toggleOpen() {
		this.state.isOpen = !this.state.isOpen;
		if (this.state.isOpen) {
			this.state.toggleButton.setIcon(this.getOpenIcon());
			this.state.toggleButton.set_title(this.getOpenTitle());
			this.state.toggleButton.setClassName(this.getOpenClass());
		} else {
			this.state.toggleButton.setIcon(this.getCloseIcon());
			this.state.toggleButton.set_title(this.getCloseTitle());
			this.state.toggleButton.setClassName(this.getCloseClass());
		}
		this.save();
	}

	getTitle(args){

	}
}
