import Store, {STORE_TYPE} from "../../Store";
import Validators, {ValidationError} from "../../../../utils/Validators";

export const FIELD_TYPE = {
	NON_VALUE: 'NonValueField',
	STEP: 'Step',
	MESSAGE_STEP: 'MessageStep',
	SEARCH: 'SearchField',
	CHAR: 'CharField',
	TEXT: 'TextField',
	RICH_TEXT: 'RichTextField',
	SELECT: 'SelectField',
	REMOTE_SELECT: 'RemoteSelectField',
	BULLET: 'BulletField',
	REMOTE_BULLET: 'RemoteBulletField',
	MULTI_SELECT: 'MultiSelectField',
	REMOTE_MULTI_SELECT: 'RemoteMultiSelectField',
	HIDDEN: 'HiddenField',
	IMAGE: 'ImageField',
	FILE: 'FileField',
	PROFILE_PICTURE: 'ProfilePictureField',
	DATE_FIELD: 'DateField',
	FIXED_DAY_DATE_FIELD: 'FixedDayDateField',
	AUTO_COMPLETE: 'AutoCompleteField',
	BOOLEAN: 'BooleanField',
	SWITCH: 'SwitchField',
	TAG_SEARCHER: 'TagSearcherField',
	GROUPED_MULTI_SELECT: 'GroupedMultiSelectField',
	REMOTE_GROUPED_MULTI_SELECT: 'RemoteGroupedMultiSelectField',
	MULTI_FILE_FIELD: 'MultiFileField',
	SCORE: 'ScoreField',


	URL: 'URLField',
	ALBUM: 'album',
};
export default class Field extends Store {
	static type = STORE_TYPE.SEQUENCED;
	static storeName = 'Field';

	/**
	 * @param {string} args.name - The name of the field
	 * @param {string} [args.label = undefined] - The label of the field
	 * @param {string} [args.icon = undefined] - The icon of the field
	 * @param {boolean} [args.required = true] - If the field is required, default is true
	 * @param {string} [args.hint = undefined] - Hint for the field
	 * @param {string} [args.className = undefined] - The root class of field_view
	 * @param {function[]} [args.validators = [] ] - The array of field validators
	 * @param {boolean} [args.showLabelDetails = true] - show * or optional on fields label
	 * @returns {Store} the created store
	 */
	static create(args) {
		if (args.showLabelDetails === undefined) {
			args.showLabelDetails = true;
		}
		if (args.required === undefined) {
			args.required = true;
		}
		if (args.validators === undefined) {
			args.validators = [];
		}
		return super.create(args);
	}

	getInitialState(args) {
		let error;
		try {
			if (args.required) {
				Validators.required(args.value);
			}
			if (!Validators.isNull(args.value)) {
				args.validators.forEach(validator => {
					validator(args.value);
				});
			}
		} catch (e) {
			if (e instanceof ValidationError) {
				error = e.error;
			} else {
				error = e;
			}
		}
		return {
			...args,
			nonValueField: false,
			error, touched: false,
		};
	}

	static getActions() {
		return ['resetValue', 'setValue', 'touch', 'setProperty'];
	}

	onCreate() {
		this.resetValue(this.state.value);
	}

	resetValue(value) {
		this.state.value = value;
		this.state.touched = false;
		this.state.error = this.getError();
		this.save();
	}

	setValue(value) {
		this.state.value = value;
		this.state.touched = true;
		this.state.error = this.getError();
		this.save();
	}

	touch() {
		this.state.touched = true;
		this.state.error = this.getError();
		this.save();
	}

	getError() {
		try {
			if (this.state.required) {
				Validators.required(this.state.value);
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

	setProperty(property, value) {
		this.state[property] = value;
		this.state.error = this.getError();
		this.save();
	}

	setValidators(validators) {
		this.state.validators = validators;
		this.state.error = this.getError();
		this.save();
	}


	render(props) {
		throw Error(`You should override the render method of ${this.constructor.storeName}`);
	}

}
