import Storage, {Keys} from "../utils/Storage";
import Settings from "../Settings";
import String from "./string/String";
import Icon from "./icons/Icon";
import {GregorianCalendar, JalaliCalendar} from "../utils/CalendarUtils";

export default class Res {
	static string;
	static icon;
	static lang;


	static getCalendar(){
		return this.lang==='fa'?JalaliCalendar:GregorianCalendar;
	}
	static setResources(lang) {
		this.lang = lang;
		this.string = String(lang);
		this.icon = Icon(lang);
	}

	static getLabel() {
		if (Settings.SAND_BOX) {
			return "SAND_BOX"
		} else {
			return Storage.get(Keys.label, "NO_REF")
		}
	}

	static setLabel(referrer) {
		let currentLabel = Storage.get(Keys.label);
		if (referrer !== currentLabel) {
			Storage.put(Keys.label, referrer);
		}
	}

	static get_attribute(object, attribute) {
		return object[`${attribute}_${this.lang}`]
	}
}
