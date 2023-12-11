import Field, {FIELD_TYPE} from "./Field";
import Validators from "../../../../utils/Validators";

export default class URLField extends Field {
	static storeName = FIELD_TYPE.URL;

	/**
	 * @param {string} args.name - The name of the field
	 * @param {string} args.placeholder - The placeholder of the field
	 * @param {string} [args.label = undefined] - The label of the field
	 * @param {boolean} [args.required = true] - If the field is required, default is true
	 * @param {string} [args.auto_complete = "on"] - If the field is required, default is true
	 * @param {string} [args.hint = undefined] - Hint for the field
	 * @param {string} [args.className = undefined] - The root class of field_view
	 * @param {function[]} [args.validators = [] ] - The array of field validators
	 * @returns {Store} the created store
	 */
	static create(args) {
		if (args.auto_complete === undefined) {
			args.auto_complete = "on";
		}
		if (args.validators === undefined) {
			args.validators = [];
		}
		args.validators.push(Validators.url);
		return super.create({...args});
	}

	resetValue(context) {
		this.state.visibleValue = context;
		super.resetValue(this.getActualValue());
	}

	setValue(visibleValue) {
		this.state.visibleValue = visibleValue;
		super.setValue(this.getActualValue());
	}

	getActualValue() {
		let actualValue = this.state.visibleValue;
		if (actualValue === "") {
			actualValue = null;
		}
		if (actualValue && !(actualValue.startsWith('http://') || actualValue.startsWith('https://'))) {
			actualValue = 'http://' + actualValue;
		}
		return actualValue;
	}

}
