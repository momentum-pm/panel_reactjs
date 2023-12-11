import RemoteStore from "../../../../../stores/base/RemoteStore";
import Button from "../../../../../stores/base/form/buttons/Button";
import Res from "../../../../../assets/Res";
import History from "../../../../../History";


export default class Collections extends RemoteStore {
	static storeName = 'Collections';

	getInitialState(args) {
		return {
			...super.getInitialState(args),
			newCollectionButton: Button.create_button({
				name: 'newCollectionButton',
				title: Res.string.profiles.samples.new_collection_button,
				icon: Res.icon.add,
				className: 'bordered success square',
				onClick: () => History.pushMediumModal(`/profiles/profiles/${args.profileId}/collections/create/`)
			})
		}
	}

	getUrl() {
		return `profiles/profiles/${this.state.profileId}/collections/`;
	}

}
