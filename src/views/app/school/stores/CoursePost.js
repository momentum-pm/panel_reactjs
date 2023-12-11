import RemoteStore from "../../../../stores/base/RemoteStore";
import MetaTags from "../../../../stores/base/MetaTags";


export default class CoursePost extends RemoteStore {
	static storeName = 'CoursePost';


	getUrl() {
		return `blog/course-posts/${this.state.postId}/`;
	}

	success(data, status) {
		MetaTags.get().setTitle(data.meta_title);
		MetaTags.get().setImage(data.meta_image);
		MetaTags.get().setDescription(data.meta_description);
		super.success(data, status);
	}
}
