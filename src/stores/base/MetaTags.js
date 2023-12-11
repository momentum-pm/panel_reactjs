import Store, {STORE_TYPE} from "./Store";
import Res from "../../assets/Res";

export default class MetaTags extends Store {
	static type = STORE_TYPE.SINGLETON;
	static storeName = 'MetaTags';

	getInitialState(args) {

		return {
			title: Res.string.meta_tags.default_title,
			image: MetaTags.getDefaultImage(),
			description: Res.string.meta_tags.default_description,
			keywords: Res.string.meta_tags.default_keywords,
		}
	}

	static getActions() {
		return ['setTitle', 'setDescription', 'setImage', 'set_keywords'];
	}

	static getDefaultImage() {
		return null;
	}

	setTitle(title) {
		if (!title) {
			title = Res.string.meta_tags.default_title;
		} else {
			title = Res.string.meta_tags.getTitle(title);
		}
		this.state.title = title;
		this.save();
	}

	setImage(image) {
		if (!image) {
			image = MetaTags.getDefaultImage();
		}
		this.state.image = image;
		this.save();
	}

	set_keywords(keywords) {
		if (!keywords) {
			keywords = Res.string.meta_tags.default_keywords;
		}
		this.state.keywords = keywords;
		this.save();
	}

	setDescription(description) {
		if (!description) {
			description = Res.string.meta_tags.default_description;
		}
		this.state.description = description;
		this.save();
	}
}
