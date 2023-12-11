import Form from "../../../../../stores/base/form/Form";
import Res from "../../../../../assets/Res";
import Button from "../../../../../stores/base/form/buttons/Button";
import { CACHE_POLICY } from "../../../../../stores/base/RemoteStore";
import Ticket from "./Ticket";
import RichTextField from "../../../../../stores/base/form/fields/RichTextField";
import MultiFileField, {
  ALL_FORMATS,
  SIZE,
} from "../../../../../stores/base/form/fields/MultiFileField";
import Validators from "../../../../../utils/Validators";
import Settings from "../../../../../Settings";
import MessageQueue from "../../../../../stores/base/MessageQueue";
import Requester from "../../../../../utils/requests/Requester";
import App from "../../../../../stores/app/App";

export default class SupportMessageForm extends Form {
  static storeName = "SupportMessageForm";

  getSubmitUrl() {
    return `support/profiles/${App.getId()}/tickets/${
      this.state.ticketId
    }/messages/`;
  }

  createFields(args) {
    return [
      RichTextField.create({
        name: "content",
        rows: 3,
        validators: [Validators.at_least(5, Res.string.characters, false)],
        minimalToolbar: true,
        placeholder: Res.string.dashboard.support.content_placeholder,
      }),
      MultiFileField.create({
        name: "files",
        required: false,
        className: "compact-form",
        label: Res.string.dashboard.support.file_label,
        placeholder: Res.string.dashboard.support.file_placeholder,
        validators: [Validators.at_last(5, Res.string.files)],
        file_validators: [
          Validators.file_max_size(SIZE.MB(2)),
          Validators.file_format(ALL_FORMATS),
        ],
      }),
    ];
  }

  getTitle(args) {
    return Res.string.dashboard.support.create_message;
  }

  createButtons(args) {
    return [
      Button.createSubmit({
        icon: Res.icon.send,
        title: Res.string.dashboard.support.submit_ticket,
        className: "large flat  success center background",
        onClick: () => this.submit(),
      }),
      Button.create_button({
        name: "call",
        icon: Res.icon.call,
        title: Res.string.dashboard.support.make_a_call_button,
        className: "large flat primary",
        onClick: () => this.callSubmit(),
      }),
    ];
  }

  forceSetContext() {
    return true;
  }

  onSubmitCallback(response) {
    super.onSubmitCallback(response);
    let ticketId = this.state.ticketId;
    Ticket.get(ticketId, { ticketId }).load(CACHE_POLICY.UPDATE);
    Ticket.get(ticketId, { ticketId }).setClosed();
    this.setContext({
      files: [],
      content: '<p class="ql-direction-rtl ql-align-right"><br></p>',
    });
  }

  callSubmit() {
    this.getButton("call").set_loading(true);
    Requester.request(
      "post",
      this.getSubmitUrl(),
      {
        call: { type: "incoming-call" },
        content: null,
        files: [],
      },
      (response) => this.callCallback(response)
    );
  }

  callCallback(response) {
    this.getButton("call").set_loading(false);
    MessageQueue.showObject(response.data);
    this.onSubmitCallback(response);
    let ticketId = this.state.ticketId;
    Ticket.get(ticketId, { ticketId }).load(CACHE_POLICY.UPDATE);
    window.open(`tel:${Settings.TELL}`);
  }
}
