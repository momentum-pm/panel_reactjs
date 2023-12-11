import RemoteStore from "../../../../stores/base/RemoteStore";
import {STORE_TYPE} from "../../../../stores/base/Store";

export default class Spacings extends RemoteStore {
	static storeName = 'Spacings';
	static type = STORE_TYPE.SINGLETON;

	getUrl() {
		return 'blog/spacings/';
	}
}
