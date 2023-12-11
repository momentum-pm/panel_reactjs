import {STORE_TYPE} from "../../../../stores/base/Store";
import AppRemoteStore from "../../../../stores/base/AppRemoteStore";

export default class Stages extends AppRemoteStore {
	static storeName = 'Stages';
	static type = STORE_TYPE.SINGLETON;

	getUrl() {

		return 'profiles/stages/';
	}
}
