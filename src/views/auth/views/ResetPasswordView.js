import { connect } from "../../../stores/base/StoreManager";
import ResetPassword from "../stores/ResetPasswordForm";
import FormView from "../../base/forms/FormView";
import { withRouter } from "react-router";

class ResetPasswordView extends FormView {
  static getForm(props) {
    let phone_number = props.match.params.phone_number;
    return ResetPassword.map(phone_number, { phone_number });
  }
}

export default withRouter(connect(ResetPasswordView));
