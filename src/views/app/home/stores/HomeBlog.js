import AppRemoteStore from "../../../../stores/base/AppRemoteStore";
import {STORE_TYPE} from "../../../../stores/base/Store";

export default class HomeBlog extends AppRemoteStore {
	static storeName = 'HomeBlog';
	static type = STORE_TYPE.SINGLETON;


	getUrl() {
		return 'blog/posts/home/'
	}
}
