import Field, {FIELD_TYPE} from "./Field";
import Button from "../buttons/Button";
import Res from "../../../../assets/Res";

export default class SelectField extends Field {
	static storeName = FIELD_TYPE.SELECT;

	/**
	 * @param {string} args.name - The name of the field
	 * @param {string} [args.label = undefined] - The label of the field
	 * @param {string} args.placeholder - The label of the field
	 * @param {boolean} [args.required = true] - If the field is required, default is true
	 * @param {function} args.itemToTitle - Maps item to title
	 * @param {function} args.itemToValue - Maps item to value
	 * @param {Object[]} [args.items = [] ] - The choices of the field
	 * @param {string} [args.hint = undefined] - Hint for the field
	 * @param {string} [args.className = undefined] - The root class of field_view
	 * @param {string} [args.itemsClassName = undefined] - The root class of field_view
	 * @param {function[]} [args.validators = [] ] - The array of field validators
	 * @returns {Store} the created store
	 */
	static create(args) {
		if (args.items === undefined) {
			args.items = [];
		}
		return super.create({
			...args,

		});
	}

	getInitialState(args) {
		return {
			...super.getInitialState(args),
			open: false,
			cascadeButton: args.hasCascade ? Button.create_button({
				name: 'cascade',
				icon: Res.icon.downArrow,
				className: 'flat primary low-margin',
				onClick: () => this.toggleOpen()
			}) : null,
		}
	}

	static getActions() {
		return [...super.getActions(), 'setItems'];
	}

	toggleOpen() {
		this.setOpen(!this.state.open);
	}

	setOpen(open) {
		this.state.open = open;
		if (this.state.cascadeButton) {
			if (open) {
				this.state.cascadeButton.setIcon(Res.icon.upArrow);
			} else {
				this.state.cascadeButton.setIcon(Res.icon.downArrow);
			}
		}
		this.save()
	}


	setItems(items) {
		this.state.items = items;
		let isValidValue = false;
		if (this.state.value || (Array.isArray(this.state.value) && this.state.value.length === 0)) {
			this.state.items.forEach(item => {
				if (this.state.itemToValue(item).toString() === this.state.value.toString()) {
					isValidValue = true;
				}
			});
		} else {
			isValidValue = true;
		}
		if (isValidValue) {
			this.state.item = this.detectItem();
			this.state.error = this.getError();
			this.save();
		} else {
			if (this.state.touched) {
				this.setValue(null);
			} else {
				this.save();
			}
		}
	}


	resetValue(value) {
		if (value) {
			if (Array.isArray(value)) {
				let valueArray = [];
				value.forEach(item => {
					valueArray.push(this.state.itemToValue(item));
				});
				if (value.length > 0) {
					this.setOpen(true);
				}
				super.resetValue(valueArray);

			} else {
				this.state.item = value;
				if (value) {
					this.setOpen(true);
				}
				super.resetValue(this.state.itemToValue(value));
			}
		} else {
			if (value === undefined) {
				value = null;
				this.setOpen(false);
			}
			if (value) {
				this.setOpen(true);
			}
			super.resetValue(value);
		}
	}


	setValue(value) {
		this.state.value = value;
		this.state.item = this.detectItem();
		super.setValue(value);
		if ((Array.isArray(value) && value.length > 0) || (!Array.isArray(value) && value)) {
			this.setOpen(true);
		}
		super.setValue(value);
	}

	detectItem() {
		if (!this.state.value) {
			return null;
		}
		let selectedItem = null;
		this.state.items.forEach((item) => {
			if (this.state.itemToValue(item).toString() === this.state.value.toString()) {
				selectedItem = item;
			}
		});
		return selectedItem;
	}

	getItem() {
		return this.state.item;
	}

}
