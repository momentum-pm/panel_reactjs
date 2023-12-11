import RemoteStore from "../../../../../stores/base/RemoteStore";
import Button from "../../../../../stores/base/form/buttons/Button";
import Res from "../../../../../assets/Res";
import AccountLinkEditForm from "./AccountLinkEditForm";
import History from "../../../../../History";
import AccountLinkCreateForm from "./AccountLinkCreateForm";


export default class AccountLinks extends RemoteStore {
	static storeName = 'AccountLinks';

	getInitialState(args) {
		return {
			...super.getInitialState(args),
			createButton: Button.create_button({
					name: 'create-account',
					icon: Res.icon.add,
					className: 'flat primary icon ',
					onClick: () => {
						AccountLinkCreateForm.get(args.profileId,{profileId:args.profileId}).setContext({});
						History.pushSmallModal(`/profiles/profiles/${args.profileId}/account-links/create/`)
					}
				}
			)
		}
	}

	getUrl() {
		return `profiles/profiles/${this.state.profileId}/account-links/`;
	}

	success(data, status) {
		data = data.map(accountLink => {
				let accountLinkId = accountLink.id;
				let profileId = this.state.profileId;
				return {
					...accountLink,
					onClick: () => {
						AccountLinkEditForm.get(accountLinkId, {accountLinkId, profileId}).setContext(accountLink);
						History.pushSmallModal(`/profiles/profiles/${profileId}/account-links/${accountLink.id}/edit/`)
					},
				}
			}
		);
		super.success(data, status);
	}
}
