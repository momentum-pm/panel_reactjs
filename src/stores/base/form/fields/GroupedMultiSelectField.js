import {FIELD_TYPE} from "./Field";
import MultiSelectField from "./MultiSelectField";

export default class GroupedMultiSelectField extends MultiSelectField {
	static storeName = FIELD_TYPE.GROUPED_MULTI_SELECT;

	/**
	 * @param {string} args.name - The name of the field
	 * @param {string} [args.label = undefined] - The label of the field
	 * @param {string} args.placeholder - The label of the field
	 * @param {boolean} [args.required = true] - If the field is required, default is true
	 * @param {function} args.itemToTitle - Maps item to title
	 * @param {function} args.itemToValue - Maps item to value
	 * @param {function} args.groupToTitle - Maps group to title
	 * @param {function} args.groupToValue - Maps group to value
	 * @param {function} args.groupToItems - Maps group to items
	 * @param {Object[]} [args.groups = [] ] - The choices of the field
	 * @param {string} [args.hint = undefined] - Hint for the field
	 * @param {string} [args.className = undefined] - The root class of field_view
	 * @param {function[]} [args.validators = [] ] - The array of field validators
	 * @returns {Store} the created store
	 */
	static create(args) {
		if (args.groups === undefined) {
			args.groups = [];
		}
		args['items'] = [];
		args.groups.forEach(group => {
			args.groupToItems(group).forEach(item => args['items'].push(item));
		});
		return super.create({...args});
	}

	static getActions() {
		return [...super.getActions(), 'toggleItem', 'toggleGroup','isCheckedGroup'];
	}

	setGroups(groups) {
		this.state.groups = groups;
		this.state.items= [];
		this.state.groups.forEach(group => {
			this.state.groupToItems(group).forEach(item =>this.state.items.push(item));
		});
		this.state.error = this.getError();
		this.save();
	}

	toggleGroup(groupValue) {
		let group = this.getGroupByValue(groupValue);
		if (this.isCheckedGroup(group)) {
			this.uncheckAll(group);
		} else {
			this.checkAll(group);
		}
	}

	getGroupByValue(groupValue) {
		let toReturn = undefined;
		if (groupValue) {
			this.state.groups.forEach(group => {
				if (groupValue.toString() === this.state.groupToValue(group).toString()) {
					toReturn = group;
				}
			});
		}
		return toReturn;
	}

	isCheckedGroup(group) {
		let checkedAtLeastOne = false;
		let itemsOfGroup = this.state.groupToItems(group);
		itemsOfGroup.forEach(item => {
			if (this.isCheckedItem(item)) {
				checkedAtLeastOne = true;
			}
		});
		return checkedAtLeastOne;
	}


	checkAll(group) {
		let itemsOfGroup = this.state.groupToItems(group);
		let newValue = [...this.state.value];
		itemsOfGroup.forEach(item => {
			if (!this.isCheckedItem(item)) {
				newValue.push(this.state.itemToValue(item));
			}
		});
		this.setValue(newValue);
	}

	uncheckAll(group) {
		let itemsOfGroup = this.state.groupToItems(group);
		let newValue = [...this.state.value];
		itemsOfGroup.forEach(item => {
			let itemValue = this.state.itemToValue(item);
			newValue = newValue.filter(checkedValue => (checkedValue.toString() !== itemValue.toString()));
		});
		this.setValue(newValue);
	}

}
