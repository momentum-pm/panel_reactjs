import PaginatedRemoteStore from "../../../../stores/base/PaginatedRemoteStore";
import {STORE_TYPE} from "../../../../stores/base/Store";


export default class Posts extends PaginatedRemoteStore {
	static storeName = 'Posts';
	static type = STORE_TYPE.SINGLETON;

	getAllowedParams() {
		return ['category__in'];
	}

	getUrl() {
		return `blog/posts/`;
	}
}
