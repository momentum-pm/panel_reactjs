import axios from "axios";
import { absolute } from "./URL";
import Settings from "../../Settings";
import Storage, { Keys } from "../Storage";
import { stringsFa } from "../../assets/string/strings/strings-fa";
import { stringsEn } from "../../assets/string/strings/strings-en";
import Status from "./Status";
import { toLangNumber } from "../StringUtils";
import MessageQueue from "../../stores/base/MessageQueue";
import History from "../../History";

export default class Authenticator {
  static checkRefreshToken(callback) {
    if (this.hasToken()) {
      callback();
    } else {
      callback();
    }
  }

  static hasToken() {
    return this.token && this.token.access_token && this.token.refresh_token;
  }

  static hasOtt() {
    return this.ott;
  }

  static getFreshToken(callback) {
    this.token = Storage.getJSON(Keys.token, undefined);

    this.ott = Storage.get(Keys.ott, undefined);
    if (this.hasOtt()) {
      this.getFreshTokenByConverting(callback);
    } else if (this.hasToken()) {
      callback(true);
    } else {
      callback(false);
    }
  }

  static getFreshTokenByRefreshing(callback) {
    this.refreshToken((success) => callback(success), false);
  }

  static getFreshTokenByConverting(callback) {
    this.convertToken((success) => {
      if (success) {
        callback(true);
      } else {
        if (this.hasToken()) {
          this.getFreshTokenByRefreshing(callback);
        } else {
          callback(false);
        }
      }
    }, false);
  }

  static getAuthorization() {
    if (this.hasToken()) {
      return `${this.token.access_token}`;
    } else {
      return "";
    }
  }

  static handleAuthenticationFailure(callback, loginRequired) {
    if (this.hasOtt()) {
      this.convertToken(callback, loginRequired);
    } else if (this.hasToken()) {
      this.refreshToken(callback, loginRequired);
    } else {
      this.refreshTokenCallback(undefined, callback, loginRequired);
    }
  }

  static login({ username, password }, callback) {
    let url = absolute("auth/login/");
    let data = {
      username,
      password,
    };
    let configs = {
      headers: {
        "content-type": "application/json",
      },
    };
    axios
      .post(url, data, configs)
      .then((result) => {
        this.loginCallback(true, result, callback);
      })
      .catch((error) => {
        this.loginCallback(false, error, callback);
      });
  }

  static loginCallback(success, result, callback) {
    console.log(
      "LOGIN SUCCESSS_-----------------------------------------------------------------------"
    );
    console.log(result);
    if (success) {
      Storage.putJSON(Keys.token, result.data);
      this.token = result.data;
      callback(true);
    } else {
      if (!result.hasOwnProperty("response")) {
        throw result;
      }
      let response = result.response;
      if (!response) {
        response = {
          status: Status.NO_INTERNET,
          data: {
            text_en: stringsEn.connection_failed,
            text_fa: stringsFa.connection_failed,
          },
        };
      }
      MessageQueue.showObject(response.data);

      callback(false, response);
    }
  }

  static refreshToken(callback, loginRequired) {
    let url = absolute("auth/refresh-token/");
    let data = {
      client_id: Settings.CLIENT_ID,
      client_secret: Settings.CLIENT_SECRET,
      grant_type: "refresh_token",
      refresh_token: this.token.refresh_token,
    };
    let configs = {
      headers: {
        "content-type": "application/json",
      },
    };
    axios
      .post(url, data, configs)
      .then((result) =>
        this.refreshTokenCallback(result.data, callback, loginRequired)
      )
      .catch(() =>
        this.refreshTokenCallback(undefined, callback, loginRequired)
      );
  }

  static refreshTokenCallback(token, callback, loginRequired) {
    if (token) {
      Storage.putJSON(Keys.token, token);
      this.token = token;
      callback(true);
    } else {
      Storage.remove(Keys.token);
      this.token = undefined;
      if (loginRequired) {
        Settings.LOGIN_REDIRECT(
          callback,
          History.location.pathname + History.location.search
        );
      } else {
        callback(false);
      }
    }
  }

  static convertToken(callback, loginRequired) {
    let url = absolute("auth/convert-token/");
    let data = {
      token: this.ott,
    };
    let configs = {
      headers: {
        "content-type": "application/json",
      },
    };
    axios
      .post(url, data, configs)
      .then((result) =>
        this.convertTokenCallback(result.data, callback, loginRequired)
      )
      .catch(() =>
        this.convertTokenCallback(undefined, callback, loginRequired)
      );
  }

  static convertTokenCallback(token, callback, loginRequired) {
    if (token) {
      Storage.putJSON(Keys.token, token);
      this.token = token;
      callback(true);
    } else {
      Storage.remove(Keys.ott);
      this.token = undefined;
      if (loginRequired) {
        Settings.LOGIN_REDIRECT(callback);
      } else {
        callback(false);
      }
    }
  }

  static logout(callback) {
    let url = absolute("auth/logout/");
    let data = {
      client_id: Settings.CLIENT_ID,
      client_secret: Settings.CLIENT_SECRET,
      token: this.token.access_token,
    };
    let configs = {
      headers: {
        "content-type": "application/json",
      },
    };
    Storage.remove(Keys.token);
    this.token = null;
    axios
      .post(url, data, configs)
      .then(() => {
        callback();
      })
      .catch(() => {
        callback();
      });
  }
}
