import PaginatedRemoteStore from "./PaginatedRemoteStore";
import Button from "./form/buttons/Button";
import Res from "../../assets/Res";
import {CACHE_POLICY} from "./RemoteStore";

export default class ReloadablePaginatedRemoteStore extends PaginatedRemoteStore {
	static storeName = 'ReloadablePaginatedRemoteStore';

	getInitialState(args) {
		return {
			...super.getInitialState(args),
			reloadButton: Button.create_button({
				name: 'reload',
				title: Res.string.update,
				className: 'raised primary',
				icon: Res.icon.refresh,
				onClick: () => this.load(CACHE_POLICY.IGNORE),
			})
		}
	}
}
