import RemoteStore from "../../../../stores/base/RemoteStore";
import Button from "../../../../stores/base/form/buttons/Button";
import {get_lang_url} from "../../../../History";
import Res from "../../../../assets/Res";
import MetaTags from "../../../../stores/base/MetaTags";

export default class UserProfileVisit extends RemoteStore {
	static storeName = 'UserProfileVisit';

	getInitialState(args) {
		return {
			...super.getInitialState(args),
			chatButton: Button.create_external_link({
				link: get_lang_url(`/dashboard/messenger/chat/@${args.username}/`),
				title: Res.string.dashboard.chat,
				icon :Res.icon.chat,
				className: 'primary small background',
			})
		}
	}
	success(data, status) {
	
		MetaTags.get().setTitle(data.title);
		MetaTags.get().setImage(data.cover);
		MetaTags.get().setDescription(data.about);
		super.success(data, status);
	  }

	getUrl() {
		return `profiles/profiles/${this.state.profileId}/`;
	}
}
