import Form from "../../../stores/base/form/Form";
import CharField, {
  INPUT_TYPES,
} from "../../../stores/base/form/fields/CharField";
import Res from "../../../assets/Res";
import Button from "../../../stores/base/form/buttons/Button";
import Auth from "./Auth";

export default class LoginPasswordForm extends Form {
  static storeName = "LoginPasswordForm";
  createButtons() {
    return [
      Button.createSubmit({
        title: Res.string.auth.login.login,
        icon: Res.icon.nextArrow,
        onClick: () => this.submit(),
        className: "raised primary full-responsive",
      }),

      Button.create_button({
        name: "forget-password",
        title: Res.string.auth.login.reset_password,
        className: "flat full-responsive",
      }),
    ];
  }

}
