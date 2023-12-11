import axios from "axios";
import { absolute } from "./URL";
import Authenticator from "./Authenticator";
import Analytics from "../Analytics";

export default class BugReporter {
  static reportServerError(request, response) {
    if (response.status !== 402) {
      this.reportError(
        {
          url: request.url,
          method: request.method,
          params: request.params,
          status: response.status,
          response: response.data,
        },
        "maintenance/server-errors/"
      );
    }
  }

  static reportReactjsError(error, info, location) {
    let message = "";
    if (error && error.message) {
      message = error.message;
    }
    this.reportError(
      { location, message, info },
      "maintenance/reactjs-errors/"
    );
  }

  static reportError(data, url) {
    // Analytics.errorOccurred(data);
    // let absoluteUrl = absolute(url + 'authenticated-report/');
    // let configs = {
    // 	headers: {
    // 		'content-type': 'application/json',
    // 		'authorization': Authenticator.getAuthorization(),
    // 	}
    // };
    // axios.post(absoluteUrl, data, configs)
    // 	.then(() => {
    // 	})
    // 	.catch(() => this.reportUnAuthenticatedError(data, url));
  }

  static reportUnAuthenticatedError(data, url) {
    let absoluteUrl = absolute(url + "unauthenticated-report/");
    let configs = {
      headers: {
        "content-type": "application/json",
      },
    };
    axios
      .post(absoluteUrl, data, configs)
      .then(() => {})
      .catch(() => {});
  }
}
