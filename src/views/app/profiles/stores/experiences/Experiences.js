import RemoteStore from "../../../../../stores/base/RemoteStore";
import Button from "../../../../../stores/base/form/buttons/Button";
import Res from "../../../../../assets/Res";
import ExperienceEditForm from "./ExperienceEditForm";
import History from "../../../../../History";
import {getDateDistanceString} from "../../../../../utils/DateUtils";
import {GregorianCalendar} from "../../../../../utils/CalendarUtils";


export default class Experiences extends RemoteStore {
	static storeName = 'Experiences';

	getInitialState(args) {
		return {
			...super.getInitialState(args),
			createButton: Button.create_button({
				name: 'create-experience',
				icon: Res.icon.add,
				className: 'flat primary',
				onClick: () => History.pushLargeModal(`/profiles/profiles/${args.profileId}/experiences/create/`)
			})
		}
	}

	getUrl() {
		return `profiles/profiles/${this.state.profileId}/experiences/`;
	}

	success(data, status) {
		data = data.map(experience => {
				let experienceId = experience.id;
				let profileId = this.state.profileId;
				let duration;
				if (experience.end) {
					duration = getDateDistanceString(experience.end, experience.start);
				} else {
					duration = getDateDistanceString(GregorianCalendar.getToday(), experience.start);
				}
				
				return {
					...experience,
					duration,
					editButton: Button.create_button({
						name: `edit-experience-${experienceId}`,
						icon: Res.icon.edit,
						onClick: () => {
							ExperienceEditForm.get(experienceId, {experienceId, profileId}).setContext(experience);
							History.pushLargeModal(`/profiles/profiles/${profileId}/experiences/${experience.id}/edit/`)
						},
						className: 'flat primary',
					})
				}
			}
		);
		let totalDuration = 0;
		data.forEach(experience=>{
			if (experience.end) {
				totalDuration+= new Date(experience.end).getTime() - new Date(experience.start).getTime();
			} else {
				totalDuration += new Date().getTime() - new Date(experience.start).getTime();

			}
		});
		this.state.totalDuration = totalDuration;

		
		
		super.success(data, status);
	}
}
