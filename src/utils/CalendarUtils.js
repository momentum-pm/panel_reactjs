import {isDigitalString, normalizeNumber} from "./StringUtils";

class Calendar {
	static start = null;
	static end = null;
	static startWeekday = 0;
	static monthNames = null;
	static defaultMonthDays = null;
	static leapMonthDays = null;
	static weekdays = null;
	static weekdaysShort = null;


	static getStart() {
		return this.start;
	}

	static getEnd() {
		return this.end;
	}

	/**
	 * @param {number} year
	 * @return {boolean}
	 */
	static isLeap(year) {
		throw Error("This method is abstract");
	}

	/**
	 * @return {string}
	 */
	static getToday() {
		throw Error("This method is abstract");
	}

	/**
	 * @param {number} year
	 * @return {number}
	 */
	static getDaysOfYear(year) {
		if (this.isLeap(year)) {
			return 366;
		} else {
			return 365;
		}
	}

	static getMiddle(date1, date2) {
		date1 = this.formatDate(date1);
		date2 = this.formatDate(date2);
		if (date1 > date2) {
			let temp = date1;
			date1 = date2;
			date2 = temp;
		}
		let distance = this.getDistance(date2, date1);
		return this.addTo(date1, Math.floor(distance / 2));
	}

	/**
	 * @param year
	 * @param month
	 * @return {int}
	 */
	static getDaysOfMonth(year, month) {
		if (this.isLeap(year)) {
			return this.leapMonthDays[month - 1];
		} else {
			return this.defaultMonthDays[month - 1];
		}
	}

	/**
	 * @param {string|null} date
	 * @return {string|null}
	 */
	static formatDate(date) {
		if (!date) {
			return null;
		} else {
			while (date.indexOf("/") !== -1) {
				date = date.replace("/", "-");
			}
			let parts = date.split("-");
			if (parts.length !== 3) {
				return null;
			}
			let year, month, day;
			try {
				year = parseInt(parts[0]).toString();
				month = parseInt(parts[1]).toString();
				day = parseInt(parts[2]).toString();
				while (year.length < 4) {
					year = "0" + year;
				}
				while (month.length < 2) {
					month = "0" + month;
				}
				while (day.length < 2) {
					day = "0" + day;
				}
				return `${year}-${month}-${day}`;
			} catch (e) {
				return null;
			}
		}
	}

	/**
	 * @param {string|null} date
	 * @return {{month: number, year: number, day: number}|null}
	 */
	static split(date) {
		date = this.formatDate(date);
		if (date) {
			if (date.length > 10) {
				date = date.substring(0, 10);
			}
			let year = date.substring(0, 4);
			let month = date.substring(5, 7);
			let day = date.substring(8, 10);
			if (isDigitalString(year) && isDigitalString(month) && isDigitalString(day)) {
				year = parseInt(year);
				month = parseInt(month);
				day = parseInt(day);
				return {year, month, day};
			}
		} else {
			return null;
		}
	}

	static fromStartOfYear(date) {
		if (date) {
			let {year, month, day} = this.split(date);
			let toReturn = day - 1;
			for (let m = 1; m < month; m++) {
				toReturn += this.getDaysOfMonth(year, m);
			}
			return toReturn;
		} else {
			return 0;
		}

	}

	/**
	 * @param {string|null} date1
	 * @param {string|null} date2
	 * @return {number}
	 */
	static getDistance(date1, date2) {
		if (date1 && date2) {
			date1 = this.formatDate(date1);
			date2 = this.formatDate(date2);
			let isNegative = false;
			if (date1 < date2) {
				let temp = date1;
				date1 = date2;
				date2 = temp;
				isNegative = true;
			}
			let {year: y1} = this.split(date1);
			let {year: y2} = this.split(date2);
			let days1 = this.fromStartOfYear(date1);
			let days2 = this.fromStartOfYear(date2);
			let toReturn = days1 - days2;
			for (let i = y2; i < y1; i++) {
				let daysOfYear = this.getDaysOfYear(i);
				toReturn += daysOfYear;
			}
			if (isNegative) {
				return -toReturn;
			} else {
				return toReturn;
			}
		} else {
			return 0;
		}

	}

	static addTo(date, days) {
		if (date) {
			let daysFromYearStart = this.fromStartOfYear(date);
			days += daysFromYearStart;
			let {year} = this.split(date);
			let month = 1, day = 1;
			let yearDays = this.getDaysOfYear(year);
			while (days >= yearDays) {
				days -= yearDays;
				year += 1;
				yearDays = this.getDaysOfYear(year);
			}
			for (let m = 1; m < 12; m++) {
				let daysOfMonth = this.getDaysOfMonth(year, m);
				if (days >= daysOfMonth) {
					days -= daysOfMonth;
					month++;
				} else {
					break;
				}
			}
			day += days;
			return this.formatDate(`${year}-${month}-${day}`);
		}
	}

	static addToStart(days) {
		return this.addTo(this.start, days);
	}

	static fromStart(date) {
		return this.getDistance(date, this.start);
	}

	static getWeekday(date) {
		let daysFromStart = this.fromStart(date);
		daysFromStart += this.startWeekday;
		return daysFromStart % 7;
	}

	static fromToday(date) {
		return this.getDistance(date, this.today);
	}

	static toCalendar(date, destinationCalendar) {
		if (destinationCalendar === this) {
			return this.formatDate(date);
		}
		let fromStart = this.fromStart(date);
		return destinationCalendar.addToStart(fromStart);
	}

	static getYearMonthString(date) {
		if (date) {
			let {year, month} = this.split(date);
			return `${this.monthNames[month - 1]} ${normalizeNumber(year)}`
		}
	}

	static getFormalString(date) {
		if (date) {
			let {day, year, month} = this.split(date);
			return `${normalizeNumber(day)} ${this.monthNames[month - 1]} ${normalizeNumber(year)}`
		}
	}
}

export class GregorianCalendar
	extends Calendar {
	static start = "1921-03-21";
	static end = "2121-03-21";
	static startWeekday = 0;
	static monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	static defaultMonthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	static leapMonthDays = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	static weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
	static weekdaysShort = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

	static isLeap(year) {
		return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
	}

	static getToday() {
		return this.formatDate(new Date().toISOString().substring(0, 10));
	}
}


export class JalaliCalendar extends Calendar {
	static start = "1300-01-01";
	static end = "1500-01-01";
	static startWeekday = 2;
	static monthNames = ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"];
	static defaultMonthDays = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];
	static leapMonthDays = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 30];
	static weekdays = ['شنبه', 'یک‌شنبه', 'دو‌شنبه', 'سه‌شنبه', 'چهار‌شنبه', 'پنج‌شنبه', 'جمعه'];
	static weekdaysShort = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];

	static isLeap(year) {
		return [
			1300, 1304, 1309, 1313, 1317, 1321, 1325, 1329, 1333, 1337,
			1342, 1346, 1350, 1354, 1358, 1362, 1366, 1370, 1375, 1379,
			1383, 1387, 1391, 1395, 1399, 1403, 1407, 1412, 1416, 1420,
			1424, 1428, 1432, 1436, 1445, 1449, 1453, 1457, 1461, 1465,
			1469, 1478, 1482, 1486, 1490, 1494, 1498
		].some(element => element === year);
	}

	static getToday() {
		return GregorianCalendar.toCalendar(GregorianCalendar.getToday(), this);
	}

}
