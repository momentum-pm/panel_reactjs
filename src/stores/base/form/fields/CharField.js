import Field, {FIELD_TYPE} from "./Field";
import Validators from "../../../../utils/Validators";
import {isDigitalString, toLangNumber, toStringNumber} from "../../../../utils/StringUtils";

export const INPUT_TYPES = {
	PASSWORD: 'password',
	PHONE_NUMBER: 'tel',
	NUMBER: 'tel',
	TEXT: 'text',
	EMAIL: 'email',
};

export default class CharField extends Field {
	static storeName = FIELD_TYPE.CHAR;

	static getActions() {
		return [...super.getActions(), 'setOptions'];
	}

	/**
	 * @param {string} args.name - The name of the field
	 * @param {string} [args.label = undefined] - The label of the field
	 * @param {boolean} [args.required = true] - If the field is required, default is true
	 * @param {string} [args.hint = undefined] - Hint for the field
	 * @param {string} [args.className = undefined] - The root class of field_view
	 * @param {function[]} [args.validators = [] ] - The array of field validators
	 * @param {boolean} [args.auto_complete = "on"] - If the field is required, default is true
	 * @param {string} [args.input_type = INPUT_TYPES.TEXT] - The input type of the field
	 * @param {string} args.placeholder - The placeholder of the field
	 * @returns {Store} the created store
	 */
	static create(args) {
		if (args.input_type === undefined) {
			args.input_type = INPUT_TYPES.TEXT;
		}
		if (args.auto_complete === undefined) {
			args.auto_complete = true;
		}
		args.options = [];
		return super.create({...args});
	}

	/**
	 * @param {string} args.name - The name of the field
	 * @param {string} [args.label = undefined] - The label of the field
	 * @param {string} [args.unit = undefined] - The label of the field
	 * @param {boolean} [args.required = true] - If the field is required, default is true
	 * @param {string} [args.hint = undefined] - Hint for the field
	 * @param {string} [args.className = undefined] - The root class of field_view
	 * @param {function[]} [args.validators = [] ] - The array of field validators
	 * @param {string} [args.auto_complete = "on"] - If the field is required, default is true
	 * @param {string} [args.input_type = INPUT_TYPES.TEXT] - The input type of the field
	 * @param {string} args.placeholder - The placeholder of the field
	 * @returns {Store} the created store
	 */
	static createNumber(args) {
		if (args.validators === undefined) {
			args.validators = [];
		}
		return this.create({
			...args,
			input_type: INPUT_TYPES.NUMBER,
			validators: [
				Validators.numeric,
				...args.validators,
			]
		});
	}

	/**
	 * @param {string} args.name - The name of the field
	 * @param {string} [args.label = undefined] - The label of the field
	 * @param {boolean} [args.required = true] - If the field is required, default is true
	 * @param {string} [args.hint = undefined] - Hint for the field
	 * @param {string} [args.className = undefined] - The root class of field_view
	 * @param {function[]} [args.validators = [] ] - The array of field validators
	 * @param {string} [args.auto_complete = "on"] - If the field is required, default is true
	 * @param {string} args.placeholder - The placeholder of the field
	 * @returns {Store} the created store
	 */
	static createEmail(args) {
		if (args.validators === undefined) {
			args.validators = [];
		}
		return this.create({
			...args,
			input_type: INPUT_TYPES.EMAIL,
			validators: [
				Validators.email,
				...args.validators,
			]
		});
	}

	/**
	 * @param {string} args.name - The name of the field
	 * @param {string} [args.label = undefined] - The label of the field
	 * @param {boolean} [args.required = true] - If the field is required, default is true
	 * @param {string} [args.hint = undefined] - Hint for the field
	 * @param {string} [args.className = undefined] - The root class of field_view
	 * @param {function[]} [args.validators = [] ] - The array of field validators
	 * @param {string} [args.auto_complete = "on"] - If the field is required, default is true
	 * @param {string} args.placeholder - The placeholder of the field
	 * @returns {Store} the created store
	 */
	static createPhoneNumber(args) {
		if (args.validators === undefined) {
			args.validators = [];
		}
		return this.create({
			...args,
			isPhoneNumber: true,
			input_type: INPUT_TYPES.PHONE_NUMBER,
			validators: [
				Validators.phone_number,
				...args.validators,
			]
		});
	}

	setOptions(options) {
		this.state.options = options;
		this.save();
		this.setOption();

	}

	setOption() {
		let value = this.state.value;
		let option = null;
		this.state.options.forEach(o => {
			if (this.state.optionToTitle(o) === value) {
				option = o;
			}
		});
		this.state.option = option;
		this.save();
	}

	setValue(value) {
		if ((this.state.input_type === INPUT_TYPES.PHONE_NUMBER) || (this.state.input_type === INPUT_TYPES.NUMBER)) {
			value = toLangNumber(value, 'en');
		}

		if (value === "") {
			value = null;
		}
		super.setValue(value);
		if ((this.state.input_type === INPUT_TYPES.NUMBER) && !this.state.isPhoneNumber) {
			if (value != null && isDigitalString(this.state.value)) {
				this.state.hint = toStringNumber(value) + (this.state.unit ? ' ' + this.state.unit : '');
			} else {
				this.state.hint = "";
			}
			this.save();
		}
		this.setOption();
	}
}
