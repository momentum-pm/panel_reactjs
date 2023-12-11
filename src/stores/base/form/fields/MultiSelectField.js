import {FIELD_TYPE} from "./Field";
import SelectField from "./SelectField";

export default class MultiSelectField extends SelectField {
	static storeName = FIELD_TYPE.MULTI_SELECT;


	/**
	 * @param {string} args.name - The name of the field
	 * @param {string} [args.label = undefined] - The label of the field
	 * @param {string} args.placeholder - The label of the field
	 * @param {boolean} [args.required = true] - If the field is required, default is true
	 * @param {function} args.itemToTitle - Maps item to title
	 * @param {function} args.itemToValue - Maps item to value
	 * @param {Object[]} [args.items = [] ] - The choices of the field
	 * @param {Object[]} [args.hasSelectAll = false ] - Has Select All Item
	 * @param {Object[]} [args.defaultSelectAll = false ] - Has Select All Item
	 * @param {string} [args.hint = undefined] - Hint for the field
	 * @param {string} [args.className = undefined] - The root class of field_view
	 * @param {function[]} [args.validators = [] ] - The array of field validators
	 * @returns {Store} the created store
	 */
	static create(args) {
		return super.create({...args});
	}

	static getActions() {
		return [...super.getActions(), 'toggleItem', 'isCheckedItem', 'selectAllToggle', 'selectAllChecked'];
	}

	getInitialState(args) {
		if (args.value === undefined) {
			args.value = [];
		}
		return super.getInitialState(args);
	}


	setItems(items) {
		super.setItems(items);
		if (this.state.defaultSelectAll) {
			this.selectAllToggle();
		}
	}

	setValue(value) {
		if (value) {
			super.setValue(value);
		} else {
			super.setValue([]);
		}
	}

	resetValue(context) {
		if (context) {
			super.resetValue(context);
		} else {
			super.resetValue([]);
		}
	}

	toggleItem(item_value) {
		let checked = false;
		this.state.value.forEach(item => {
			if (item === item_value) {
				checked = true;
			}
		});
		let new_value;
		if (checked) {
			new_value = this.state.value.filter(item => item !== item_value);
		} else {
			new_value = [...this.state.value, item_value];
		}
		this.setValue(new_value);
	}

	isCheckedItem(item) {
		let itemValue = this.state.itemToValue(item);
		let checked = false;
		this.state.value.forEach(checkedValue => {
			if (checkedValue.toString() === itemValue.toString()) {
				checked = true;
			}
		});
		return checked;
	}


	selectAllChecked() {
		return this.state.value.length === this.state.items.length;
	}

	selectAllToggle() {
		if (this.selectAllChecked()) {
			this.setValue([]);
		} else {
			this.setValue([...this.state.items.map(this.state.itemToValue)]);
		}
	}

	getSelectedItems() {
		let toReturn = [];
		this.state.value.forEach(itemValue => {
			this.state.items.forEach(item => {
				if (this.state.itemToValue(item) === itemValue) {
					toReturn.push(item);
				}
			});
		});
		return toReturn;
	}
}
