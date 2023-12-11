import { connect } from "../../../../stores/base/StoreManager";
import CourseCommentDelete from "../stores/author/CourseCommentDelete";
import ButtonView from "../../../base/forms/button/ButtonView";
import StoreView from "../../../base/StoreView";
class CourseCommentDeleteView extends StoreView {
  static mapPropsToStores(props) {
    let id = props.id;
    return { store: CourseCommentDelete.map(id, { id }) };
  }
  render() {
    return <ButtonView id={this.props.store.state.deleteButton.id} />;
  }
}

export default connect(CourseCommentDeleteView);
