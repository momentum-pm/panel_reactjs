import Res from "../../../../assets/Res";
import Validators from "../../../../utils/Validators";
import CharField from "../../../../stores/base/form/fields/CharField";
import BasePartEditForm from "./BasePartEditForm";
import FileField, {IMAGE_FORMATS} from "../../../../stores/base/form/fields/FileField";


export default class ImagePartEditForm extends BasePartEditForm {
	static storeName = 'ImagePartEditForm';

	createFields(args) {
		return [
			FileField.create({
				required: false,
				name: 'image_url',
				validators: [Validators.file_format(IMAGE_FORMATS)],
				label: Res.string.blog.paragraph_image_label,
				placeholder: Res.string.blog.paragraph_image_placeholder,
			}),
			CharField.create({
				name: 'alt',
				required: false,
				label: Res.string.blog.image_alt_label,
				placeholder: Res.string.blog.image_alt_placeholder,
				validators: [Validators.at_last(250, Res.string.characters)],
				className: 'inline-half-row-responsive',
			}),
			CharField.create({
				name: 'caption',
				required: false,
				label: Res.string.blog.image_caption_label,
				placeholder: Res.string.blog.image_caption_placeholder,
				className: 'inline-half-row-responsive',
			}),

			...super.createFields(args),
		];
	}

	setContext(context) {
		context.image_url = context.image;
		super.setContext(context);
	}


	getSubmitUrl() {
		return `blog/authors/${this.state.authorId}/posts/${this.state.postId}/image-parts/${this.state.partId}/`;
	}

}
