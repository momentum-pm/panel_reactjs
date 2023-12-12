import Store, { STORE_TYPE } from "../../../stores/base/Store";
import Authenticator from "../../../utils/requests/Authenticator";
import Analytics from "../../../utils/Analytics";
import App from "../../../stores/app/App";
import { CACHE_POLICY } from "../../../stores/base/RemoteStore";
import History from "../../../History";
import MessageQueue from "../../../stores/base/MessageQueue";
import Status from "../../../utils/requests/Status";
import Requester from "../../../utils/requests/Requester";
import Register from "./RegisterForm";
import ResetPassword from "./ResetPasswordForm";
export default class Auth extends Store {
  static storeName = "Auth";
  static type = STORE_TYPE.SINGLETON;

  static getActions() {
    return ["goTo", "getLocation", "open", "setCallback"];
  }

  static open(callbackFunction, callbackUrl, reloadApp = true, message = null) {
    Auth.get().open(callbackFunction, callbackUrl, reloadApp, message);
  }

  onCreate() {
    this.state.callbackUrl = "/dashboard/chats/";
    this.state.reloadApp = true;
    this.save();
  }
  getInitialState(args) {
    return {
      callbackUrl: undefined,
      callbackFunction: undefined,
      message: undefined,
    };
  }

  open(callbackFunction, callbackUrl, reloadApp = true, message = null) {
    if (!callbackUrl) {
      callbackUrl = History.location.pathname + History.location.search;
    }
    this.state.callbackFunction = callbackFunction;
    this.state.message = message;
    this.state.reloadApp = reloadApp;
    if (!callbackUrl.startsWith("/auth")) {
      this.state.callbackUrl = callbackUrl;
      History.push("/auth/");
    } else {
      History.replace(`/auth/`);
    }
    this.save();
  }
  setCallback(callbackFunction, callbackUrl, reloadApp = true, message = null) {
    if (!callbackUrl) {
      callbackUrl = History.location.pathname + History.location.search;
    }
    this.state.callbackFunction = callbackFunction;
    this.state.message = message;
    this.state.reloadApp = reloadApp;
    this.state.callbackUrl = callbackUrl;
    this.save();
  }

  goTo(to) {
    History.replace(`/auth/${to}`);
  }

  getLocation() {
    return History.location;
  }

  register(data) {
    Requester.request("post", "auth/register/", data, (response) =>
      this.registerCallback(response, data)
    );
  }

  registerCallback(response, data) {
    if (Status.isOk(response.status)) {
      Analytics.logEvent("auth", "register");
      this.login(data);
    } else {
      MessageQueue.showObject(response._messages[0]);
      Register.get().submitDone(data);
    }
  }

  login(params) {
    Authenticator.login(params, (success) =>
      this.loginCallback(success, params)
    );
  }

  loginCallback(success, params) {
    let { login_type, phone_number } = params;
    if (login_type === "register") {
      Register.get(phone_number, { phone_number }).submitDone();
    } else if (login_type === "reset") {
      ResetPassword.get(phone_number, { phone_number }).submitDone();
    }
    if (success) {
      Analytics.logEvent("auth", "login");
      this.state.listeningToApp = true;
      this.save();
      if (this.state.reloadApp) {
        App.get().load(CACHE_POLICY.IGNORE);
      } else {
        this.callback(true);
      }
    } else {
      this.callback(false);
    }
  }

  callback(success) {
    if (this.state.listeningToApp) {
      this.state.listeningToApp = false;
      this.save();
      if (!this.state.reloadApp) {
        App.get().load(CACHE_POLICY.IGNORE);
      }
      History.replace_url(this.state.callbackUrl);

      if (this.state.callbackFunction) {
        this.state.callbackFunction(success);
      }
    }
  }
  resend({ phone_number }, callback) {
    Requester.request("post", "auth/resend/", { phone_number }, (response) => {
      MessageQueue.showObject(response.data);
      callback();
    });
  }
}
