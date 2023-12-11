import {STORE_TYPE} from "../../../../../stores/base/Store";
import AppRemoteStore from "../../../../../stores/base/AppRemoteStore";

export default class SupportCategories extends AppRemoteStore {
	static storeName = 'SupportCategories';
	static type = STORE_TYPE.SINGLETON;

	getUrl() {
		return 'support/categories/';
	}
}
