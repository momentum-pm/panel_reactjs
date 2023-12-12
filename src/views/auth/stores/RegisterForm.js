import Form from "../../../stores/base/form/Form";
import CharField, {
  INPUT_TYPES,
} from "../../../stores/base/form/fields/CharField";
import Res from "../../../assets/Res";
import Button from "../../../stores/base/form/buttons/Button";
import Validators from "../../../utils/Validators";
import Auth from "./Auth";
import { STORE_TYPE } from "../../../stores/base/Store";
export default class RegisterForm extends Form {
  static storeName = "RegisterForm";
  static type = STORE_TYPE.SINGLETON;

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
        name: "first_name",
        label: Res.string.auth.register.first_name_label,
        validators: [Validators.at_last(30, Res.string.characters)],
        placeholder: Res.string.auth.register.first_name_placeholder,
        className: "half-column-field",
      }),
      CharField.create({
        name: "last_name",
        label: Res.string.auth.register.last_name_label,
        validators: [Validators.at_last(150, Res.string.characters)],
        placeholder: Res.string.auth.register.last_name_placeholder,
        className: "half-column-field",
      }),

      CharField.create({
        name: "password",
        label: Res.string.auth.register.password_label,
        validators: [
          Validators.at_least(6, Res.string.characters),
          Validators.at_last(150, Res.string.characters),
        ],
        input_type: INPUT_TYPES.PASSWORD,
        placeholder: Res.string.auth.register.password_placeholder,
      }),
    ];
  }

  createButtons() {
    return [
      Button.createSubmit({
        title: Res.string.auth.register.register,
        icon: Res.icon.nextArrow,
        onClick: () => this.submit(),
        className: "large raised primary full-responsive",
      }),

      Button.create_button({
        name: "already-registered",
        title: Res.string.auth.register.already_registered_title,
        onClick: () => Auth.get().goTo(""),
        className: "flat full-responsive",
      }),
    ];
  }

  submit() {
    this.touch();
    if (this.isValid()) {
      this.getButton("submit").set_loading(true);
      Auth.get().register({
        ...this.getValues(),
      });
    }
  }

  submitDone() {
    this.getButton("submit").set_loading(false);
  }
}
