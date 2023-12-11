import Field, {FIELD_TYPE} from "./Field";
import Res from "../../../../assets/Res";
import Validators, {ValidationError} from "../../../../utils/Validators";

export default class BooleanField extends Field {
	static storeName = FIELD_TYPE.BOOLEAN;

	/**
	 * @param {string} args.name - The name of the field
	 * @param {string} [args.label] - The label of the field
	 * @param {string} args.question - The label of the field
	 * @param {boolean} [args.required = true] - If the field is required, default is true
	 * @param {string} [args.hint = undefined] - Hint for the field
	 * @param {string} [args.className = undefined] - The root class of field_view
	 * @param {function[]} [args.validators = [] ] - The array of field validators
	 * @returns {Store} the created store
	 */
	static create(args) {
		return super.create({...args, showLabelDetails: false});
	}

	static getActions() {
		return [...super.getActions(), 'toggle'];
	}

	setValue(value) {
		if (!value) {
			value = false;
		}
		super.setValue(value);
	}

	static required(value) {
		if (value === undefined || value === null || value.toString().length === 0 || value === false) {
			throw new ValidationError(Res.string.required_error);
		}
		if (Array.isArray(value) && value.length === 0) {
			throw new ValidationError(Res.string.required_error);
		}
	}

	getError() {
		try {
			if (this.state.required) {
				BooleanField.required(this.state.value);
			}
			if (!Validators.isNull(this.state.value)) {
				this.state.validators.forEach(validator => {
					validator(this.state.value);
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

	resetValue(value) {
		if (!value) {
			value = false;
		}
		super.resetValue(value);
	}


	toggle() {
		this.setValue(!this.state.value);
	}
}
