import RemoteStore from "../../../base/RemoteStore";

export default class Cities extends RemoteStore {
	static storeName = 'Cities';
	getUrl() {
		return `address/provinces/${this.state.provinceId}/cities/`;
	}
}
