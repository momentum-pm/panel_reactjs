import Field, {FIELD_TYPE} from "./Field";
import Validators, {ValidationError} from "../../../../utils/Validators";

export default class RichTextField extends Field {
	static storeName = FIELD_TYPE.RICH_TEXT;

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

	getInitialState(args) {
		return {
			...super.getInitialState(args),
			previousText: undefined,
		}
	}

	setValue(value, silently, text) {
		this.state.text = text;
		if (silently) {
			this.resetValue(value, text);
		} else {
			super.setValue(value);
		}
	}

	resetValue(value, text) {
		this.state.text = text;
		this.state.value = value;
		this.state.touched = false;
		this.state.error = this.getError();
		this.save();
	}

	getError() {
		try {
			if (this.state.required) {
				Validators.required(this.state.text);
			}
			if (!Validators.isNull(this.state.text)) {
				this.state.validators.forEach(validator => {
					validator(this.state.text);
				});
			}
		} catch (e) {
			if (e instanceof ValidationError) {
				return e.error;
			} else {
				throw e;
			}
		}
	}
}
