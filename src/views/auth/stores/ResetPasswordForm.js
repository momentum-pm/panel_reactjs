import Form from "../../../stores/base/form/Form";
import CharField, {
  INPUT_TYPES,
} from "../../../stores/base/form/fields/CharField";
import Res from "../../../assets/Res";
import Button from "../../../stores/base/form/buttons/Button";
import Validators from "../../../utils/Validators";
import Auth from "./Auth";

export default class ResetPasswordForm extends Form {
  static storeName = "ResetPasswordForm";

  createFields(args) {
    return [
      CharField.createNumber({
        name: "code",
        showLabelDetails: false,
        label: "کد ورود به سایت",
        placeholder: "کد پیامک شده را وارد کنید...",
      }),
      CharField.create({
        name: "password",
        validators: [
          Validators.at_least(6, Res.string.characters),
          Validators.at_last(150, Res.string.characters),
        ],
        input_type: INPUT_TYPES.PASSWORD,
        label: "گذرواژه جدید",
        placeholder: Res.string.auth.reset_password.password_placeholder,
      }),
    ];
  }

  createButtons(args) {
    return [
      Button.createSubmit({
        title: Res.string.auth.reset_password.submit,
        onClick: () => this.submit(),
        className: "large raised primary",
      }),
      Button.create_button({
        name: "resend",
        title: "ارسال مجدد",
        icon: Res.icon.refresh,
        onClick: () => this.resend(),
        className: "flat white full-responsive",
      }),
    ];
  }
  resend() {
    this.getButton("resend").set_loading(true);
    Auth.get().resend({ phone_number: this.state.phone_number }, () =>
      this.getButton("resend").set_loading(false)
    );
  }

  submit() {
    this.touch();
    if (this.isValid()) {
      this.getButton("submit").set_loading(true);
      Auth.get().login({
        ...this.getValues(),
        login_type: "reset",
        phone_number: this.state.phone_number,
      });
    }
  }

  submitDone() {
    this.getButton("submit").set_loading(false);
  }
}
