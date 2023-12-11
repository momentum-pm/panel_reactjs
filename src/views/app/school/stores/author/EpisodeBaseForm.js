import CharField from "../../../../../stores/base/form/fields/CharField";
import Res from "../../../../../assets/Res";
import RemoteForm from "../../../../../stores/base/form/RemoteForm";
import SwitchField from "../../../../../stores/base/form/fields/SwitchField";
import {getSlug} from "../../../../../utils/StringUtils";
import RemoteMultiSelectField from "../../../../../stores/base/form/fields/RemoteMultiSelectField";
import CompactCourses from "../CompactCourses";
import RichTextField from "../../../../../stores/base/form/fields/RichTextField";
import MultiFileField from "../../../../../stores/base/form/fields/MultiFileField";


export default class EpisodeBaseForm extends RemoteForm {
	static storeName = 'EpisodeBaseForm';

	onCreate() {
		super.onCreate();
		let values = {
			public: false,
			single_sell: false,
			price: 0,
		};
		this.setContext(values);

	}

	createFields(args) {
		return [
			CharField.create({
				name: 'title',
				label: Res.string.school.episode_title_label,
				placeholder: Res.string.school.episode_title_placeholder,
				className: 'inline-half-row-responsive',
			}),
			CharField.createNumber({
				name: 'order',
				label: Res.string.school.episode_order_label,
				placeholder: Res.string.school.episode_order_placeholder,
				className: 'inline-half-row-responsive',
			}),
			CharField.create({
				name: 'slug',
				label: Res.string.school.slug_label,
				placeholder: Res.string.school.slug_placeholder,
				className: 'inline-half-row-responsive',
			}),
			SwitchField.create({
				question: Res.string.school.episode_public_label,
				name: 'public',
				required: false,
				className: 'inline-half-row-responsive',
			}),
			CharField.create({
				name: "remote_video_id",
				required: false,
				label: Res.string.school.remote_video_id_label,
				placeholder: Res.string.school.remote_video_id_placeholder,
				className: "inline-half-row-responsive",
			  }),
		
			RichTextField.create({
				name: 'notes',
				label: Res.string.school.notes_label,
				placeholder: Res.string.notes_label,
				required: false,
			}),
			MultiFileField.create({
				name: 'files',
				label: Res.string.school.files_label,
				placeholder: Res.string.notes_label,
				required: false,
			}),
			SwitchField.create({
				question: Res.string.school.is_related_label,
				name: 'is_related',
				required: false,
				className: 'inline-half-row-responsive',
			}),
			RemoteMultiSelectField.create({
				placeholder: Res.string.school.related_courses_label,
				name: 'related_courses',
				remoteStore: CompactCourses.get(),
				required: false,
				itemToTitle: item => item.title,
				itemToValue: item => item.id,
				label: Res.string.school.related_courses_label,
			}),

		]
	}

	onFieldChange(field) {
		if ((field.state.name === 'title') && field.state.value) {
			let slug = getSlug(field.state.value);
			this.getField('slug').setValue(slug);
		}
	}
}
