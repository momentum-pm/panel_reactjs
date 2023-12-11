import RemoteStore from "../../../../stores/base/RemoteStore";


export default class AuthorPost extends RemoteStore {
	static storeName = 'AuthorPost';


	getUrl() {
		return `blog/authors/${this.state.authorId}/posts/${this.state.postId}/`;
	}
}
