import RemoteStore from "../../../stores/base/RemoteStore";
import Settings from "../../../Settings";


export default class Short extends RemoteStore {
	static storeName = 'Short';

	getUrl() {
		return `shortener/shorts/${this.state.code}/`;
	}

	success(data, status) {
		let url;
		if (data.url.startsWith(Settings.CLIENT_URL)) {
			url = data.url.substring(Settings.CLIENT_URL.length);
		} else if (data.url.startsWith('http')) {
			url = data.url;
		} else if (data.url.startsWith('/')) {
			url = data.url;
		} else {
			url = '/' + data.url;

		}
		this.redirect(url, 302);
	}
}
