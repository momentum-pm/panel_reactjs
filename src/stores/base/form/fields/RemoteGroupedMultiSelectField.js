import {FIELD_TYPE} from "./Field";
import {CACHE_POLICY} from "../../RemoteStore";
import GroupedMultiSelectField from "./GroupedMultiSelectField";

export default class RemoteGroupedMultiSelectField extends GroupedMultiSelectField {
	static storeName = FIELD_TYPE.REMOTE_GROUPED_MULTI_SELECT;

	/**
	 * @param {string} args.name - The name of the field
	 * @param {string} [args.label = undefined] - The label of the field
	 * @param {boolean} [args.required = true] - If the field is required, default is true
	 * @param {string} args.placeholder - The label of the field
	 * @param {function} args.itemToTitle - Maps item to title
	 * @param {function} args.itemToValue - Maps item to value
	 * @param {function} args.groupToTitle - Maps group to title
	 * @param {function} args.groupToValue - Maps group to value
	 * @param {function} args.groupToItems - Maps group to items
	 * @param {RemoteStore} args.remoteStore - the remoteStore
	 * @param {Object[]} [args.groups = [] ] - The choices of the field
	 * @param {string} [args.hint = undefined] - Hint for the field
	 * @param {string} [args.className = undefined] - The root class of field_view
	 * @param {function[]} [args.validators = [] ] - The array of field validators
	 * @returns {Store} the created store
	 */
	static create(args) {
		return super.create({
			...args,
			loadingState: args.remoteStore.state.loadingState,
			groups: args.remoteStore.state.data ? args.remoteStore.state.data : [],
		});
	}


	onCreate(args) {
		args.remoteStore.subscribe(() => this.onRemoteStoreChange());
		return super.getInitialState(args);
	}

	static getActions() {
		return [...super.getActions(), 'reload'];
	}

	onRemoteStoreChange() {
		this.state.loadingState = this.state.remoteStore.state.loadingState;
		this.setGroups(this.state.remoteStore.state.data ? this.state.remoteStore.state.data : []);
	}

	reload() {
		this.state.remoteStore.load(CACHE_POLICY.REUSE);
	}


}
