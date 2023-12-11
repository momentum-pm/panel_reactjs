import {FIELD_TYPE} from "./Field";
import BooleanField from "./BooleanField";

export default class SwitchField extends BooleanField {
	static storeName = FIELD_TYPE.SWITCH;

	/**
	 * @param {string} args.name - The name of the field
	 * @param {string} [args.question] - The question of the field
	 * @param {string} [args.label] - The label of the field
	 * @param {boolean} [args.required = true] - If the field is required, default is true
	 * @param {string} [args.hint = undefined] - Hint for the field
	 * @param {any} [args.offIcon] - Icon on the off mode
	 * @param {any} [args.onIcon] - Icon on the on mode
	 * @param {string} [args.offClassName] - Icon on the off mode
	 * @param {string} [args.className = undefined] - The root class of field_view
	 * @param {function[]} [args.validators = [] ] - The array of field validators
	 * @returns {Store} the created store
	 */
	static create(args) {
		return super.create({...args});
	}



}
