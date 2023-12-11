import Res from "../../../../../assets/Res";
import Button from "../../../../../stores/base/form/buttons/Button";
import { CACHE_POLICY } from "../../../../../stores/base/RemoteStore";
import AdminEpisodeComments from "../../../comments/stores/AdminEpisodeComments";
import Store from "../../../../../stores/base/Store";
import Confirm from "../../../../../stores/base/Confirm";
import Requester from "../../../../../utils/requests/Requester";

export default class EpisodeCommentDelete extends Store {
  static storeName = "EpisodeCommentDelete";
  getInitialState(args) {
    return {
      ...args,
      deleteButton: Button.create_button({
        name: "deleteButton",
        about: "حذف",
        icon: Res.icon.cross,
        className: "flat danger samll",
        onClick: () => {
          Confirm.open(
            "حذف نظر",
            "آیا مایل به حذف این نظر و جواب های آن هستید؟",
            () => this.submitDelete(),
            "حذف نظر",
            "raised danger"
          );
        },
      }),
    };
  }
  submitDelete() {
    this.state.deleteButton.set_loading(true);
    let url = `school/comments/${this.state.id}/delete/`;
    Requester.request("post", url, {}, (response) =>
      this.deleteCallback(response)
    );
  }
  deleteCallback(response) {
    this.state.deleteButton.set_loading(false);
    if (AdminEpisodeComments.exists()) {
      AdminEpisodeComments.get().load(CACHE_POLICY.UPDATE);
    }
  }
}
