import App from "../../../../../stores/app/App";
import RemoteStore from "../../../../../stores/base/RemoteStore";
import {STORE_TYPE} from "../../../../../stores/base/Store";

export default class Incomes extends RemoteStore {
	static storeName = 'Incomes';
	static type = STORE_TYPE.SINGLETON;


	getUrl() {
		return `accounting/profiles/${App.getId()}/incomes/`;
	}

}
