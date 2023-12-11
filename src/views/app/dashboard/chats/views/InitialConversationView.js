import RemoteStoreView from "../../../../base/RemoteStoreView";
import InitialConversation from "../stores/InitialConversation";
import {connect} from "../../../../../stores/base/StoreManager";
import React from "react";

class InitialConversationView extends RemoteStoreView {
	static getRemoteStore(props) {
		let username = props.match.params.username;
		return InitialConversation.map(username, {username});
	}

	getOkView() {
		return (
			<div></div>
		)
	}
}
export default connect(InitialConversationView);
