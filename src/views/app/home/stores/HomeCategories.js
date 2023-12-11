import AppRemoteStore from "../../../../stores/base/AppRemoteStore";
import {STORE_TYPE} from "../../../../stores/base/Store";

export default class HomeCategories extends AppRemoteStore {
	static storeName = 'HomeCategories';
	static type = STORE_TYPE.SINGLETON;


	getUrl() {
		return 'blog/posts/home/'
	}
}
