import Field, {FIELD_TYPE} from "./Field";

export default class TextField extends Field {
	static storeName = FIELD_TYPE.TEXT;

	/**
	 * @param {string} args.name - The name of the field
	 * @param {string} [args.label = undefined] - The label of the field
	 * @param {boolean} [args.required = true] - If the field is required, default is true
	 * @param {string} [args.hint = undefined] - Hint for the field
	 * @param {string} [args.className = undefined] - The root class of field_view
	 * @param {function[]} [args.validators = [] ] - The array of field validators
	 * @param {number} [args.rows = 3] - The rows of the field
	 * @param {string} args.placeholder - The placeholder of the field
	 * @returns {Store} the created store
	 */
	static create(args) {
		if (args.rows === undefined) {
			args.rows = 3;
		}
		return super.create({...args});
	}
}
