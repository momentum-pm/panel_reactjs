import Res from "../../../../assets/Res";
import SelectField from "../../../../stores/base/form/fields/SelectField";
import RichTextField from "../../../../stores/base/form/fields/RichTextField";
import Validators from "../../../../utils/Validators";
import FileField, {IMAGE_FORMATS} from "../../../../stores/base/form/fields/FileField";
import CharField from "../../../../stores/base/form/fields/CharField";
import MultiFileField, {ALL_FORMATS} from "../../../../stores/base/form/fields/MultiFileField";
import BasePartEditForm from "./BasePartEditForm";


export default class ParagraphEditForm extends BasePartEditForm {
	static storeName = 'ParagraphEditForm';

	createFields(args) {
		return [

			RichTextField.create({
				name: 'content',
				rows: 5,
				required: false,
				placeholder: Res.string.blog.content_placeholder,
				label: Res.string.blog.content_label,
				fullToolbar: true,
			}),
			MultiFileField.create({
				required: false,
				name: 'files',
				file_validators: [Validators.file_format(ALL_FORMATS)],
				label: Res.string.blog.attachments_label,
				placeholder: Res.string.blog.attachments_placeholder,
				className: 'inline-half-row-responsive',
			}),
			FileField.create({
				required: false,
				name: 'image_url',
				validators: [Validators.file_format(IMAGE_FORMATS)],
				label: Res.string.blog.paragraph_image_label,
				placeholder: Res.string.blog.paragraph_image_placeholder,
				className: 'inline-half-row-responsive',
			}),
			CharField.create({
				name: 'image_alt',
				required: false,
				label: Res.string.blog.image_alt_label,
				placeholder: Res.string.blog.image_alt_placeholder,
				validators: [Validators.at_last(250, Res.string.characters)],
				className: 'inline-half-row-responsive',
			}),
			SelectField.create({
				name: 'image_location',
				required: false,
				items: ['start', 'end'],
				itemToTitle: Res.string.blog.image_location_to_title,
				itemToValue: item => item,
				label: Res.string.blog.image_location_label,
				placeholder: Res.string.blog.image_location_placeholder,
				className: 'inline-half-row-responsive',
			}),
			...super.createFields(args),
		];
	}


	setContext(context) {
		context.files = context.attachments;
		context.image_url = context.image;
		super.setContext(context);
	}


	getSubmitUrl() {
		return `blog/authors/${this.state.authorId}/posts/${this.state.postId}/paragraphs/${this.state.partId}/`;
	}

}
