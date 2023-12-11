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

export default class QuickLoginForm extends Form {
  static storeName = "QuickLoginForm";

  static getActions() {
    return [...super.getActions(), "submitDone"];
  }

  createFields() {
    return [
      CharField.createPhoneNumber({
        name: "phone_number",
        placeholder: "شماره موبایل",
      }),
    ];
  }
  getTitle(args) {
    return args.title;
  }

  createButtons() {
    return [
      Button.createSubmit({
        title: "ورود",
        icon: Res.icon.nextArrow,
        onClick: () => this.submit(),
        className: "raised low-margin primary large",
      }),
    ];
  }

  submit() {
    this.touch();
    if (this.isValid()) {
      this.getButton("submit").set_loading(true);
      let { phone_number } = this.getValues();
      Requester.request(
        "get",
        "auth/check-phone-number/",
        { username: phone_number },
        (response) => this.submitDone(response, phone_number)
      );
    }
  }
  submitDone(response, phone_number) {
    Auth.get().setCallback(
      this.state.callbackFunction,
      this.state.callbackUrl,
      true,
      null
    );
    this.getButton("submit").set_loading(false);
    Auth.get().goTo(
      `${phone_number}/${response.data?.username ? "login/code" : "register"}`
    );
  }
}
