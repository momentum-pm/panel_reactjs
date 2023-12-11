import ScrollableFormBox from "../../../../base/forms/ScrollableFormBox";
import { withRouter } from "react-router";
import { connect } from "../../../../../stores/base/StoreManager";
import AccessCreateForm from "../../stores/author/AccessCreateForm";
import AccessEditForm from "../../stores/author/AccessEditForm";

class AccessEditModal extends ScrollableFormBox {
  static getForm(props) {
    let { authorId, courseId, accessId } = props.match.params;
    return AccessEditForm.map(accessId, { authorId, courseId, accessId });
  }
}

export default withRouter(connect(AccessEditModal));
