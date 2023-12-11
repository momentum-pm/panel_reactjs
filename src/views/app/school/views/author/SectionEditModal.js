import ScrollableFormBox from "../../../../base/forms/ScrollableFormBox";
import SectionEditForm from "../../stores/author/SectionEditForm";
import {withRouter} from "react-router";
import {connect} from "../../../../../stores/base/StoreManager";

class SectionEditModal extends ScrollableFormBox {

	static getForm(props) {
		let { authorId, courseId, parentId,sectionId } = props.match.params;
		let store = SectionEditForm.get(sectionId, { authorId, courseId ,sectionId});
		if (store.getField("parent_id").state.value !== parentId) {
		  store.getField("parent_id").setValue(parentId);

		}
		return SectionEditForm.map(sectionId, {sectionId, authorId, courseId})
	}
}

export default withRouter(connect(SectionEditModal));
