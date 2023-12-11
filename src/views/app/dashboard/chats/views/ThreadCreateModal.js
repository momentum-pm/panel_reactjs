import ScrollableFormBox from "../../../../base/forms/ScrollableFormBox";
import { withRouter } from "react-router";
import { connect } from "../../../../../stores/base/StoreManager";
import ThreadCreateForm from "../stores/ThreadCreateForm";

class ThreadCreateModal extends ScrollableFormBox {
  static getForm(props) {
    let { member } = props.match.params;
    return ThreadCreateForm.map(member, { member });
  }
}

export default withRouter(connect(ThreadCreateModal));
