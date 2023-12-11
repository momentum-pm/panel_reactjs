import ScrollableFormBox from "../../../../base/forms/ScrollableFormBox";
import {withRouter} from "react-router";
import {connect} from "../../../../../stores/base/StoreManager";
import EpisodeCreateForm from "../../stores/author/EpisodeCreateForm";

class EpisodeCreateModal extends ScrollableFormBox {
	static getForm(props) {
		let {authorId, courseId, sectionId} = props.match.params;
		return EpisodeCreateForm.map(sectionId, {authorId, sectionId, courseId});
	}
}

export default withRouter(connect(EpisodeCreateModal))
