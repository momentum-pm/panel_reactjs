import PageListRemoteStoreView from "../../../../base/PageListRemoteStoreView";
import {connect} from "../../../../../stores/base/StoreManager";
import Notifications from "../stores/Notifications";
import NotificationView from "./NotificationView";
import React from "react";

class NotificationsPage extends PageListRemoteStoreView {

	static getRemoteStore(props) {
		return Notifications.map();
	}

	mapItemToView(item, index) {
		return <NotificationView notification={item} key={item.id}/>
	}
}

export default connect(NotificationsPage);
