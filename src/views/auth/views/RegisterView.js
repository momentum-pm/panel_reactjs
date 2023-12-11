import { connect } from "../../../stores/base/StoreManager";
import FormView from "../../base/forms/FormView";
import { withRouter } from "react-router";
import RegisterForm from "../stores/RegisterForm";

class RegisterView extends FormView {
  static getForm(props) {
    let phone_number = props.match.params.phone_number;
    return RegisterForm.map(phone_number, { phone_number });
  }
}

export default withRouter(connect(RegisterView));
