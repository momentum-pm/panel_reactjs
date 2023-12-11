import RemoteStore from "../../../../../stores/base/RemoteStore";
import Button from "../../../../../stores/base/form/buttons/Button";
import Res from "../../../../../assets/Res";
import Samples from "./Samples";


export default class Collection extends RemoteStore {
	static storeName = 'Collection';

	getInitialState(args) {
		return {
			...super.getInitialState(args),
		}
	}

	success(data, status) {
		let profileId = this.state.profileId;
		data.samples = data.samples.map(sample => {
				let sampleId = sample.id;
				return {
					...sample,
					deleteButton: Button.create_button({
						name: `edit-sample-${sampleId}`,
						icon: Res.icon.cross,
						onClick: () => Samples.get(profileId, {profileId}).delete(sampleId, this.state.collectionId),
						className: 'flat danger',
					})
				}
			}
		);
		super.success(data, status);
	}

	getUrl() {
		return `profiles/profiles/${this.state.profileId}/collections/${this.state.collectionId}/`;
	}

}
