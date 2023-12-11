import EducationBaseForm from "./EducationBaseForm";
import Educations from "./Educations";
import { CACHE_POLICY } from "../../../../../stores/base/RemoteStore";
import History from "../../../../../History";
import Button from "../../../../../stores/base/form/buttons/Button";
import Res from "../../../../../assets/Res";
import Confirm from "../../../../../stores/base/Confirm";
import Requester from "../../../../../utils/requests/Requester";
import MessageQueue from "../../../../../stores/base/MessageQueue";

export default class EducationEditForm extends EducationBaseForm {
  static storeName = "EducationEditForm";

  createButtons(args) {
    return [
      Button.createSubmit({
        title: Res.string.profiles.educations.edit_form_submit,
        onClick: () => this.submit(),
        className: "raised primary",
      }),
      Button.create_button({
        title: Res.string.profiles.educations.delete_education,
        onClick: () => this.delete(),
        name: "delete",
        className: "flat danger",
      }),
      Button.create_back(),
    ];
  }

  getSubmitUrl() {
    return `profiles/profiles/${this.state.profileId}/educations/${this.state.educationId}/edit/`;
  }

  onSubmitCallback(response) {
    super.onSubmitCallback(response);
    History.goBack();
    Educations.get(this.state.profileId).load(CACHE_POLICY.UPDATE);
  }

  getTitle(args) {
    return Res.string.profiles.educations.edit_form_title;
  }

  delete() {
    Confirm.open(
      Res.string.profiles.educations.delete_education,
      Res.string.profiles.educations.delete_education_text,
      () => this.submitDelete(),
      Res.string.yes,
      "raised danger"
    );
  }

  submitDelete() {
    this.getButton("delete").set_loading(true);
    Requester.request(
      "post",
      `profiles/profiles/${this.state.profileId}/educations/${this.state.educationId}/delete/`,
      {},
      (response) => this.onDeleteCallback(response)
    );
  }

  onDeleteCallback(response) {
    this.getButton("delete").set_loading(false);
    MessageQueue.showObject(response.data);
    History.goBack();
    Educations.get(this.state.profileId).load(CACHE_POLICY.UPDATE);
  }
}
