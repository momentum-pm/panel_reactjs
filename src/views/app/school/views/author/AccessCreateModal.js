import ScrollableFormBox from "../../../../base/forms/ScrollableFormBox";
import { withRouter } from "react-router";
import { connect } from "../../../../../stores/base/StoreManager";
import AccessCreateForm from "../../stores/author/AccessCreateForm";

class AccessCreateModal extends ScrollableFormBox {
  static getForm(props) {
    let { authorId, courseId, role } = props.match.params;
    return AccessCreateForm.map(courseId + role, { authorId, courseId, role });
  }
}

export default withRouter(connect(AccessCreateModal));
