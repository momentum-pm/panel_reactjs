import {FIELD_TYPE} from "./Field";
import ImageField, {RATIO} from "./ImageField";

export default class ProfilePictureField extends ImageField {
	static storeName = FIELD_TYPE.PROFILE_PICTURE;

	/**
	 * @param {string} args.name
	 * @param {string} [args.label = undefined] - The label of the field
	 * @param {boolean} [args.required = true] - If the field is required, default is true
	 * @param {string} [args.hint = undefined] - Hint for the field
	 * @param {string} [args.className = undefined] - The root class of field_view
	 * @param {function[]} [args.validators = [] ] - The array of field validators
	 * @returns {Store} the created store
	 */
	static create(args) {
		return super.create({...args, ratio: RATIO.W10H10});
	}
}
