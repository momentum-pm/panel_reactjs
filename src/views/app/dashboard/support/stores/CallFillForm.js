import Requester from "../../../../../utils/requests/Requester";
import MessageQueue from "../../../../../stores/base/MessageQueue";
import RemoteStore, {
  CACHE_POLICY,
} from "../../../../../stores/base/RemoteStore";
import Button from "../../../../../stores/base/form/buttons/Button";
import Res from "../../../../../assets/Res";
import Ticket from "./Ticket";
import Status from "../../../../../utils/requests/Status";

export default class CallFillForm extends RemoteStore {
  static storeName = "CallFillForm";

  getInitialState(args) {
    return {
      ...args,
      successButton: Button.create_button({
        name: "successButton",
        icon: Res.icon.like.linear,
        className: "flat success low-margin",
        onClick: () => this.fill(true),
      }),
      failedButton: Button.create_button({
        name: "failedButton",
        icon: Res.icon.dislike.linear,
        className: "flat danger low-margin",
        onClick: () => this.fill(false),
      }),
    };
  }

  fill(success) {
    if (success) {
      this.state.failedButton.set_active(false);
      this.state.successButton.set_loading(true);
    } else {
      this.state.successButton.set_active(false);
      this.state.failedButton.set_loading(true);
    }
    Requester.request(
      "post",
      `support/calls/${this.state.call.id}/fill/`,
      { success },
      (response) => this.onFillCallback(response, success)
    );
  }

  onFillCallback(response, success) {
    if (Status.isOk(response.status)) {
      this.state.call.filled = true;
      this.state.call.success = success;
      this.save();
    }
    if (success) {
      this.state.failedButton.set_active(true);
      this.state.successButton.set_loading(false);
    } else {
      this.state.successButton.set_active(true);
      this.state.failedButton.set_loading(false);
    }
    MessageQueue.showObject(response.data);
    let ticketId = this.state.ticketId;
    Ticket.get(ticketId, { ticketId }).load(CACHE_POLICY.UPDATE);
  }
}
