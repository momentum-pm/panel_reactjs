import RemoteStore from "../../../../stores/base/RemoteStore";

export default class Profile extends RemoteStore {
	static storeName = 'Profile';

	getUrl() {
		return 'profiles/profiles/find/';
	}

	getParams() {
		return {
			'username': this.id
		}
	}

}
