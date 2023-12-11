import RemoteStore from "../../../../../stores/base/RemoteStore";
import {STORE_TYPE} from "../../../../../stores/base/Store";

export default class SupportStates extends RemoteStore {
	static storeName = 'SupportStates';
	static type = STORE_TYPE.SINGLETON;

	getUrl() {
		return 'support/states/';
	}

	success(data, status) {
		data = [...data, {id: -1, title_en: 'No Tickets', title_fa: 'بدون تیکت'}];
		super.success(data, status);
	}
}
