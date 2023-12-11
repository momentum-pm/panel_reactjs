import Store, {STORE_TYPE} from "../../Store";
import Res from "../../../../assets/Res";
import History from "../../../../History";

export const BUTTON_TYPE = {
	LINK: 'link',
	EXTERNAL_LINK: 'external_link',
	SUBMIT: 'submit',
	FAKE: 'fake',
	BUTTON: 'button',
};
export default class Button extends Store {
	static type = STORE_TYPE.SEQUENCED;
	static storeName = 'Button';

	/**
	 * @param {string} args.type
	 * @param {string} args.name
	 * @param {string} [args.title = undefined]
	 * @param {*} [args.icon = undefined]
	 * @param {string} [args.link = undefined]
	 * @param {function} [args.onClick = undefined]
	 * @param {string} [args.className = undefined]
	 */
	static create(args) {
		if (args.className === undefined) {
			args.className = "";
		}
		return super.create(args);
	}

	/**
	 * @param {string} [args.title = undefined]
	 * @param {function} args.onClick
	 * @param {*} [args.icon = undefined]
	 * @param {string} [args.className = undefined]
	 */
	static createSubmit(args) {
		return this.create({...args, type: BUTTON_TYPE.SUBMIT, name: 'submit'});
	}

	static create_back(className = undefined) {
		if (className === undefined) {
			className = 'flat'
		}
		return this.create({
			type: BUTTON_TYPE.BUTTON,
			name: 'back',
			title: Res.string.back,
			onClick: History.goBack,
			className,
		});
	}

	static create_close(className = undefined) {
		if (className === undefined) {
			className = 'flat'
		}
		return this.create({
			type: BUTTON_TYPE.BUTTON,
			name: 'close',
			title: Res.string.close,
			onClick: History.goBack,
			className,
		});
	}

	/**
	 * @param {string} args.name
	 * @param {string} [args.title = undefined]
	 * @param {function} args.onClick
	 * @param {*} [args.icon = undefined]
	 * @param {string} [args.className = undefined]
	 */
	static create_button(args) {
		return this.create({...args, type: BUTTON_TYPE.BUTTON});
	}

	/**
	 * @param {string} args.name
	 * @param {string} [args.title = undefined]
	 * @param {string} args.link
	 * @param {*} [args.icon = undefined]
	 * @param {string} [args.className = undefined]
	 */
	static create_link(args) {
		return this.create({...args, type: BUTTON_TYPE.LINK});
	}


	/**
	 * @param {string} args.name
	 * @param {string} [args.title = undefined]
	 * @param {string} args.link
	 * @param {*} [args.icon = undefined]
	 * @param {string} [args.className = undefined]
	 */
	static create_small_modal_link(args) {
		return this.create({...args, type: BUTTON_TYPE.BUTTON, onClick: () => History.pushSmallModal(args.link)});
	}

	/**
	 * @param {string} args.name
	 * @param {string} [args.title = undefined]
	 * @param {string} args.link
	 * @param {*} [args.icon = undefined]
	 * @param {string} [args.className = undefined]
	 */
	static create_medium_modal_link(args) {
		return this.create({...args, type: BUTTON_TYPE.BUTTON, onClick: () => History.pushMediumModal(args.link)});
	}

	/**
	 * @param {string} args.name
	 * @param {string} [args.title = undefined]
	 * @param {string} args.link
	 * @param {*} [args.icon = undefined]
	 * @param {string} [args.className = undefined]
	 */
	static create_large_modal_link(args) {
		return this.create({...args, type: BUTTON_TYPE.BUTTON, onClick: () => History.pushLargeModal(args.link)});
	}

	/**
	 * @param {string} args.name
	 * @param {string} [args.title = undefined]
	 * @param {string} args.link
	 * @param {*} [args.icon = undefined]
	 * @param {string} [args.className = undefined]
	 */
	static create_external_link(args) {
		return this.create({...args, type: BUTTON_TYPE.EXTERNAL_LINK});
	}

	getInitialState(args) {
		let active;
		if (args.active === undefined) {
			active = true;
		} else {
			active = args.active;
		}
		return {
			...args,
			loading: false,
			active,
			badge: 0,
		};
	}

	static getActions() {
		return ['set_loading', 'set_active', 'set_title', 'set_link', 'setOnClick', 'setClassName']
	}

	set_loading(loading) {
		this.state.loading = loading;
		this.save();
	}

	set_active(active) {
		this.state.active = active;
		this.save();
	}

	setOnClick(onClick) {
		this.state.onClick = onClick;
		this.save();
	}

	set_title(title) {
		this.state.title = title;
		this.save();
	}
	setTitle(title) {
		this.state.title = title;
		this.save();
	}

	setIcon(icon) {
		this.state.icon = icon;
		this.save();
	}

	set_link(link) {
		this.state.link = link;
		this.save();
	}

	setBadge(badge) {
		this.state.badge = badge;
		this.save();
	}

	setClassName(className) {
		this.state.className = className;
		this.save();
	}
}
