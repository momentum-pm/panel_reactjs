import RemoteStore, {CACHE_POLICY, LOADING_STATE} from "../../../../../stores/base/RemoteStore";
import {STORE_TYPE} from "../../../../../stores/base/Store";
import Toolbar from "../../../../../stores/app/toolbar/Toolbar";
import Conversations from "./Conversations";
import App from "../../../../../stores/app/App";

export const RELOAD_TIME = 15000;
export default class MessageChecker extends RemoteStore {
	static storeName = 'MessageChecker';
	static type = STORE_TYPE.SINGLETON;


	onCreate() {

	}

	getUrl() {
		return `messenger/members/${App.getMemberId()}/check-messages/`;
	}

	success(data, status) {
		let lastNewMessages = this.state.data && this.state.data.new_messages;
		super.success(data, status);
		let newMessages = data.new_messages;
		Toolbar.get().setUnreadMessageCount(newMessages);
		if (newMessages !== lastNewMessages) {
			if (Conversations.get().state.loadingState === LOADING_STATE.LOADED) {
				Conversations.get().load(CACHE_POLICY.UPDATE);
			}
		}
		if (this.timeout) {
			clearTimeout(this.timeout);
		}
		this.timeout = setTimeout(() => this.load(CACHE_POLICY.UPDATE), RELOAD_TIME);
	}


}
