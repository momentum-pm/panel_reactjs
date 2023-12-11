import {STORE_TYPE} from "../../../../stores/base/Store";
import RemoteStore from "../../../../stores/base/RemoteStore";


export default class CompactCourses extends RemoteStore {
	static storeName = 'CompactCourses';
	static type = STORE_TYPE.SINGLETON;

	getUrl() {
		return `school/compact-courses/`;
	}
}
