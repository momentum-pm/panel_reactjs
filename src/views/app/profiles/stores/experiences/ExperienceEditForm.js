import ExperienceBaseForm from "./ExperienceBaseForm";
import Experiences from "./Experiences";
import { CACHE_POLICY } from "../../../../../stores/base/RemoteStore";
import History from "../../../../../History";
import Button from "../../../../../stores/base/form/buttons/Button";
import Res from "../../../../../assets/Res";
import Confirm from "../../../../../stores/base/Confirm";
import Requester from "../../../../../utils/requests/Requester";
import MessageQueue from "../../../../../stores/base/MessageQueue";

export default class ExperienceEditForm extends ExperienceBaseForm {
  static storeName = "ExperienceEditForm";

  createButtons(args) {
    return [
      Button.createSubmit({
        title: Res.string.profiles.experiences.edit_form_submit,
        onClick: () => this.submit(),
        className: "raised primary",
      }),
      Button.create_button({
        title: Res.string.profiles.experiences.delete_experience,
        onClick: () => this.delete(),
        name: "delete",
        className: "flat danger",
      }),
      Button.create_back(),
    ];
  }

  setContext(context) {
    super.setContext(context);
    if (!context.end) {
      this.getField("still-working").setValue(true);
    }
  }

  getSubmitUrl() {
    return `profiles/profiles/${this.state.profileId}/experiences/${this.state.experienceId}/edit/`;
  }

  onSubmitCallback(response) {
    super.onSubmitCallback(response);
    History.goBack();
    Experiences.get(this.state.profileId).load(CACHE_POLICY.UPDATE);
  }

  getTitle(args) {
    return Res.string.profiles.experiences.edit_form_title;
  }

  delete() {
    Confirm.open(
      Res.string.profiles.experiences.delete_experience,
      Res.string.profiles.experiences.delete_experience_text,
      () => this.submitDelete(),
      Res.string.yes,
      "raised danger"
    );
  }

  submitDelete() {
    this.getButton("delete").set_loading(true);
    Requester.request(
      "post",
      `profiles/profiles/${this.state.profileId}/experiences/${this.state.experienceId}/delete/`,
      {},
      (response) => this.onDeleteCallback(response)
    );
  }

  onDeleteCallback(response) {
    this.getButton("delete").set_loading(false);
    MessageQueue.showObject(response.data);
    History.goBack();
    Experiences.get(this.state.profileId).load(CACHE_POLICY.UPDATE);
  }
}
