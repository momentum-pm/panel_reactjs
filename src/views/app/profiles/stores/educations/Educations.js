import RemoteStore from "../../../../../stores/base/RemoteStore";
import Button from "../../../../../stores/base/form/buttons/Button";
import Res from "../../../../../assets/Res";
import EducationEditForm from "./EducationEditForm";
import History from "../../../../../History";


export default class Educations extends RemoteStore {
	static storeName = 'Educations';

	getInitialState(args) {
		return {
			...super.getInitialState(args),
			createButton: Button.create_button({
				name: 'create-education',
				icon: Res.icon.add,
				className: 'flat primary',
				onClick: () => History.pushLargeModal(`/profiles/profiles/${args.profileId}/educations/create/`)
			})
		}
	}

	getUrl() {
		return `profiles/profiles/${this.state.profileId}/educations/`;
	}

	success(data, status) {
		data = data.map(education => {
				let educationId = education.id;
				let profileId = this.state.profileId;
				return {
					...education,
					editButton: Button.create_button({
						name: `edit-education-${educationId}`,
						icon: Res.icon.edit,
						onClick: () => {
							EducationEditForm.get(educationId, {educationId, profileId}).setContext(education);
							History.pushLargeModal(`/profiles/profiles/${profileId}/educations/${education.id}/edit/`)
						},
						className: 'flat primary',
					})
				}
			}
		);
		super.success(data, status);
	}
}
