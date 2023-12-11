import ScrollableFormBox from "../../../../base/forms/ScrollableFormBox";
import { withRouter } from "react-router";
import { connect } from "../../../../../stores/base/StoreManager";
import CourseChildrenCreateForm from "../../stores/author/CourseChildrenCreateForm";

class CourseChildrenCreateModal extends ScrollableFormBox {
  static getForm(props) {
    let { authorId, courseId } = props.match.params;
    return CourseChildrenCreateForm.map(courseId, { authorId, courseId });
  }
}

export default withRouter(connect(CourseChildrenCreateModal));
