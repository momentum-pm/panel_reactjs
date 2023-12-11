import {FIELD_TYPE} from "./Field";
import DateField from "./DateField";

export default class FixedDayDateField extends DateField {
	static storeName = FIELD_TYPE.FIXED_DAY_DATE_FIELD;

	/**
	 * @param {string} args.name - The name of the field
	 * @param {string} [args.label = undefined] - The label of the field
	 * @param {boolean} [args.required = true] - If the field is required, default is true
	 * @param {string} [args.hint = undefined] - Hint for the field
	 * @param {string} [args.minDate = undefined] - Hint for the field
	 * @param {string} [args.maxDate = undefined] - Hint for the field
	 * @param {string} [args.className = undefined] - The root class of field_view
	 * @param {number} args.fixedDay - the fixed day
	 * @param {function[]} [args.validators = [] ] - The array of field validators
	 * @returns {Store} the created store
	 */
	static create(args) {
		args['hasValidDay'] = true;
		return super.create({...args});
	}

	hasValidDay() {
		return true;
	}

	setValues(year, month) {
		super.setValues(year, month, this.state.fixedDay);
	}
}
