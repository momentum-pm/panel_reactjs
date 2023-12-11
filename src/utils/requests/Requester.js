import axios from "axios";
import { absolute } from "./URL";
import Status from "./Status";
import Authenticator from "./Authenticator";
import { stringsEn } from "../../assets/string/strings/strings-en";
import { stringsFa } from "../../assets/string/strings/strings-fa";
import BugReporter from "./BugReporter";

export class Request {
  static nextId = 1;

  static getNextId() {
    return this.nextId++;
  }

  constructor(method, url, params, callback, contentType, loginRequired) {
    this.id = Request.getNextId();
    this.method = method;
    this.url = url;
    this.params = params;
    this.callback = (response) => callback(response);
    this.contentType = contentType;
    this.loginRequired = loginRequired;
  }
}

export default class Requester {
  static init() {
    if (!this.initialized) {
      this.queue = [];
      this.busy = false;
      this.initialized = true;
    }
  }

  static request(
    method,
    url,
    params,
    callback,
    contentType = "application/json",
    loginRequired = true
  ) {
    let request = new Request(
      method,
      url,
      params,
      callback,
      contentType,
      loginRequired
    );
    this.queue.push(request);
    this.runScheduler();
  }

  static runScheduler() {
    if (!this.busy && this.queue.length > 0) {
      let nextRequest = this.queue[0];
      this.busy = true;
      this.serve(nextRequest);
    }
  }

  /**
   * @param {Request} request
   */
  static serve(request) {
    Authenticator.checkRefreshToken(() => this.serveForSure(request));
  }

  static serveForSure(request) {
    let absoluteUrl = absolute(request.url);
    let configs = {
      headers: {
        "content-type": request.contentType,
        authorization: Authenticator.getAuthorization(),
      },
    };
    if (request.method === "get") {
      configs.params = request.params;
      axios
        .get(absoluteUrl, configs)
        .then((response) => this.requestCallback(request, response))
        .catch((error) => this.requestFailure(request, error));
    }
    if (request.method === "post") {
      axios
        .post(absoluteUrl, request.params, configs)
        .then((response) => this.requestCallback(request, response))
        .catch((error) => this.requestFailure(request, error));
    }
  }

  static requestCallback(request, response) {
    request.callback(response);
    this.queue = this.queue.filter((item) => item.id !== request.id);
    this.busy = false;
    this.runScheduler();
  }

  static requestFailure(request, error) {
    if (!error.hasOwnProperty("response")) {
      throw error;
    }
    let response = error.response;
    if (!response) {
      response = {
        status: Status.NO_INTERNET,
        data: {
          text_en: stringsEn.connection_failed,
          text_fa: stringsFa.connection_failed,
        },
      };
    }
    if (Status.isAuthenticationError(response.status)) {
      this.busy = false;
      this.queue = this.queue.filter((item) => item.id !== request.id);
      //   this.queue.push(request);
      Authenticator.handleAuthenticationFailure(
        (success) =>
          this.authenticationFailureHandled(success, request, response),
        request.loginRequired
      );
    } else {
      response = this.checkForBug(request, response);
      this.requestCallback(request, response);
    }
  }

  static checkForBug(request, response) {
    let toReturn = response;
    if (response.status === 500) {
      toReturn = {
        status: response.status,
        data: {
          text_en: stringsEn.server_error,
          text_fa: stringsFa.server_error,
        },
      };
    }
    if (
      !response.data ||
      !response.data.hasOwnProperty("text_fa") ||
      !response.data.hasOwnProperty("text_en")
    ) {
      toReturn = {
        status: response.status,
        data: {
          text_en: stringsEn.server_error,
          text_fa: stringsFa.server_error,
          ...(response.data || {}),
        },
      };
    }
    BugReporter.reportServerError(request, response);
    return toReturn;
  }

  static authenticationFailureHandled(success, request, response) {}
}
Requester.init();
