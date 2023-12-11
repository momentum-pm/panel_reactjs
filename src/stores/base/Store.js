import StoreManager from "./StoreManager";


export const STORE_TYPE = {
	INSTANTIATABLE: 'instantiatable',
	SINGLETON: 'singleton',
	SEQUENCED: 'sequenced',
};

export default class Store {
	static stores = {};
	static nextId = 1;
	static type = STORE_TYPE.INSTANTIATABLE;
	static storeName = '';

	static get(id, args) {
		let name = this.storeName;
		switch (this.type) {
			case STORE_TYPE.SINGLETON:
				if (id !== undefined) {
					throw Error(`didn't expect id for singleton store ${name} but got ${id}`);
				}
				id = 0;
				break;
			case STORE_TYPE.SEQUENCED:
				if (!this.exists(id)) {
					throw Error(`you should call create on sequenced store ${name} before require it`);
				}
				break;
			case STORE_TYPE.INSTANTIATABLE:
				if ((id === undefined) || (id === null)) {
					throw Error(`id is required for instantiatable store ${name} but got ${id}`);
				}
				break;
			default:
				break;
		}
		id = id.toString();
		if (!this.exists(id)) {
			this.createStore(name, id, args);
		}
		return Store.stores[name][id];
	}

	static map(id, args) {
		return this.get(id, args).map();
	}

	static touch(id, args) {
		if (!this.exists(id)) {
			this.get(id, args);
		}
	}

	static getActions() {
		return [];
	}

	/**
	 * @param {object} [args] - arguments of the create function
	 * @returns {Store} the created store
	 */
	static create(args) {
		if (this.type === STORE_TYPE.SEQUENCED) {
			return this.createStore(this.storeName, this.nextId++, args);
		} else {
			throw Error(`create method is only allowed for sequenced stores, but ${this.storeName} is ${this.type}`);
		}
	}

	static createStore(name, id, args) {
		if (this.exists(id)) {
			throw Error(`A ${name} store with id=${id} already exists`);
		}
		if (!Store.stores[name]) {
			Store.stores[name] = {};
		}
		Store.stores[name][id] = new this(id, args);
		return Store.stores[name][id];

	}

	static exists(id) {
		if (this.type === STORE_TYPE.SINGLETON) {
			id = 0;
		}
		return Store.stores[this.storeName] && Store.stores[this.storeName][id];
	}


	getInitialState(args) {
		return {};
	}


	constructor(id, args) {
		this.name = this.constructor.storeName;
		this.id = id;
		this.nextSubscriberId = 1;
		this.subscribers = [];
		this.state = this.getInitialState(args);
		this.lastReturned = {
			name: this.name,
			id: this.id,
		};
		this.constructor.getActions().forEach(actionName => {
			let action = this[actionName];
			action = action.bind(this);
			this.lastReturned[actionName] = action;
		});
		this.onCreate(args);
		this.save();
	}

	onCreate() {

	}

	save() {
		StoreManager.save(this.name, this.id, this.state);
		this.subscribers.forEach((subscriber) => {
			subscriber.callback(this);
		});
	}


	map() {
		let state = StoreManager.getState(this.name, this.id, this.state);
		let toReturn;
		if (state !== this.lastReturned.state) {
			toReturn = {
				...this.lastReturned,
				state,
			}
		} else {
			toReturn = this.lastReturned;
		}
		this.lastReturned = toReturn;
		return toReturn;
	}


	subscribe(callback) {
		let id = this.nextSubscriberId++;
		this.subscribers.push({callback, id});
		return id;
	}

	unsubscribe(id) {
		this.subscribers = this.subscribers.filter(subscriber => (subscriber.id !== id));
	}

}
