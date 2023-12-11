import CertificateBaseForm from "./CertificateBaseForm";
import Certificates from "./Certificates";
import { CACHE_POLICY } from "../../../../../stores/base/RemoteStore";
import History from "../../../../../History";
import Button from "../../../../../stores/base/form/buttons/Button";
import Res from "../../../../../assets/Res";
import Confirm from "../../../../../stores/base/Confirm";
import Requester from "../../../../../utils/requests/Requester";
import MessageQueue from "../../../../../stores/base/MessageQueue";

export default class CertificateEditForm extends CertificateBaseForm {
  static storeName = "CertificateEditForm";

  createButtons(args) {
    return [
      Button.createSubmit({
        title: Res.string.profiles.certificates.edit_form_submit,
        onClick: () => this.submit(),
        className: "raised primary",
      }),
      Button.create_button({
        title: Res.string.profiles.certificates.delete_certificate,
        onClick: () => this.delete(),
        name: "delete",
        className: "flat danger",
      }),
      Button.create_back(),
    ];
  }

  getSubmitUrl() {
    return `profiles/profiles/${this.state.profileId}/certificates/${this.state.certificateId}/edit/`;
  }

  onSubmitCallback(response) {
    super.onSubmitCallback(response);
    History.goBack();
    Certificates.get(this.state.profileId).load(CACHE_POLICY.UPDATE);
  }

  getTitle(args) {
    return Res.string.profiles.certificates.edit_form_title;
  }

  delete() {
    Confirm.open(
      Res.string.profiles.certificates.delete_certificate,
      Res.string.profiles.certificates.delete_certificate_text,
      () => this.submitDelete(),
      Res.string.yes,
      "raised danger"
    );
  }

  submitDelete() {
    this.getButton("delete").set_loading(true);
    Requester.request(
      "post",
      `profiles/profiles/${this.state.profileId}/certificates/${this.state.certificateId}/delete/`,
      {},
      (response) => this.onDeleteCallback(response)
    );
  }

  onDeleteCallback(response) {
    this.getButton("delete").set_loading(false);
    MessageQueue.showObject(response.data);
    History.goBack();
    Certificates.get(this.state.profileId).load(CACHE_POLICY.UPDATE);
  }
}
