import Store from "../../../../../stores/base/Store";
import Button from "../../../../../stores/base/form/buttons/Button";
import Requester from "../../../../../utils/requests/Requester";
import Thread from "./Thread";

export default class CallConfirm extends Store {
  static storeName = "CallConfirm";
  getInitialState(args) {
    return {
      ...args,
      confirmButton: Button.createSubmit({
        className: "flat success",
        title: "Yes",
        onClick: () => this.result(true),
      }),

      rejectButton: Button.createSubmit({
        className: "flat danger",
        title: "No",
        onClick: () => this.result(false),
      }),
    };
  }
  result(confirmed) {
    if (confirmed) {
      this.state.confirmButton.set_loading(true);
      this.state.rejectButton.set_active(false);
    } else {
      this.state.rejectButton.set_loading(true);
      this.state.confirmButton.set_active(false);
    }
    let output = confirmed ? "Yes" : "No";
    Requester.request(
      "post",
      `assistants/calls/${this.state.call.id}/submit-output/`,
      { output },
      () => {
        this.state.confirmButton.set_loading(false);
        this.state.rejectButton.set_loading(false);
        this.state.rejectButton.set_active(true);
        this.state.confirmButton.set_active(true);
        this.state.call.output = output;
        this.save();
        Thread.get(this.state.thread).loadNewer(true);
      }
    );
  }
}
