import Form from "../../../../stores/base/form/Form";
import { STORE_TYPE } from "../../../../stores/base/Store";
import CharField from "../../../../stores/base/form/fields/CharField";
import Res from "../../../../assets/Res";
import Button from "../../../../stores/base/form/buttons/Button";
import Status from "../../../../utils/requests/Status";
import History from "../../../../History";
import App from "../../../../stores/app/App";
import UserProfileEdit from "./userProfileEdit/UserProfileEdit";

export default class PhoneNumberUpdateForm extends Form {
  static storeName = "PhoneNumberUpdateForm";
  static type = STORE_TYPE.SINGLETON;

  createFields(args) {
    return [
      CharField.createPhoneNumber({
        name: "phone_number",
        label: Res.string.dashboard.settings.phone_number_label,
        placeholder: Res.string.dashboard.settings.phone_number_placeholder,
      }),
    ];
  }

  createButtons(args) {
    return [
      Button.createSubmit({
        title: "",
        onClick: () => this.submit(),
        className: "raised primary",
      }),
      Button.create_back(),
    ];
  }

  setContext(context) {
    super.setContext(context);
    this.getButton("submit").set_title(context.submit_title);
    this.getField("phone_number").setProperty("hint", context.message);
    this.state.title = context.title;
    this.state.callback = context.callback;
    this.save();
  }

  getSubmitUrl() {
    return `profiles/profiles/${App.getId()}/edit/`;
  }

  onSubmitCallback(response) {
    super.onSubmitCallback(response);
    if (Status.isOk(response.status)) {
      let profileId = App.getId();
      UserProfileEdit.get(profileId, { profileId }).success(
        response.data.profile,
        response.status
      );
      if (this.state.callback) {
        this.state.callback();
      }
    }
    History.goBack();
  }
}
