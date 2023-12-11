import {STORE_TYPE} from "../../../base/Store";
import RemoteStore from "../../../base/RemoteStore";

export default class Provinces extends RemoteStore {
	static storeName = 'Provinces';
	static type = STORE_TYPE.SINGLETON;

	getUrl() {
		return 'address/provinces/';
	}
}
