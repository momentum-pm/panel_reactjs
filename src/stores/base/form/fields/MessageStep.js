import NonValueField from "./NonValueField";
import {FIELD_TYPE} from "./Field";
import {STORE_TYPE} from "../../Store";


export default class MessageStep extends NonValueField {
	static storeName = FIELD_TYPE.MESSAGE_STEP;
	static type = STORE_TYPE.SEQUENCED
	/**
	 * @param {string} args.name - The name of the step
	 * @param {string} args.title - The label of the step
	 * @param {string} args.text - The index of the step
	 * @param {string} [args.className = undefined] - The root class of field_view
	 * @returns {Store} the created store
	 */
	static create(args) {
		return super.create({...args});
	}


}
