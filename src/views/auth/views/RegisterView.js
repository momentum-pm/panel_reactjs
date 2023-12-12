import { connect } from "../../../stores/base/StoreManager";
import FormView from "../../base/forms/FormView";
import { withRouter } from "react-router";
import RegisterForm from "../stores/RegisterForm";

class RegisterView extends FormView {
  static getForm(props) {
    return RegisterForm.map();
  }
}

export default withRouter(connect(RegisterView));
