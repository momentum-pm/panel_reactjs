import FileField, {IMAGE_FORMATS} from "./FileField";
import Validators from "../../../../utils/Validators";
import {FIELD_TYPE} from "./Field";

export const RATIO = {
	W15H10: "W15H10",
	W10H10: "W10H10",
};
export default class ImageField extends FileField {
	static storeName = FIELD_TYPE.IMAGE;

	/**
	 * @param {string} args.name
	 * @param {string} args.ratio
	 * @param {string} [args.label = undefined] - The label of the field
	 * @param {boolean} [args.required = true] - If the field is required, default is true
	 * @param {string} [args.hint = undefined] - Hint for the field
	 * @param {string} [args.className = undefined] - The root class of field_view
	 * @param {function[]} [args.validators = [] ] - The array of field validators
	 * @returns {Store} the created store
	 */
	static create(args) {
		if (args.validators === undefined) {
			args.validators = [];
		}
		args.validators.push(Validators.file_format(IMAGE_FORMATS));
		return super.create({...args});
	}
}
