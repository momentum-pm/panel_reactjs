import { connect } from "../../../stores/base/StoreManager";
import FormView from "../../base/forms/FormView";
import Row from "../../base/Row";
import QuickLoginForm from "../stores/QuickLoginForm";

class QuickLoginView extends FormView {
  static getForm(props) {
    let { callbackUrl, callbackFunction, id, message, title } = props;
    return QuickLoginForm.map(id, {
      callbackUrl,
      callbackFunction,
      message,
      title,
    });
  }

  render() {
    return (
      <form className={"full-width column"}>
        {this.getTitleView()}
        {this.getHintView()}
        <Row className={"compact-rom bottomed"}>
          <div className="padding-two master-column">
            {this.getFieldsView()}
          </div>
          {this.getButtonsView()}
        </Row>
      </form>
    );
  }
  getTitleView() {
    return (
      <h2 className="center primary margin-two">{this.getState().title}</h2>
    );
  }

  getFieldsClassName() {
    return "";
  }
  getHintView() {
    return <p className="center large margin-two">{this.getState().message}</p>;
  }
}

export default connect(QuickLoginView);
