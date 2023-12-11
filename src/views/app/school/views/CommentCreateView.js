import { withRouter } from "react-router";
import { connect } from "../../../../stores/base/StoreManager";
import CommentCreateForm from "../stores/author/CommentCreateForm";
import FormView from "../../../base/forms/FormView";
class CommentCreateView extends FormView {
  static getForm(props) {
    let parent = props.parent;
    let { episodeId, episodeSlug, courseSlug } = props.match.params;
    if (props.episodeId){
      episodeId = props.episodeId;
    }
    return CommentCreateForm.map(episodeId + parent, {
      parent,
      episodeId,
      episodeSlug,
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
