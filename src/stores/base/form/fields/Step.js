import NonValueField from "./NonValueField";
import {FIELD_TYPE} from "./Field";


export default class Step extends NonValueField {
	static storeName = FIELD_TYPE.STEP;

	/**
	 * @param {string} args.name - The name of the step
	 * @param {string} args.label - The label of the step
	 * @param {number} args.index - The index of the step
	 * @param {string} [args.className = undefined] - The root class of field_view
	 * @returns {Store} the created store
	 */
	static create(args) {
		return super.create({...args});
	}


}
