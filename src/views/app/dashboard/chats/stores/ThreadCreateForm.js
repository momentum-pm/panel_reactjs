import Form from "../../../../../stores/base/form/Form";
import Res from "../../../../../assets/Res";
import Threads from "./Threads";
import Button from "../../../../../stores/base/form/buttons/Button";
import History from "../../../../../History";
import { CACHE_POLICY } from "../../../../../stores/base/RemoteStore";
import Status from "../../../../../utils/requests/Status";
import Requester from "../../../../../utils/requests/Requester";
import RemoteSelectField from "../../../../../stores/base/form/fields/RemoteSelectField";
import Assistants from "./Assistants";
export default class ThreadCreateForm extends Form {
  static storeName = "TicketCreateForm";

  getSubmitUrl() {
    return `assistants/threads/`;
  }

  createFields(args) {
    return [
      RemoteSelectField.create({
        name: "assistant",
        label: "Assistant",
        itemToTitle: (item) => item.name,
        itemToValue: (item) => item.id,
        remoteStore: Assistants.get(),
        placeholder: "Select assistant...",
      }),
    ];
  }

  createButtons(args) {
    return [
      Button.createSubmit({
        icon: Res.icon.send,
        title: "Start",
        className: "large  filled-icon primary raised",
        onClick: () => this.submit(),
      }),
      Button.create_back("large flat"),
    ];
  }

  getTitle(args) {
    return "Start a chat";
  }

  forceSetContext() {
    return true;
  }

  submit() {
    this.touch();
    if (this.isValid()) {
      this.getButton("submit").set_loading(true);
      let values = this.getValues();
      Requester.request(
        "post",
        this.getSubmitUrl(),
        {
          ...values,
          member: this.state.member,
        },
        (response) => this.submitCallback(response)
      );
    }
  }

  onSubmitCallback(response) {
    super.onSubmitCallback(response);
    Threads.get().load(CACHE_POLICY.UPDATE);
    this.setContext({});
    if (Status.isOk(response.status)) {
      History.goBack();
    }
  }
}
