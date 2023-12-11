import { connect } from "../../../../stores/base/StoreManager";
import EpisodeCommentDelete from "../stores/author/EpisodeCommentDelete";
import ButtonView from "../../../base/forms/button/ButtonView";
import StoreView from "../../../base/StoreView";
class EpisodeCommentDeleteView extends StoreView {
  static mapPropsToStores(props) {
    let id = props.id;
    return { store: EpisodeCommentDelete.map(id, { id }) };
  }
  render() {
    return <ButtonView id={this.props.store.state.deleteButton.id} />;
  }
}

export default connect(EpisodeCommentDeleteView);
