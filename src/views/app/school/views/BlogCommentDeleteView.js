import { connect } from "../../../../stores/base/StoreManager";
import BlogCommentDelete from "../stores/author/BlogCommentDelete";
import ButtonView from "../../../base/forms/button/ButtonView";
import StoreView from "../../../base/StoreView";
class BlogCommentDeleteView extends StoreView {
  static mapPropsToStores(props) {
    let id = props.id;
    return { store: BlogCommentDelete.map(id, { id }) };
  }
  render() {
    return <ButtonView id={this.props.store.state.deleteButton.id} />;
  }
}

export default connect(BlogCommentDeleteView);
