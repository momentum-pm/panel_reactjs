import Field, {FIELD_TYPE} from "./Field";
import {GregorianCalendar, JalaliCalendar} from "../../../../utils/CalendarUtils";
import Res from "../../../../assets/Res";

export default class DateField extends Field {
	static storeName = FIELD_TYPE.DATE_FIELD;

	/**
	 * @param {string} args.name - The name of the field
	 * @param {string} [args.label = undefined] - The label of the field
	 * @param {boolean} [args.required = true] - If the field is required, default is true
	 * @param {string} [args.hint = undefined] - Hint for the field
	 * @param {string} [args.minValue = undefined] - Hint for the field
	 * @param {string} [args.maxValue = undefined] - Hint for the field
	 * @param {string} [args.defaultValue = undefined] - Hint for the field
	 * @param {Calendar} [args.valuesCalendar = GregorianCalendar] - The value calendar
	 * @param {Calendar} [args.showCalendar = GregorianCalendar|JalaliCalendar] - The show calendar
	 * @param {string} [args.className = undefined] - The root class of field_view
	 * @param {function[]} [args.validators = [] ] - The array of field validators
	 * @returns {Store} the created store
	 */
	static create(args) {
		if (args.valuesCalendar === undefined) {
			args.valuesCalendar = GregorianCalendar;
		}
		if (args.showCalendar === undefined) {
			args.showCalendar = Res.lang === 'fa' ? JalaliCalendar : GregorianCalendar;
		}
		if (args.minValue === undefined) {
			args.minValue = args.valuesCalendar.getStart();
		}
		if (args.maxValue === undefined) {
			args.maxValue = args.valuesCalendar.getEnd();
		}
		if (args.defaultValue === undefined) {
			args.defaultValue = args.valuesCalendar.getMiddle(args.minValue, args.maxValue);
		}
		return super.create({...args});
	}
}
