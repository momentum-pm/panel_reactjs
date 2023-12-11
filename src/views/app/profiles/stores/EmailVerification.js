import Form from "../../../../stores/base/form/Form";
import { STORE_TYPE } from "../../../../stores/base/Store";
import CharField from "../../../../stores/base/form/fields/CharField";
import Res from "../../../../assets/Res";
import Button from "../../../../stores/base/form/buttons/Button";
import History from "../../../../History";
import Requester from "../../../../utils/requests/Requester";
import MessageQueue from "../../../../stores/base/MessageQueue";
import Status from "../../../../utils/requests/Status";
import { LOADING_STATE } from "../../../../stores/base/RemoteStore";
import Validators from "../../../../utils/Validators";
import { toLangNumber } from "../../../../utils/StringUtils";
import App from "../../../../stores/app/App";

export default class EmailVerification extends Form {
  static storeName = "EmailVerification";
  static type = STORE_TYPE.SINGLETON;

  getInitialState(args) {
    return {
      ...super.getInitialState(args),
      callback: null,
      loadingState: LOADING_STATE.LOADING,
    };
  }

  static getActions() {
    return [...super.getActions(), "send"];
  }

  createFields(args) {
    return [
      CharField.create({
        name: "code",
        label: Res.string.profiles.code_label,
        placeholder: Res.string.profiles.code_placeholder,
        hint: Res.string.profiles.code_hint_email,
        validators: [Validators.numeric],
      }),
    ];
  }

  createButtons(args) {
    return [
      Button.createSubmit({
        title: Res.string.profiles.verify_button_title,
        className: "raised primary",
        onClick: () => this.submit(),
        icon: Res.icon.check,
      }),
      Button.create_button({
        name: "send",
        title: Res.string.profiles.resend_button_title,
        className: "flat primary",
        onClick: () => this.send(),
      }),
      Button.create_back(),
    ];
  }

  forceSetContext() {
    return true;
  }

  static open(callback) {
    EmailVerification.get().open(callback);
  }

  open(callback) {
    this.state.callback = callback;
    this.state.loadingState = LOADING_STATE.LOADING;
    this.save();
    this.setContext({});
    this.send();
    History.pushSmallModal("/profiles/verify-email/");
  }

  send() {
    this.getButton("send").set_loading(true);
    Requester.request(
      "post",
      `profiles/profiles/${App.getId()}/verification-codes/email/`,
      {},
      (response) => this.sendCallback(response)
    );
  }

  sendCallback(response) {
    this.getButton("send").set_loading(false);
    MessageQueue.showObject(response.data);
    this.state.loadingState = LOADING_STATE.LOADED;
    this.save();
  }

  submit() {
    this.touch();
    if (this.isValid()) {
      this.getButton("submit").set_loading(true);
      let code = this.getValue("code");
      code = toLangNumber(code, "en");
      Requester.request(
        "post",
        `profiles/profiles/${App.getId()}/verification-codes/email/verify/${code}/`,
        {},
        (response) => this.submitCallback(response)
      );
    }
  }

  submitCallback(response) {
    this.getButton("submit").set_loading(false);
    MessageQueue.showObject(response.data);
    if (Status.isOk(response.status)) {
      if (this.state.callback) {
        this.state.callback();
      }
    }
    History.goBack();
  }

  getTitle(args) {
    return Res.string.profiles.email_verification;
  }
}
