import RemoteStore, {
  CACHE_POLICY,
} from "../../../../../stores/base/RemoteStore";
import Button from "../../../../../stores/base/form/buttons/Button";
import Res from "../../../../../assets/Res";
import History from "../../../../../History";
import Confirm from "../../../../../stores/base/Confirm";
import Requester from "../../../../../utils/requests/Requester";
import MessageQueue from "../../../../../stores/base/MessageQueue";
import Collections from "./Collections";
import SingleSamples from "./SingleSamples";
import Collection from "./Collection";

export default class Samples extends RemoteStore {
  static storeName = "Samples";

  getInitialState(args) {
    return {
      ...super.getInitialState(args),
      newSampleButton: Button.create_button({
        name: "newSampleButton",
        title: Res.string.profiles.samples.new_sample_button,
        icon: Res.icon.add,
        className: "bordered primary square",
        onClick: () =>
          History.pushMediumModal(
            `/profiles/profiles/${args.profileId}/samples/create/`
          ),
      }),
      newCollectionButton: Button.create_button({
        name: "newCollectionButton",
        title: Res.string.profiles.samples.new_collection_button,
        icon: Res.icon.add,
        className: "bordered success square",
        onClick: () =>
          History.pushMediumModal(
            `/profiles/profiles/${args.profileId}/collections/create/`
          ),
      }),
    };
  }

  getUrl() {
    return `profiles/profiles/${this.state.profileId}/samples/`;
  }

  success(data, status) {
    data = data.map((sample) => {
      let sampleId = sample.id;
      return {
        ...sample,
        deleteButton: Button.create_button({
          name: `edit-sample-${sampleId}`,
          icon: Res.icon.cross,
          onClick: () => this.delete(sampleId),
          className: "flat danger",
        }),
      };
    });
    super.success(data, status);
  }

  delete(sampleId, collectionId) {
    Confirm.open(
      Res.string.profiles.samples.delete_sample,
      Res.string.profiles.samples.delete_sample_text,
      () => this.submitDelete(sampleId, collectionId),
      Res.string.yes,
      "raised danger"
    );
  }

  submitDelete(sampleId, collectionId) {
    Requester.request(
      "post",
      `profiles/profiles/${this.state.profileId}/samples/${sampleId}/delete/`,
      {},
      (response) => this.onDeleteCallback(response, collectionId)
    );
  }

  onDeleteCallback(response, collectionId) {
    MessageQueue.showObject(response.data);
    let profileId = this.state.profileId;
    if (collectionId) {
      Collections.get(profileId, { profileId }).load(CACHE_POLICY.UPDATE);
      Collection.get(collectionId, { collectionId, profileId }).load(
        CACHE_POLICY.UPDATE
      );
    } else {
      SingleSamples.get(profileId, { profileId }).load(CACHE_POLICY.UPDATE);
    }
  }
}
