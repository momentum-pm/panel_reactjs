import { connect } from "../../../stores/base/StoreManager";
import FormView from "../../base/forms/FormView";
import PhoneNumberForm from "../stores/PhoneNumberForm";

class PhoneNumberView extends FormView {
  static getForm(props) {
    return PhoneNumberForm.map();
  }
}

export default connect(PhoneNumberView);
