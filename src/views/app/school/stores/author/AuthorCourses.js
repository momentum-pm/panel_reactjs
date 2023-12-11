import PaginatedRemoteStore from "../../../../../stores/base/PaginatedRemoteStore";
import Button from "../../../../../stores/base/form/buttons/Button";
import Res from "../../../../../assets/Res";


export default class AuthorCourses extends PaginatedRemoteStore {
	static storeName = 'AuthorCourses';


	getInitialState(args) {
		return {
			...super.getInitialState(args),
			createButton: Button.create_link({
				name: 'createButton',
				title: Res.string.school.create_button_title,
				icon: Res.icon.add,
				link: `/school/authors/${args.authorId}/courses/create/`,
				className: 'raised large primary'
			})
		}
	}

	getUrl() {
		return `school/authors/${this.state.authorId}/courses/`;
	}
}
