import { STORE_TYPE } from "../../../../../stores/base/Store";
import Form from "../../../../../stores/base/form/Form";
import Res from "../../../../../assets/Res";
import Validators from "../../../../../utils/Validators";
import MultiFileField, {
  ALL_FORMATS,
  SIZE,
} from "../../../../../stores/base/form/fields/MultiFileField";
import Button from "../../../../../stores/base/form/buttons/Button";
import History from "../../../../../History";
import Tickets from "./Tickets";
import { CACHE_POLICY } from "../../../../../stores/base/RemoteStore";
import Status from "../../../../../utils/requests/Status";
import RichTextField from "../../../../../stores/base/form/fields/RichTextField";
import SwitchField from "../../../../../stores/base/form/fields/SwitchField";
import CharField from "../../../../../stores/base/form/fields/CharField";
import Requester from "../../../../../utils/requests/Requester";
import App from "../../../../../stores/app/App";

export default class TicketCreateForm extends Form {
  static storeName = "TicketCreateForm";
  static type = STORE_TYPE.SINGLETON;

  getSubmitUrl() {
    return `support/profiles/${App.getId()}/tickets/`;
  }

  createFields(args) {
    return [
      CharField.create({
        name: "title",
        placeholder: Res.string.dashboard.support.title_placeholder,
      }),
      RichTextField.create({
        name: "content",
        rows: 2,
        className: "inline-half-row-responsive",
        minimalToolbar: true,
        placeholder: Res.string.dashboard.support.content_placeholder,
      }),
      MultiFileField.create({
        name: "files",
        required: false,
        className: "compact-form inline-half-row-responsive",
        label: Res.string.dashboard.support.file_label,
        placeholder: Res.string.dashboard.support.file_placeholder,
        validators: [Validators.at_last(5, Res.string.files)],
        file_validators: [
          Validators.file_max_size(SIZE.MB(2)),
          Validators.file_format(ALL_FORMATS),
        ],
      }),
      SwitchField.create({
        name: "important",
        required: false,
        className: "compact-form",
        question: Res.string.dashboard.support.mark_as_important,
      }),
    ];
  }

  createButtons(args) {
    return [
      Button.createSubmit({
        icon: Res.icon.send,
        title: Res.string.dashboard.support.submit_ticket,
        className: "large flat filled-icon success background",
        onClick: () => this.submit(),
      }),
      Button.create_back("large flat"),
    ];
  }

  getTitle(args) {
    return Res.string.dashboard.support.create_ticket;
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
          title: values.title,
          important: values.important,
          message: {
            content: values.content,
            files: values.files,
          },
        },
        (response) => this.submitCallback(response)
      );
    } else {
      this.scrollToFirstErrorField();
    }
  }

  onSubmitCallback(response) {
    super.onSubmitCallback(response);
    Tickets.get().load(CACHE_POLICY.UPDATE);
    this.setContext({});
    if (Status.isOk(response.status)) {
      History.replace_url(`/dashboard/support/tickets/${response.data.id}/`);
    }
  }
}
