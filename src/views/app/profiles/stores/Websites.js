import {STORE_TYPE} from "../../../../stores/base/Store";
import AppRemoteStore from "../../../../stores/base/AppRemoteStore";

export default class Websites extends AppRemoteStore {
	static storeName = 'Websites';
	static type = STORE_TYPE.SINGLETON;

	getUrl() {
		return 'profiles/websites/';
	}
}
