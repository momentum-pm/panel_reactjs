import { STORE_TYPE } from "../../../../../stores/base/Store";
import RemoteStore, {
  CACHE_POLICY,
} from "../../../../../stores/base/RemoteStore";
import Button from "../../../../../stores/base/form/buttons/Button";
import Res from "../../../../../assets/Res";
import Requester from "../../../../../utils/requests/Requester";
import MessageQueue from "../../../../../stores/base/MessageQueue";
import Settings from "../../../../../Settings";
import Status from "../../../../../utils/requests/Status";
import History from "../../../../../History";
import App from "../../../../../stores/app/App";

export default class Tickets extends RemoteStore {
  static storeName = "Tickets";
  static type = STORE_TYPE.SINGLETON;

  getInitialState(args) {
    return {
      ...super.getInitialState(args),
      callButton: Button.create_button({
        name: "call",
        icon: Res.icon.call,
        title: Res.string.dashboard.support.make_a_call_button,
        className: "large flat filled-icon primary",
        onClick: () => this.callSubmit(),
      }),
    };
  }

  getUrl() {
    return `support/profiles/${App.getId()}/tickets/`;
  }

  callSubmit() {
    this.state.callButton.set_loading(true);
    Requester.request(
      "post",
      this.getUrl(),
      {
        message: {
          call: { type: "incoming-call" },
          content: null,
          files: [],
        },
        title: Res.string.dashboard.support.incoming_call_default_title,
        important: false,
      },
      (response) => this.callCallback(response)
    );
  }

  callCallback(response) {
    this.state.callButton.set_loading(false);
    MessageQueue.showObject(response.data);
    Tickets.get().load(CACHE_POLICY.UPDATE);
    if (Status.isOk(response.status)) {
      History.push_url(`/dashboard/support/tickets/${response.data.id}/`);
    }
    window.open(`tel:${Settings.TELL}`);
  }
}
