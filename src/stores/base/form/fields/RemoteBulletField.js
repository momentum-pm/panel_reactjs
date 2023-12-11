import RemoteSelectField from "./RemoteSelectField";

export default class RemoteBulletField extends RemoteSelectField {
	static storeName = 'RemoteBulletField';

	/**
	 * @param {string} args.name - The name of the field
	 * @param {string} [args.label = undefined] - The label of the field
	 * @param {boolean} [args.required = true] - If the field is required, default is true
	 * @param {string} args.question - The label of the field
	 * @param {function} args.itemToTitle - Maps item to title
	 * @param {function} args.itemToValue - Maps item to value
	 * @param {RemoteStore} args.remoteStore - the remoteStore
	 * @param {string} [args.hint = undefined] - Hint for the field
	 * @param {string} [args.className = undefined] - The root class of field_view
	 * @param {function[]} [args.validators = [] ] - The array of field validators
	 * @returns {Store} the created store
	 */
	static create(args) {
		return super.create({...args, placeholder: args.question});
	}
}
