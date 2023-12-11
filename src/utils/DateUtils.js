import Res from "../assets/Res";
import {normalizeNumber, toLangNumber} from "./StringUtils";

export const gregorianMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
export const gregorianMonthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export function fromGregorianStart(year, month, day) {
	// days passed from 1300/1/1
	let toReturn = 0;
	toReturn += (day - 1);
	for (let i = 0; i < month - 1; i++) {
		toReturn += gregorianMonthDays[i];
		if (i === 1 && year % 4 === 0) {
			toReturn += 1;
		}
	}
	toReturn += 365 * (year - 1921);
	toReturn += Math.floor((year - 1921) / 4);
	return toReturn;
}

export function getValidYears(d1, d2) {
	if (Res.lang === 'fa') {
		d1 = gregorianToJalaliText(d1);
		d2 = gregorianToJalaliText(d2);
	}
	let y1 = parseInt(d1.split("-")[0]);
	let y2 = parseInt(d2.split("-")[0]);
	let toReturn = [];
	for (let i = y1; i <= y2; i++) {
		toReturn.push(i);
	}
	return toReturn;
}

// eslint-disable-next-line no-unused-vars
function getGregorian(days) {
	//get gregorian date that is "days" days after 1300/1/1
	days += 79;
	let year = 1921;
	let day = 1;
	let month = 1;
	year += Math.floor((days / 1461)) * 4;
	days = days % 1461;
	let yearDays;
	if (year % 4 === 0) {
		yearDays = 366;
	} else {
		yearDays = 365;
	}
	while (days >= yearDays) {
		year++;
		days -= yearDays;
		if (year % 4 === 0) {
			yearDays = 366;
		} else {
			yearDays = 365;
		}
	}
	for (let i = 0; i < gregorianMonthDays.length; i++) {
		let daysOfMonth = gregorianMonthDays[i];
		if (i === 1 && year % 4 === 0) {
			daysOfMonth++;
		}
		if (days >= daysOfMonth) {
			days -= daysOfMonth;
			month++;
		} else {
			break;
		}
	}
	day += days;
	let toReturn = year + "-";
	if (month < 10) {
		toReturn += "0";
	}
	toReturn += month + "-";
	if (day < 10) {
		toReturn += "0";
	}
	toReturn += day;
	return toReturn;
}


export const jalaliMonths = ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"];
export const jalaliMonthDays = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];
const jalaliLeaps = [1300, 1304, 1309, 1313, 1317, 1321, 1325, 1329, 1333, 1337, 1342, 1346, 1350, 1354, 1358, 1362, 1366, 1370, 1375, 1379, 1383, 1387, 1391, 1395, 1399, 1403, 1407, 1412, 1416, 1420, 1424, 1428, 1432, 1436, 1445, 1449, 1453, 1457, 1461, 1465, 1469, 1478, 1482, 1486, 1490, 1494, 1498];

export function isJalaliLeap(year) {
	let toReturn = false;
	jalaliLeaps.forEach(function (element) {
		if (element === year) {
			toReturn = true;
		}
	});
	return toReturn;
}

export function isGregorianLeap(year) {
	let intYear = parseInt(year);
	if (intYear % 4 === 0) {
		if (intYear % 100 === 0) {
			if (intYear % 400 === 0) {
				return true;
			} else {
				return false;
			}
		} else {
			return true;
		}
	} else {
		return false;
	}
}


export function fromJalaliStart(year, month, day) {
	// days passed from 1300/1/1
	let toReturn = 0;
	toReturn += (day - 1);
	for (let i = 0; i < month - 1; i++) {
		toReturn += jalaliMonthDays[i];
	}
	toReturn += 365 * (year - 1300);
	jalaliLeaps.forEach(function (element) {
		if (element < year) {
			toReturn++;
		}
	});
	return toReturn;
}

function getJalali(days) {
	//get jalali date that is "days" days after 1300/1/1
	days -= 79;
	let year = 1300;
	let month = 1;
	let day = 1;
	let yearDays = 366;
	while (days >= yearDays) {
		year++;
		days -= yearDays;
		if (isJalaliLeap(year)) {
			yearDays = 366;
		} else {
			yearDays = 365;
		}
	}
	for (let i = 0; i < jalaliMonthDays.length; i++) {
		let daysOfMonth = jalaliMonthDays[i];
		if (days >= daysOfMonth) {
			days -= daysOfMonth;
			month++;
		} else {
			break;
		}
	}
	day += days;
	let toReturn = year + "-";
	if (month < 10) {
		toReturn += "0";
	}
	toReturn += month + "-";
	if (day < 10) {
		toReturn += "0";
	}
	toReturn += day;
	return toReturn;

}


export function getMonths() {
	let lang = Res.lang;
	switch (lang) {
		case "en":
			return gregorianMonths;
		case "fa":
			return jalaliMonths;
		default:
			return undefined;
	}
}

export function getDate(date) {
	let lang = Res.lang;
	switch (lang) {
		case "en":
			return normalizeNumber(date);
		case "fa":
			return normalizeNumber(gregorianToJalaliText(date));
		default:
			return undefined;
	}
}

export function getWeekday(weekday) {
	switch (weekday) {
		case 0:
			return Res.string.monday;
		case 1:
			return Res.string.tuesday;
		case 2:
			return Res.string.wednesday;
		case 3:
			return Res.string.thursday;
		case 4:
			return Res.string.friday;
		case 5:
			return Res.string.saturday;
		case 6:
			return Res.string.sunday;
		default:
			break;
	}
}

export function getCompactFormalDate(date) {
	date = toLangNumber(date, 'en');
	let month = date.substring(5, 7);
	let day = date.substring(8, 10);
	if (day.startsWith("0")) {
		day = day.substring(1)
	}
	return normalizeNumber(month + '/' + day);
}

export function getFormalDate(date) {
	date = toLangNumber(date, 'en');
	let lang = Res.lang;
	let month = date.substring(5, 7);
	let day = date.substring(8, 10);
	let year = date.substring(0, 4);
	let monthString = getMonths()[month - 1];
	if (day.startsWith("0")) {
		day = day.substring(1)
	}
	switch (lang) {
		case "en":
			if (day.endsWith("1") || day.endsWith("2") || day.endsWith("3")) {
				if (day === "11" || day === "12" || day === "13") {
					day = day + 'th';
				} else {
					if (day.endsWith("1")) {
						day = day + 'st';
					} else if (day.endsWith("2")) {
						day = day + 'nd';
					} else if (day.endsWith("3")) {
						day = day + 'rd';
					}
				}
			} else {
				day = day + 'th';
			}
			return normalizeNumber(monthString + " " + day + ',' + year);
		case "fa":
			return normalizeNumber(day + " " + monthString + " " + year);
		default:
			throw Error('wrong lang');
	}

}

export function getYearAndMonth(date) {
	if (Res.lang === 'fa') {
		date = gregorianToJalaliText(date);
	}
	let parts = date.split('-');
	let year = parseInt(parts[0]);
	let monthInt = parseInt(parts[1]);
	let month = getMonths()[monthInt - 1];
	return normalizeNumber(`${month} ${year}`);
}


export function gregorianToJalaliText(date) {
	let gregorianParts = date.split("-");
	let days = fromGregorianStart(parseInt(gregorianParts[0]), parseInt(gregorianParts[1]), parseInt(gregorianParts[2]));
	return getJalali(days);
}

export function jalaliToGregorianText(date) {
	let jalaliParts = date.split("-");
	let days = fromJalaliStart(parseInt(jalaliParts[0]), parseInt(jalaliParts[1]), parseInt(jalaliParts[2]));
	return getGregorian(days);
}


export function secondsToFormalTime(_seconds) {
	let hours = Math.floor(_seconds / 3600);
	let minutes = Math.floor((_seconds % 3600) / 60);
	let seconds = Math.floor((_seconds % 60));
	if (hours !== undefined && hours > 0) {
		return normalizeNumber(`${hours} ${Res.string.hours_short}`);
	} else if (minutes !== undefined && minutes > 0) {
		return normalizeNumber(`${minutes} ${Res.string.minutes_short}`);
	} else if (seconds !== undefined) {
		return normalizeNumber(`${seconds} ${Res.string.seconds_short}`);
	}
}

export function secondsToJson(seconds) {
	return {
		d: Math.floor(seconds / 86400),
		h: Math.floor((seconds % 86400) / 3600),
		m: Math.floor((seconds % 3600) / 60),
		s: Math.floor((seconds % 60)),
	}
}


export function getDateDistance(d1, d2) {
	return (
		fromGregorianStart(d1.split('-')[0], d1.split('-')[1], d1.split('-')[2]) -
		fromGregorianStart(d2.split('-')[0], d2.split('-')[1], d2.split('-')[2])
	);

}

export function getDateDistanceObject(d1, d2) {
	let distanceInDays = getDateDistance(d1, d2);
	let years, months, days;
	years = Math.floor(distanceInDays / 365);
	distanceInDays -= years * 365;
	months = Math.floor(distanceInDays / 30);
	distanceInDays -= months * 30;
	days = distanceInDays;
	return {years, months, days};
}

export function getDateDistanceString(d1, d2) {
	let {years, months, days} = getDateDistanceObject(d1, d2);
	if (years > 0) {
		if (months > 0) {
			return `${normalizeNumber(years)} ${Res.string.years} ${Res.string.and} ${normalizeNumber(months)} ${Res.string.months}`;
		} else {
			return `${normalizeNumber(years)} ${Res.string.years}`;
		}
	}
	if (months > 0) {
		return `${normalizeNumber(months)} ${Res.string.months}`;
	} else {
		return `${normalizeNumber(days)} ${Res.string.days}`;
	}
}

export function getDurationDateString(duration) {
	duration = Math.floor(duration / 3600);
	// let {years, months, days} = getDateDistanceObject(d1, d2);
	// if (years > 0) {
	// 	if (months > 0) {
	// 		return `${normalizeNumber(years)} ${Res.string.years} ${Res.string.and} ${normalizeNumber(months)} ${Res.string.months}`;
	// 	} else {
	// 		return `${normalizeNumber(years)} ${Res.string.years}`;
	// 	}
	// }
	// if (months > 0) {
	// 	return `${normalizeNumber(months)} ${Res.string.months}`;
	// } else {
	// 	return `${normalizeNumber(days)} ${Res.string.days}`;
	// }
}

export function getDateDistanceStringYear(d1, d2) {
	let {years} = getDateDistanceObject(d1, d2);
	return `${normalizeNumber(years)} ${Res.string.years}`;
}


export function getDateFromDateTime(dateTime) {
	let date = dateTime.substring(0, 10);
	return getDate(date);
}

export function getTimeFromDateTime(dateTime) {
	let time = dateTime.substring(11, 16);
	return normalizeNumber(time);
}


export function getFormalDateTime(dateTime) {
	if (!dateTime) {
		return null;
	}
	let formalDate = getFormalDate(getDateFromDateTime(dateTime));
	let time = getTimeFromDateTime(dateTime);
	return `${formalDate} ${Res.string.at_time} ${time}`;
}


export function isPast(dateTime) {
	let now = new Date();
	let date = new Date(Date.parse(dateTime));
	return date < now;
}

export function getDatetimeDistanceObject(dateTime) {
	let now = new Date();
	let date = new Date(Date.parse(dateTime));
	let past = isPast(dateTime);
	let difference = Math.abs(now - date);
	let ms = difference % 1000;
	difference = Math.floor(difference / 1000);
	let s = difference % 60;
	difference = Math.floor(difference / 60);
	let m = difference % 60;
	difference = Math.floor(difference / 60);
	let h = difference % 24;
	difference = Math.floor(difference / 24);
	let d = difference;
	return {d, h, m, s, ms, past};
}

export function getDatetimeDistanceString(dateTime) {
	let {d, h, m, s, past} = getDatetimeDistanceObject(dateTime);
	let appending = past ? Res.string.ago : Res.string.later;
	if (d > 0) {
		return `${normalizeNumber(d)} ${Res.string.days} ${appending}`;
	}
	if (h > 0) {
		return `${normalizeNumber(h)} ${Res.string.hours} ${appending}`;
	}
	if (m > 0) {
		return `${normalizeNumber(m)} ${Res.string.minutes} ${appending}`;
	}
	if (s > 0) {
		return `${normalizeNumber(s)} ${Res.string.seconds} ${appending}`;
	}
	return Res.string.just_now;
}

export function durationToText(duration) {
	let {d, h, m, s} = {d: 0, m: 0, s: 0, h: 0};
	if (duration.indexOf(' ') >= 0) {
		d = parseInt(duration.substring(0, duration.indexOf(' ')));
		duration = duration.substring(duration.indexOf(' ') + 1);
	}
	h = parseInt(duration.substring(0, 2));
	m = parseInt(duration.substring(3, 5));
	s = parseInt(duration.substring(6, 8));
	h += d * 24;
	if (h > 0) {
		if (m > 0) {
			return `${normalizeNumber(h)} ${Res.string.hours} ${Res.string.and} ${normalizeNumber(m)} ${Res.string.minutes}`;
		} else {
			return `${normalizeNumber(h)} ${Res.string.hours}`;
		}
	}
	if (m > 0) {
		return `${normalizeNumber(m)} ${Res.string.minutes}`;
	} else {
		return `${normalizeNumber(s)} ${Res.string.seconds}`;
	}
}

export function getDurationObject(duration,removeDays) {
	duration = Math.floor(duration * 1000);

	let ms = duration % 1000;
	duration = Math.floor(duration / 1000);
	let s = duration % 60;

	duration = Math.floor(duration / 60);
	let m = duration % 60;
	duration = Math.floor(duration / 60);
	let h = duration;
	return {h, m, s, ms};
}

export function getDurationTextLong(duration) {
	let {h, m, s} = getDurationObject(duration);
	if (h > 0) {
		return `${normalizeNumber(h)}:${m < 10 ? normalizeNumber('0') : ''}${normalizeNumber(m)}:${s < 10 ? normalizeNumber('0') : ''}${normalizeNumber(s)}`;
	}
	if (m > 0) {
		return `${m < 10 ? normalizeNumber('0') : ''}${normalizeNumber(m)}:${s < 10 ? normalizeNumber('0') : ''}${normalizeNumber(s)}`;
	} else {
		return `${normalizeNumber(s)} ${Res.string.seconds}`;
	}
}

export function getDurationText(duration) {
	let {h, m, s} = getDurationObject(duration,true);
	if (h > 0) {
		if (m > 0) {
			return `${normalizeNumber(h)} ${Res.string.hours} ${Res.string.and} ${normalizeNumber(m)} ${Res.string.minutes}`;
		} else {
			return `${normalizeNumber(h)} ${Res.string.hours}`;
		}
	}
	if (m > 0) {
		return `${normalizeNumber(m)} ${Res.string.minutes}`;
	} else {
		return `${normalizeNumber(s)} ${Res.string.seconds}`;
	}
}
export function getDurationTextShort(duration) {
	let { h, m, s } = getDurationObject(duration, true);
	if (h > 0) {
	  return `${normalizeNumber(h)} h`;
	}
	if (m > 0) {
	  return `${normalizeNumber(m)} m`;
	}
	if (s > 0) {
	  return `${normalizeNumber(s)} s`;
	}
	return `${normalizeNumber(0)} s`;
  }


export function getDuration(duration) {
	let {h, m, s} = getDurationObject(duration);
	return `${normalizeNumber(h, 2)}:${normalizeNumber(m, 2)}:${normalizeNumber(s, 2)}`;
}
