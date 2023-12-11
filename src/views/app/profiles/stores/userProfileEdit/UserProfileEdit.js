import RemoteStore, {
  CACHE_POLICY,
} from "../../../../../stores/base/RemoteStore";
import AddressEditForm from "../AddressEditForm";
import UserProfileVisit from "../UserProfileVisit";
import UserInfoEditForm from "./UserInfoEditForm";
import Button from "../../../../../stores/base/form/buttons/Button";
import Res from "../../../../../assets/Res";
import Requester from "../../../../../utils/requests/Requester";
import Status from "../../../../../utils/requests/Status";
import MessageQueue from "../../../../../stores/base/MessageQueue";
import App from "../../../../../stores/app/App";

export default class UserProfileEdit extends RemoteStore {
  static storeName = "UserProfileEdit";

  getUrl() {
    return `profiles/profiles/${this.state.profileId}/edit/`;
  }

  getInitialState(args) {
    return {
      ...super.getInitialState(args),
      toggleButton: Button.create_button({
        name: "unsubscribeButton",
        icon: Res.icon.cross,
        className: " flat danger",
        onClick: () => this.togglePromotion(),
      }),
    };
  }

  success(data, status) {
    let profileId = this.state.profileId;
    AddressEditForm.get(profileId, { profileId }).setContext(data.address);
    UserInfoEditForm.get(profileId, { profileId }).setContext(data);
    this.state.toggleButton.set_title(
      data.allow_promotions
        ? Res.string.profiles.unsubscribe
        : Res.string.profiles.subscribe
    );
    this.state.toggleButton.setIcon(
      data.allow_promotions ? Res.icon.cross : Res.icon.star
    );
    this.state.toggleButton.setClassName(
      data.allow_promotions ? " flat danger" : " flat primary"
    );
    super.success(data, status);
    this.notifyObjects();
  }

  setAddress(address) {
    this.state.data.address = address;
    this.notifyObjects();
    this.save();
  }

  setSubcategories(subcategories) {
    this.state.data.subcategories = subcategories;
    this.notifyObjects();
    this.save();
  }

  notifyObjects() {
    let profileId = this.state.profileId;
    if (App.getId() === profileId) {
      App.setProfileData(this.state.data);
    }
    UserProfileVisit.get(profileId, { profileId }).load(CACHE_POLICY.UPDATE);
  }

  togglePromotion() {
    this.state.toggleButton.set_loading(true);
    Requester.request(
      "post",
      `profiles/profiles/${this.state.profileId}/promotions/toggle/`,
      {},
      (response) => this.onTogglePromotionCallback(response)
    );
  }

  onTogglePromotionCallback(response) {
    this.state.toggleButton.set_loading(false);
    MessageQueue.showObject(response.data);
    if (Status.isOk(response.status)) {
      this.load(CACHE_POLICY.UPDATE);
    }
  }
}
