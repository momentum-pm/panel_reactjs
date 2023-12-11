import Store, {STORE_TYPE} from "./Store";
import {getDatetimeDistanceObject} from "../../utils/DateUtils";


export default class EventCountDown extends Store {
	static storeName = 'EventCountDown';
	static type = STORE_TYPE.SINGLETON;

	getInitialState(args) {
		return {
			timer: {d: 0, s: 0, m: 0, h: 0},
			endDateTime: '2021-06-28 23:59:59+04:30'
		}
	}

	onCreate() {
		this.state.timer = getDatetimeDistanceObject(this.state.endDateTime);
		this.save();
		setInterval(() => this.resetTimer(), 1000);
	}

	resetTimer() {
		this.state.timer = getDatetimeDistanceObject(this.state.endDateTime);
		this.save();
	}
}
