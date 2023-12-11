import RemoteStore from "../../../../stores/base/RemoteStore";
import {STORE_TYPE} from "../../../../stores/base/Store";

export default class BackgroundColors extends RemoteStore {
	static storeName = 'BackgroundColors';
	static type = STORE_TYPE.SINGLETON;

	getUrl() {
		return 'blog/background-colors/';
	}
}
