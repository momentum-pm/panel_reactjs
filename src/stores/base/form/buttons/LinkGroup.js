import Store, {STORE_TYPE} from "../../Store";
import History, {get_lang_free_url} from "../../../../History";


export default class LinkGroup extends Store {
	static type = STORE_TYPE.SEQUENCED;
	static storeName = 'LinkGroup';

	/**
	 * @param {*[]} [args.items=[]]
	 * @param {string} [args.className]
	 *
	 */
	static create(args) {
		if (args.items === undefined) {
			args.items = [];
		}
		return super.create(args);
	}

	static getActions() {
		return ['setClassName', 'setItems', 'detectActive', 'locationChanged']
	}


	getInitialState(args) {
		return {
			...args,
			lastLocation: null,
		};
	}

	locationChanged() {
		let path = History.location.pathname + History.location.search;
		path = get_lang_free_url(path);
		if (!path.endsWith('/')) {
			path += '/';
		}
		if (this.state.lastLocation !== path) {
			this.state.lastLocation = path;
			this.detectActive();
		}
	}

	detectActive() {
		let path = History.location.pathname;
		path = get_lang_free_url(path);
		if (History.location.search) {
			path = path + History.location.search;
			path = get_lang_free_url(path);
			if (!path.endsWith('/')) {
				path += '/';
			}
		} else {
			path = path + '?page=1/';
		}

		this.state.items = this.state.items.map(item => {
				let checkUrl = item.url;
				if (checkUrl) {
					checkUrl = get_lang_free_url(checkUrl);
					if (!checkUrl.endsWith('/')) {
						checkUrl += '/';
					}
				}
				return {
					...item,
					active: path === checkUrl,
				}
			}
		);
		if(this.state.items.length && !this.state.items.some(item=>item.active)){
			this.state.items[0].active = true;
		}
		this.save();
	}

	setItems(items) {
		this.state.items = items;
		this.detectActive();
	}


	setClassName(className) {
		this.state.className = className;
		this.save();
	}
}
