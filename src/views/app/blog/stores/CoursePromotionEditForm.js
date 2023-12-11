import Res from "../../../../assets/Res";
import BasePartEditForm from "./BasePartEditForm";
import RemoteSelectField from "../../../../stores/base/form/fields/RemoteSelectField";
import CompactCourses from "../../school/stores/CompactCourses";
import RichTextField from "../../../../stores/base/form/fields/RichTextField";


export default class CoursePromotionEditForm extends BasePartEditForm {
	static storeName = 'CoursePromotionEditForm';

	createFields(args) {
		return [
			RemoteSelectField.create({
				name: 'course',
				label: Res.string.blog.course_label,
				placeholder: Res.string.blog.course_placeholder,
				remoteStore: CompactCourses.get(),
				itemToTitle: item => item.title,
				itemToValue: item => item.id,
			}),
			RichTextField.create({
				name: 'content',
				rows: 3,
				required: false,
				placeholder: Res.string.blog.content_placeholder,
				label: Res.string.blog.content_label,
				fullToolbar: true,
			}),
			...super.createFields(args),
		];
	}

	setContext(context) {
		super.setContext(context);
	}


	getSubmitUrl() {
		return `blog/authors/${this.state.authorId}/posts/${this.state.postId}/course-promotions/${this.state.partId}/`;
	}

}
