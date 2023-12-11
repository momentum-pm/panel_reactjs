import ScrollableFormBox from "../../../../base/forms/ScrollableFormBox";
import { withRouter } from "react-router";
import { connect } from "../../../../../stores/base/StoreManager";
import SectionCreateForm from "../../stores/author/SectionCreateForm";

class SectionCreateModal extends ScrollableFormBox {
  static getForm(props) {
    let { authorId, courseId, parentId } = props.match.params;
    let store = SectionCreateForm.get(courseId, { authorId, courseId });
    if (store.getField("parent_id").state.value !== parentId) {
      store.getField("parent_id").setValue(parentId);
    }
    return SectionCreateForm.map(courseId, { authorId, courseId });
  }
}

export default withRouter(connect(SectionCreateModal));
