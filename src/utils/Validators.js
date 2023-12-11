import Res from "../assets/Res";
import {isDigitalString, normalizeNumber, toStringNumber} from "./StringUtils";

export class ValidationError extends Error {
	constructor(error) {
		super();
		this.error = error;
	}

	toString() {
		return this.error;
	}
}

export default class Validators {
	static isNull(value) {
		if (Array.isArray(value)) {
			return false;
		}
		if (value === undefined || value === null || value.toString().length === 0) {
			return true;
		}

	}

	static username(value) {
		if ((!value.match("[a-zA-Z0-9\\-_]+$")) || (value.match("[a-zA-Z0-9\\-_]+$").index !== 0)) {
			throw new ValidationError(Res.string.dashboard.organization.invalid_username);
		}
	}

	static required(value) {
		if (value === undefined || value === null || value.toString().length === 0) {
			throw new ValidationError(Res.string.required_error);
		}
		if (Array.isArray(value) && value.length === 0) {
			throw new ValidationError(Res.string.required_error);
		}
	}


	static numeric(value) {
		if (!isDigitalString(value)) {
			throw new ValidationError(Res.string.numeric_error);
		}
	}


	static email(value) {
		let match = value.match("[A-Z0-9a-z._]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$");
		if (!match || match.index > 0) {
			throw new ValidationError(Res.string.email_error);
		}
	}

	static url(value) {
		if (value.length > 255) {
			throw new ValidationError(Res.string.max_length_error + " " + normalizeNumber(255) + " " + Res.string.characters);
		}
		if (!value.match("(https?:\\/\\/(?:www\\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\\.[^\\s]{2,}|www\\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\\.[^\\s]{2,}|https?:\\/\\/(?:www\\.|(?!www))[a-zA-Z0-9]+\\.[^\\s]{2,}|www\\.[a-zA-Z0-9]+\\.[^\\s]{2,})")) {
			throw new ValidationError(Res.string.url_error);
		}
	}

	static year(value) {
		if (!isDigitalString(value)) {
			throw new ValidationError(Res.string.numeric_error);
		}
		if (value.toString().length !== 4) {
			throw new ValidationError(Res.string.year_length_error);
		}
	}

	static grade(value) {
		if (!isDigitalString(value)) {
			throw new ValidationError(Res.string.numeric_error);
		}
		if (value < 0 || value > 20) {
			throw new ValidationError(Res.string.grade_range_error);
		}
	}

	static phone_number(value) {
		if (!isDigitalString(value)) {
			throw new ValidationError(Res.string.numeric_error);
		}

		if (value.length !== 11) {
			throw new ValidationError(Res.string.phone_number_length_error);
		}
	}


	static at_least(min, unit, hideCount) {
		if (hideCount) {
			return (value) => {
				if (value.length < min) {
					throw new ValidationError(`${Res.string.at_least} ${normalizeNumber(min)} ${unit}`);
				}
			};
		}
		return (value) => {
			if (value.length < min) {
				throw new ValidationError(`${Res.string.at_least} ${normalizeNumber(min)} ${unit} (${normalizeNumber(value.length)})`);
			}
		};
	}

	static at_least_desc() {
		return (value) => {
			if (value.length < 60) {
				throw new ValidationError(`${Res.string.not_enough_description}`);
			}
		};
	}

	static at_last(max, unit, hideCount) {
		if (hideCount) {
			return (value) => {
				if (value.length > max) {
					throw new ValidationError(`${Res.string.at_last} ${normalizeNumber(max)} ${unit}`);
				}
			};
		}
		return (value) => {
			if (value.length > max) {
				throw new ValidationError(`${Res.string.at_last} ${normalizeNumber(max)} ${unit} (${normalizeNumber(value.length)})`);
			}
		};
	}

	static at_least_num(min, unit) {
		return (value) => {
			if (value < min) {
				throw new ValidationError(`${Res.string.at_least} ${toStringNumber(min)} ${unit}`);
			}
		};
	}

	static greater_than(min, unit) {
		return (value) => {
			if (parseInt(value) <= parseInt(min)) {
				throw new ValidationError(`${Res.string.greater_than} ${toStringNumber(min)} ${unit}`);
			}
		};
	}

	static less_than(max, unit) {
		return (value) => {
			if (value >= max) {
				throw new ValidationError(`${Res.string.less_than} ${toStringNumber(max)} ${unit}`);
			}
		};
	}

	static at_last_num(max, unit) {
		return (value) => {
			if (value > max) {
				throw new ValidationError(`${Res.string.at_last} ${toStringNumber(max)} ${unit}`);
			}
		};
	}

	static file_max_size(bytes) {
		return (value) => {
			if (value.size > bytes) {
				if (bytes < 0x400) {
					throw new ValidationError(Res.string.file_max_size_error + bytes + 'Byte(s)');
				} else if (bytes < 0x100000) {
					throw new ValidationError(Res.string.file_max_size_error + bytes / 0x400 + 'KB(s)');
				} else if (bytes < 0x40000000) {
					throw new ValidationError(Res.string.file_max_size_error + bytes / 0x100000 + 'MB(s)');
				} else {
					throw new ValidationError(Res.string.file_max_size_error + bytes / 0x40000000 + 'GB(s)');
				}
			}
		}
	}

	static credit_card(value) {
		if (value.toString().length !== 16) {
			throw new ValidationError(Res.string.dashboard.accounting.credit_card_length_error);
		}
	}

	static sheba(value) {
		if (value.toString().length !== 24) {
			throw new ValidationError(Res.string.dashboard.accounting.sheba_length_error);
		}
	}

	static file_format(formats) {
		return (value) => {
			if (value) {
				let name = value.name;
				let validFormat = false;
				formats.forEach((format) => {
					if (name.toLowerCase().endsWith(format.toLowerCase())) {
						validFormat = true;
					}
				});
				if (!validFormat) {
					let error = Res.string.file_format_error;
					formats.forEach((format, index) => {
						error += format;
						if (index !== formats.length - 1) {
							error += Res.string.camma;
						}
					});
					throw new ValidationError(error);
				}
			}
		}
	}


}
