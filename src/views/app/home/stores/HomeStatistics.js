import {STORE_TYPE} from "../../../../stores/base/Store";
import AppRemoteStore from "../../../../stores/base/AppRemoteStore";

export default class HomeStatistics extends AppRemoteStore {
	static storeName = 'HomeStatistics';
	static type = STORE_TYPE.SINGLETON;


	getUrl() {
		return 'home/statistics/'
	}
}
