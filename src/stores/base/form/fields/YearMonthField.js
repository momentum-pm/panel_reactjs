import Field, {FIELD_TYPE} from "./Field";

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
	 * @param {function[]} [args.validators = [] ] - The array of field validators
	 * @returns {Store} the created store
	 */
	static create(args) {
		if (args.items === undefined) {
			args.items = [];
		}
		return super.create({...args});
	}

	static getActions() {
		return [...super.getActions(), 'setItems'];
	}

	setItems(items) {
		this.state.items = items;
		this.resetValue(this.state.value);
	}

	getItem() {
		if (!this.state.value) {
			return undefined;
		}
		let selectedItem = undefined;
		this.state.items.forEach((item) => {
			if (this.state.itemToValue(item).toString() === this.state.value.toString()) {
				selectedItem = item;
			}
		});
		return selectedItem;
	}

}
