import Store, {STORE_TYPE} from "./Store";
import Res from "../../assets/Res";

export const SHOW_TIME_MILLIS = 9000;
export default class MessageQueue extends Store {
	static type = STORE_TYPE.SINGLETON;
	static nextId = 1;
	static storeName = 'MessageQueue';

	static getActions() {
		return ['hide', 'show', 'showObject'];
	}

	getInitialState() {
		return {
			queue: [],
		};
	}

	/**
	 * @param {string} text
	 * @param {string} color
	 */
	show(text, color) {
		if (color === undefined) {
			color = 'uncolored'
		}
		let message = {
			text,
			color,
			id: MessageQueue.nextId++
		};
		this.state.queue.push(message);
		this.save();
		setTimeout(() => this.hide(message.id), SHOW_TIME_MILLIS);
	}

	static show(text, color) {
		this.get().show(text, color);
	}


	/**
	 * @param {string} object.text_en
	 * @param {string} object.text_fa
	 * @param {string} object.color
	 */
	showObject(object) {
		if (object && object.text_en && object.text_fa) {
			this.show(Res.get_attribute(object, 'text'), object.color);
		}
	}

	static showObject(object) {
		this.get().showObject(object);
	}


	hide(message_id) {
		this.state.queue = this.state.queue.filter(message => message.id !== message_id);
		this.save();
	}

	static hide(message_id) {
		this.get().hide(message_id);
	}

}
