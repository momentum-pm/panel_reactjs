import { withRouter } from "react-router";
import { connect } from "../../../../../stores/base/StoreManager";
import Row from "../../../../base/Row";
import StoreView from "../../../../base/StoreView";
import ButtonView from "../../../../base/forms/button/ButtonView";
import CallConfirm from "../stores/CallConfirm";
import TagView from "../../../../base/tag/TagView";
class CallConfirmView extends StoreView {
  static mapPropsToStores(props) {
    return {
      store: CallConfirm.map(props.call.id, {
        call: props.call,
        thread: props.match.params.thread,
      }),
    };
  }
  render() {
    return (
      <div key={this.props.call.id}>
        <p>{this.props.store.state.call.question}</p>
        {!this.props.store.state.call.output ? (
          <Row className={"reverse"}>
            <ButtonView id={this.props.store.state.confirmButton.id} />
            <ButtonView id={this.props.store.state.rejectButton.id} />
          </Row>
        ) : null}
        {this.props.store.state.call.output === "Yes" ? (
          <Row className={"reverse padding-two-sides"}>
            <TagView className="success spacing-two-sides" title={"Yes"} />
          </Row>
        ) : null}
        {this.props.store.state.call.output === "No" ? (
          <Row className={"reverse"}>
            <p className="danger">No</p>
          </Row>
        ) : null}
      </div>
    );
  }
}
export default withRouter(connect(CallConfirmView));
