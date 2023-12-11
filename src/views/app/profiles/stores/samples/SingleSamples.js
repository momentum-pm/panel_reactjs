import RemoteStore from "../../../../../stores/base/RemoteStore";
import Button from "../../../../../stores/base/form/buttons/Button";
import Res from "../../../../../assets/Res";
import History from "../../../../../History";
import Samples from "./Samples";


export default class SingleSamples extends RemoteStore {
	static storeName = 'SingleSamples';

	getInitialState(args) {
		return {
			...super.getInitialState(args),
			newSampleButton: Button.create_button({
				name: 'newSampleButton',
				title: Res.string.profiles.samples.new_sample_button,
				icon: Res.icon.add,
				className: 'bordered primary',
				onClick: () => History.pushMediumModal(`/profiles/profiles/${args.profileId}/samples/create/`)
			}),
		}
	}

	getUrl() {
		return `profiles/profiles/${this.state.profileId}/samples/singles/`;
	}

	success(data, status) {
		let profileId = this.state.profileId;
		data = data.map(sample => {
				let sampleId = sample.id;
				return {
					...sample,
					deleteButton: Button.create_button({
						name: `edit-sample-${sampleId}`,
						icon: Res.icon.cross,
						onClick: () => Samples.get(profileId, {profileId}).delete(sampleId),
						className: 'flat danger',
					})
				}
			}
		);
		super.success(data, status);
	}

}
