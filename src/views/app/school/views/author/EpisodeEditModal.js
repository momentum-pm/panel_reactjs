import ScrollableFormBox from "../../../../base/forms/ScrollableFormBox";
import {withRouter} from "react-router";
import {connect} from "../../../../../stores/base/StoreManager";
import EpisodeEditForm from "../../stores/author/EpisodeEditForm";

class EpisodeEditModal extends ScrollableFormBox {
	static getForm(props) {
		let {authorId, courseId, sectionId, episodeId} = props.match.params;
		return EpisodeEditForm.map(episodeId, {episodeId, authorId, sectionId, courseId});
	}
}

export default withRouter(connect(EpisodeEditModal))
