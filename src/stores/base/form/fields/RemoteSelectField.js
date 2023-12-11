import {FIELD_TYPE} from "./Field";
import {CACHE_POLICY} from "../../RemoteStore";
import SelectField from "./SelectField";

export default class RemoteSelectField extends SelectField {
	static storeName = FIELD_TYPE.REMOTE_SELECT;

	/**
	 * @param {string} args.name - The name of the field
	 * @param {string} [args.label = undefined] - The label of the field
	 * @param {boolean} [args.required = true] - If the field is required, default is true
	 * @param {string} args.placeholder - The label of the field
	 * @param {function} args.itemToTitle - Maps item to title
	 * @param {function} args.itemToValue - Maps item to value
	 * @param {RemoteStore} args.remoteStore - the remoteStore
	 * @param {Object[]} [args.items = [] ] - The choices of the field
	 * @param {string} [args.hint = undefined] - Hint for the field
	 * @param {string} [args.className = undefined] - The root class of field_view
	 * @param {function[]} [args.validators = [] ] - The array of field validators
	 * @returns {Store} the created store
	 */
	static create(args) {
		return super.create({
			...args,
			loadingState: args.remoteStore && args.remoteStore.state.loadingState,
			items: (args.remoteStore && args.remoteStore.state.data) ? args.remoteStore.state.data : [],
		});
	}

	onCreate(args) {
		if (args.remoteStore) {
			this.subscribeId = args.remoteStore.subscribe(() => this.onRemoteStoreChange());
		}
		return super.getInitialState(args);
	}

	setRemoteStore(remoteStore) {
		if (this.state.remoteStore) {
			this.state.remoteStore.unsubscribe(this.subscribeId);
		}
		this.state.remoteStore = remoteStore;
		if (remoteStore) {
			this.subscribeId = remoteStore.subscribe(() => this.onRemoteStoreChange());
		}
		this.onRemoteStoreChange();
	}

	getRemoteStore(){
		return this.state.remoteStore;
	}
	static getActions() {
		return [...super.getActions(), 'reload', 'setRemoteStore'];
	}

	onRemoteStoreChange() {
		this.state.loadingState = this.state.remoteStore && this.state.remoteStore.state.loadingState;
		this.setItems((this.state.remoteStore && this.state.remoteStore.state.data) ? this.state.remoteStore.state.data : []);
	}

	reload() {
		this.state.remoteStore.load(CACHE_POLICY.REUSE);
	}


}
