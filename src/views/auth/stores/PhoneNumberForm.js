import Form from "../../../stores/base/form/Form";
import CharField, {
  INPUT_TYPES,
} from "../../../stores/base/form/fields/CharField";
import Res from "../../../assets/Res";
import Button from "../../../stores/base/form/buttons/Button";
import { STORE_TYPE } from "../../../stores/base/Store";
import Auth from "./Auth";
import Requester from "../../../utils/requests/Requester";
import RegisterForm from "./RegisterForm";
import ResetPasswordForm from "./ResetPasswordForm";

export default class PhoneNumberForm extends Form {
  static type = STORE_TYPE.SINGLETON;
  static storeName = "PhoneNumberForm";

  static getActions() {
    return [...super.getActions(), "submitDone"];
  }

  createFields() {
    return [
      CharField.create({
        name: "username",
        placeholder: "your-user-name",
        label: "Username",
      }),
      CharField.create({
        name: "password",
        input_type: INPUT_TYPES.PASSWORD,
        placeholder: "*******",
        label: "Password",
      }),
    ];
  }
  getTitle() {
    return "Login";
  }

  createButtons() {
    return [
      Button.createSubmit({
        title: "Login",
        icon: Res.icon.nextArrow,
        onClick: () => this.submit(),
        className: "raised primary full-responsive",
      }),
    ];
  }

  submit() {
    this.touch();
    if (this.isValid()) {
      this.getButton("submit").set_loading(true);
      Auth.get().login(this.getValues());
    }
  }

  submitDone() {
    this.getButton("submit").set_loading(false);
  }
}
