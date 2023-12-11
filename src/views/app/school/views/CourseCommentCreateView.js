import { withRouter } from "react-router";
import { connect } from "../../../../stores/base/StoreManager";
import CourseCommentCreateForm from "../stores/author/CourseCommentCreateForm";
import FormView from "../../../base/forms/FormView";
class CommentCreateView extends FormView {
  static getForm(props) {
    let parent = props.parent;
    let { courseSlug } = props.match.params;
    if (props.courseSlug) {
      courseSlug = props.courseSlug;
    }
    return CourseCommentCreateForm.map(courseSlug + parent, {
      parent,
      courseSlug,
    });
  }
  getFormClass() {
    return "row compact-form centered padding-one-before-after";
  }
  getFieldsClassName() {
    return "master-column";
  }
}

export default withRouter(connect(CommentCreateView));
