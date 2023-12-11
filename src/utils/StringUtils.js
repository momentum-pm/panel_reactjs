import Res from "../assets/Res";

const englishNums = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const farsiNums = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
export const SALARIES = [1000000, 3000000, 5000000, 8000000, 12000000, 16000000, 20000000, 25000000, 30000000, 40000000];

function getNum(i, lang) {
	if (lang === "fa") {
		return farsiNums[i];
	} else {
		return englishNums[i];
	}
}


export function getSlug(title) {
	if (title) {
		let titleParts = title.split(' ');
		let newParts = [];
		for (let i = 0; i < titleParts.length; i++) {
			let part = titleParts[i];
			while (part.match(/[^a-zA-Z1-9۱-۹ا-ی]+/)) {
				part = part.replace(/[^a-zA-Z1-9۱-۹ا-ی]+/, '');
			}
			newParts.push(part);
		}
		titleParts = newParts;
		titleParts = titleParts.filter(part => {
			return ((part !== 'ی') && (part !== 'ای') && (part !== ''));
		});

		let slug = '';
		for (let i = 0; i < titleParts.length; i++) {
			slug += titleParts[i];
			if (i !== (titleParts.length - 1)) {
				slug += '-';
			}
		}
		return slug;
	} else {
		return '';
	}
}

export function toLangNumber(value, lang) {
	if (value !== undefined && value !== null) {
		value = value.toString();
		if (value.length > 0) {
			let sourceLang;
			if (lang === "en") {
				sourceLang = "fa";
			} else {
				sourceLang = "en";
			}
			let toReturn = "";
			for (let i = 0; i < value.length; i++) {
				let char = value.charAt(i);
				let toAppend;
				switch (char) {
					case getNum(0, sourceLang):
						toAppend = getNum(0, lang);
						break;
					case getNum(1, sourceLang):
						toAppend = getNum(1, lang);
						break;
					case getNum(2, sourceLang):
						toAppend = getNum(2, lang);
						break;
					case getNum(3, sourceLang):
						toAppend = getNum(3, lang);
						break;
					case getNum(4, sourceLang):
						toAppend = getNum(4, lang);
						break;
					case getNum(5, sourceLang):
						toAppend = getNum(5, lang);
						break;
					case getNum(6, sourceLang):
						toAppend = getNum(6, lang);
						break;
					case getNum(7, sourceLang):
						toAppend = getNum(7, lang);
						break;
					case getNum(8, sourceLang):
						toAppend = getNum(8, lang);
						break;
					case getNum(9, sourceLang):
						toAppend = getNum(9, lang);
						break;
					default:
						toAppend = char;
				}
				toReturn += toAppend;
			}
			return toReturn;
		} else {
			return "";
		}
	} else {
		return "";
	}
}

export function normalizeNumber(value, minLen) {
	let toReturn = toLangNumber(value, Res.lang);
	if (toReturn.length < minLen) {
		toReturn = toLangNumber('0', Res.lang) + toReturn;
	}
	return toReturn;
}

export function getCurrency(value) {
	if (value === 0) {
		return Res.string.free
	}
	return getCount(value, Res.string.tooman);
}

export function getCredit(value) {
	return getCount(value, Res.string.tooman);
}

export function getSheba(value) {
	if (!value) {
		value = "**************************";
	} else {
		value = 'IR' + value;
	}
	return [
		value.substring(0, 4),
		value.substring(4, 8),
		'****',
		'****',
		'****',
		'****',
		value.substring(22, 24),
	];
}

export function getCreditCard(value) {
	if (!value) {
		value = "****************";
	}
	return [
		value.substring(0, 4),
		'****',
		'****',
		value.substring(12, 16),
	];
}

export function getCount(value, unit) {
	return `${splitDigits(value)} ${unit}`;
}

export function getPercentage(value) {
	return `${Math.floor(value * 100)}%`;
}

export function getPercentageSimple(value) {
	return `${normalizeNumber(Math.floor(value * 100))}`;
}

export function toComplexNumber(value) {
	if ((value || (value === 0)) && isDigitalString(value)) {
		let intValue = parseInt(value);
		if (intValue < 0) {
			return `${Res.string.minus} ${toComplexNumber(-1 * intValue)}`;
		}
		if (intValue <= 999) {
			return normalizeNumber(value);
		}
		if (intValue <= 999999) {
			if (intValue % 1000 === 0) {
				return `${toComplexNumber(Math.floor(intValue / 1000))} ${Res.string[1000]}`;
			} else {
				let r = Math.floor((intValue % 1000) / 100);
				return `${toComplexNumber(Math.floor(intValue / 1000))}٫${normalizeNumber(r)} ${Res.string[1000]}`;
			}
		}
		if (intValue <= 999999999) {
			if (intValue % 1000000 === 0) {
				return `${toComplexNumber(Math.floor(intValue / 1000000))} ${Res.string[1000000]}`;
			} else {
				let r = Math.floor((intValue % 1000000) / 100000);
				return `${toComplexNumber(Math.floor(intValue / 1000000))}٫${normalizeNumber(r)} ${Res.string[1000000]}`;
			}
		}
		if (intValue <= 999999999999) {
			if (intValue % 1000000000 === 0) {
				return `${toComplexNumber(Math.floor(intValue / 1000000000))} ${Res.string[1000000000]}`;
			} else {
				let r = Math.floor((intValue % 1000000000) / 100000000);
				return `${toComplexNumber(Math.floor(intValue / 1000000000))}٫${normalizeNumber(r)} ${Res.string[1000000000]}`;
			}
		}
	}
	throw Error(value + " is not a number");
}

export function toStringNumber(value) {
	if ((value || (value === 0)) && isDigitalString(value)) {
		let intValue = parseInt(value);
		if (intValue < 0) {
			return Res.string.minus + ' ' + toStringNumber(-1 * intValue);
		}
		if (intValue <= 20) {
			return Res.string[intValue];
		}
		if (intValue <= 99) {
			if (intValue % 10 === 0) {
				return Res.string[intValue];
			} else {
				return Res.string[Math.floor(intValue / 10) * 10] + ` ${Res.string.and} ` + toStringNumber(intValue % 10);
			}
		}
		if (intValue <= 999) {
			if (intValue % 100 === 0) {
				return Res.string[intValue];
			} else {
				return Res.string[Math.floor(intValue / 100) * 100] + ` ${Res.string.and} ` + toStringNumber(intValue % 100);
			}
		}
		if (intValue <= 999999) {
			if (intValue % 1000 === 0) {
				return toStringNumber(Math.floor(intValue / 1000)) + ` ${Res.string[1000]}`;
			} else {
				return toStringNumber(Math.floor(intValue / 1000)) + ` ${Res.string[1000]} ${Res.string.and} ` + toStringNumber(intValue % 1000);
			}
		}
		if (intValue <= 999999999) {
			if (intValue % 1000000 === 0) {
				return toStringNumber(Math.floor(intValue / 1000000)) + ` ${Res.string[1000000]}`;
			} else {
				return toStringNumber(Math.floor(intValue / 1000000)) + ` ${Res.string[1000000]} ${Res.string.and} ` + toStringNumber(intValue % 1000000);
			}
		}
		if (intValue <= 999999999999) {
			if (intValue % 1000000000 === 0) {
				return toStringNumber(Math.floor(intValue / 1000000000)) + ` ${Res.string[1000000000]}`;
			} else {
				return toStringNumber(Math.floor(intValue / 1000000000)) + ` ${Res.string[1000000000]} ${Res.string.and} ` + toStringNumber(intValue % 1000000000);
			}
		}
	}
	throw Error(value + " is not a number");
}

export function splitDigits(value) {
	try {
		if (value && isDigitalString(value)) {
			let intValue = parseInt(value);
			let toReturn = "";
			if (intValue === 0) {
				return normalizeNumber("0");
			}
			let isMinus = intValue < 0;
			if (isMinus) {
				intValue = -1 * intValue;
			}
			while (intValue !== 0) {
				let toAppend = intValue % 1000;
				intValue = parseInt((intValue - toAppend) / 1000);
				toReturn = "" + toAppend + toReturn;
				if (intValue > 0) {
					if (toAppend < 100) {
						toReturn = "0" + toReturn;
					}
					if (toAppend < 10) {
						toReturn = "0" + toReturn;
					}
					toReturn = "," + toReturn;
				}
			}
			if (isMinus) {
				let lang = Res.lang;
				if (lang === "fa") {
					return normalizeNumber(toReturn + "-");
				} else {
					return normalizeNumber("-" + toReturn);

				}
			} else {
				return normalizeNumber(toReturn);
			}
		}
	} catch (e) {
		throw Error(value + " is not a number");
	}
	return normalizeNumber(value);
}

export function isDigitalString(value) {
	if (value === null || value === undefined) {
		return false;
	}
	let englishValue = toLangNumber(value, "en");
	for (let i = 0; i < englishValue.length; i++) {
		let char = englishValue.charAt(i);
		let isDigit = false;
		for (let j = 0; j < 10; j++) {
			if (char === englishNums[j]) {
				isDigit = true;
			}
		}
		if (!isDigit) {
			return false;
		}
	}
	return true;
}
