import { withRouter } from "react-router";
import { connect } from "../../../../stores/base/StoreManager";
import CommentCreateForm from "../stores/CommentCreateForm";
import FormView from "../../../base/forms/FormView";
class CommentCreateView extends FormView {
  static getForm(props) {
    let parent = props.parent;
    let { slug } = props.match.params;
    if (!slug){
      slug = props.slug;
    }
    return CommentCreateForm.map(slug+parent, { parent, slug });
  }
  getFormClass() {
    return "row compact-form centered padding-one-before-after";
  }
  getFieldsClassName() {
    return "master-column";
  }
}

export default withRouter(connect(CommentCreateView));
