import Res from "../../../../../assets/Res";
import Button from "../../../../../stores/base/form/buttons/Button";
import History from "../../../../../History";
import { CACHE_POLICY } from "../../../../../stores/base/RemoteStore";
import Collections from "./Collections";
import CollectionCreateForm from "./CollectionCreateForm";
import Collection from "./Collection";
import Confirm from "../../../../../stores/base/Confirm";
import Requester from "../../../../../utils/requests/Requester";
import MessageQueue from "../../../../../stores/base/MessageQueue";

export default class CollectionEditForm extends CollectionCreateForm {
  static storeName = "CollectionCreateForm";

  getRemoteStore(args) {
    return Collection.get(args.collectionId, args);
  }

  createButtons(args) {
    return [
      Button.createSubmit({
        title: Res.string.profiles.samples.edit_collection_submit,
        onClick: () => this.submit(),
        className: "raised primary",
      }),
      Button.create_button({
        name: "delete",
        title: Res.string.profiles.samples.delete_collection_submit,
        onClick: () => this.delete(),
        className: "flat danger",
      }),
      Button.create_back(),
    ];
  }

  delete() {
    Confirm.open(
      Res.string.profiles.samples.delete_collection,
      Res.string.profiles.samples.delete_collection_text,
      () => this.submitDelete(),
      Res.string.yes,
      "raised danger"
    );
  }

  submitDelete() {
    this.getButton("delete").set_loading(true);
    Requester.request(
      "post",
      `profiles/profiles/${this.state.profileId}/collections/${this.state.collectionId}/delete/`,
      {},
      (response) => this.onDeleteCallback(response)
    );
  }

  onDeleteCallback(response) {
    this.getButton("delete").set_loading(false);
    MessageQueue.showObject(response.data);
    History.goBack();
    Collections.get(this.state.profileId).load(CACHE_POLICY.UPDATE);
  }

  getTitle(args) {
    return Res.string.profiles.samples.edit_collection_button;
  }

  onSubmitCallback(response) {
    super.onSubmitCallback(response);
    History.goBack();
    this.setContext({ files: [] });
    Collections.get(this.state.profileId).load(CACHE_POLICY.UPDATE);
    Collection.get(this.state.collectionId).load(CACHE_POLICY.UPDATE);
  }

  forceSetContext() {
    return false;
  }

  getSubmitUrl() {
    return `profiles/profiles/${this.state.profileId}/collections/${this.state.collectionId}/edit/`;
  }
}
