import ScrollableFormBox from "../../../../base/forms/ScrollableFormBox";
import { withRouter } from "react-router";
import { connect } from "../../../../../stores/base/StoreManager";
import DiscountCreateForm from "../../stores/author/DiscountCreateForm";

class AccessCreateModal extends ScrollableFormBox {
  static getForm(props) {
    let { authorId, courseId, role } = props.match.params;
    return DiscountCreateForm.map(courseId + role, { authorId, courseId, role });
  }
 
}

export default withRouter(connect(AccessCreateModal));
