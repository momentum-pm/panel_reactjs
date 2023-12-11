import RemoteStore from "../../../../stores/base/RemoteStore";
import {STORE_TYPE} from "../../../../stores/base/Store";

export default class ActionBoxes extends RemoteStore {
	static storeName = 'ActionBoxes';
	static type = STORE_TYPE.SINGLETON;

	getUrl() {
		return 'blog/action-boxes/';
	}
}
