import ProfilePictureField from "../../../../../stores/base/form/fields/ProfilePictureField";
import CharField from "../../../../../stores/base/form/fields/CharField";
import Res from "../../../../../assets/Res";
import BooleanField from "../../../../../stores/base/form/fields/BooleanField";
import DateField from "../../../../../stores/base/form/fields/DateField";
import Button from "../../../../../stores/base/form/buttons/Button";
import UserProfileEdit from "./UserProfileEdit";
import CollapsedForm from "../../../../../stores/base/form/CollapsedForm";
import BulletField from "../../../../../stores/base/form/fields/BulletField";
import Validators from "../../../../../utils/Validators";
import Status from "../../../../../utils/requests/Status";
import FileField, {
  SIZE,
} from "../../../../../stores/base/form/fields/FileField";
import ImageField, {
  RATIO,
} from "../../../../../stores/base/form/fields/ImageField";
import RichTextField from "../../../../../stores/base/form/fields/RichTextField";

export default class UserInfoEditForm extends CollapsedForm {
  static storeName = "UserInfoEditForm";

  createFields(args) {
    return [
      ProfilePictureField.create({
        name: "picture",
        required: false,
        validators: [Validators.file_max_size(SIZE.MB(3))],
      }),
      FileField.create({
        name: "cover",
        label: "تصویر کاور",
        placeholder: "اینجا رها کنید یا انتخاب کنید",
        required: false,
        ratio: RATIO.W10H10,
      }),
      CharField.create({
        name: "about",
        label: Res.string.profiles.about_label,
        placeholder: Res.string.profiles.about_placeholder,
        validators: [Validators.at_last(50, Res.string.characters)],
        required: false,
        showLabelDetails: false,
      }),
      RichTextField.create({
        name: "cover_text",
        label: Res.string.profiles.about_label,
        placeholder: Res.string.profiles.about_placeholder,
        required: false,
        showLabelDetails: false,
      }),
      CharField.create({
        name: "first_name",
        className: "half-column-field",
        label: Res.string.profiles.first_name_label,
        validators: [Validators.at_last(30, Res.string.characters)],
        placeholder: Res.string.profiles.first_name_placeholder,
      }),
      CharField.create({
        name: "last_name",
        className: "half-column-field",
        label: Res.string.profiles.last_name_label,
        validators: [Validators.at_last(50, Res.string.characters)],
        placeholder: Res.string.profiles.last_name_placeholder,
      }),
      CharField.createPhoneNumber({
        name: "phone_number",
        label: Res.string.profiles.phone_number_label,
        showLabelDetails: false,
        placeholder: Res.string.profiles.phone_number_placeholder,
        required: false,
      }),
      BooleanField.create({
        name: "public_phone_number",
        question: Res.string.profiles.phone_number_public_label,
        required: false,
      }),
      CharField.createEmail({
        name: "email",
        label: Res.string.profiles.email_label,
        required: false,
        placeholder: Res.string.profiles.email_placeholder,
      }),
      BooleanField.create({
        name: "public_email",
        question: Res.string.profiles.email_public_label,
        required: false,
      }),
      DateField.create({
        name: "birthday",
        label: Res.string.profiles.birthday_label,
        showLabelDetails: false,
        required: false,
      }),
      BulletField.create({
        name: "gender",
        label: Res.string.profiles.gender_question,
        placeholder: Res.string.profiles.gender_question,
        items: ["m", "f"],
        itemToValue: (item) => item,
        itemToTitle: (item) => {
          switch (item) {
            case "m":
              return Res.string.profiles.male;
            case "f":
              return Res.string.profiles.female;
            default:
              return null;
          }
        },
        itemClassName: "inline-flex",
        required: false,
        showLabelDetails: false,
      }),
    ];
  }

  getCloseTitle() {
    return Res.string.profiles.edit_info_title;
  }

  getCloseIcon() {
    return Res.icon.edit;
  }

  getCloseClass() {
    return "center flat primary";
  }

  createButtons(args) {
    return [
      Button.createSubmit({
        title: Res.string.profiles.save_info,
        icon: Res.icon.check,
        className: "raised primary",
        onClick: () => this.submit(),
      }),
      Button.create_button({
        name: "reset",
        title: Res.string.reset_form,
        className: "flat primary",
        onClick: () => this.reset(),
      }),
    ];
  }

  reset() {
    this.setContext(UserProfileEdit.get(this.state.profileId).state.data);
  }

  getSubmitUrl() {
    return `profiles/profiles/${this.state.profileId}/edit/`;
  }

  onSubmitCallback(response) {
    super.onSubmitCallback(response);
    if (Status.isOk(response.status)) {
      UserProfileEdit.get(this.state.profileId).success(
        response.data.profile,
        response.status
      );
    }
  }
}
