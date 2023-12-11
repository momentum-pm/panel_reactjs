import Field, {FIELD_TYPE} from "./Field";


export default class ScoreField extends Field {
	static storeName = FIELD_TYPE.SCORE;

	/**
	 * @param {string} args.name - The name of the field
	 * @param {string} [args.label = undefined] - The label of the field
	 * @param {boolean} [args.required = true] - If the field is required, default is true
	 * @param {string} [args.hint = undefined] - Hint for the field
	 * @param {string} [args.className = undefined] - The root class of field_view
	 * @param {boolean} [args.hasNull = false] - has null
	 * @param {number} args.minValue - min value
	 * @param {number} args.maxValue - max value
	 * @param {number} args.steps - steps
	 * @param {function} args.mapValueToTitle
	 * @returns {Store} the created store
	 */
	static create(args) {
		if(args.hasNull === undefined){
			args.hasNull = false;
		}
		return super.create({...args});
	}

}
