import RemoteStore from "../../../../stores/base/RemoteStore";
import {STORE_TYPE} from "../../../../stores/base/Store";

export default class Populations extends RemoteStore {
	static storeName = 'Populations';
	static type = STORE_TYPE.SINGLETON;

	getUrl() {

		return 'profiles/populations/';
	}
}
