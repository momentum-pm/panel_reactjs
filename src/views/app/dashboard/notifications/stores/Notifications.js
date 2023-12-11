import RemoteStore from "../../../../../stores/base/RemoteStore";
import Button from "../../../../../stores/base/form/buttons/Button";
import Res from "../../../../../assets/Res";
import {STORE_TYPE} from "../../../../../stores/base/Store";
import App from "../../../../../stores/app/App";

export default class Notifications extends RemoteStore {
	static storeName = 'Notifications';
	static type = STORE_TYPE.SINGLETON;

	getUrl() {
		return `notifications/profiles/${App.getId()}/notifications/`;
	}

	success(data, status) {
		data = data.map(notification => {
			return {
				...notification,
				actionButton: notification.action_link ? Button.create_link({
					name: 'action-button',
					link: notification.action_link,
					title: Res.get_attribute(notification, 'action_title'),
					icon: Res.icon.nextArrow,
					className: 'raised success',
				}) : null,
			}
		});
		super.success(data, status);
	}

}
