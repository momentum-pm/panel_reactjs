import Field, {FIELD_TYPE} from "./Field";

export default class HiddenField extends Field {
	static storeName = FIELD_TYPE.HIDDEN;

	/**
	 * @param {string} args.name - The name of the field
	 * @param {boolean} [args.required = true] - If the field is required, default is true
	 * @returns {Store} the created store
	 */
	static create(args) {
		return super.create({...args});
	}

}
