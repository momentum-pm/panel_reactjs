import Store from "./Store";
import Status from "../../utils/requests/Status";
import Requester from "../../utils/requests/Requester";

export const CACHE_POLICY = {
  /**
   * @this REUSE this policy will reuse any loaded data in the past
   * @this UPDATE this policy will reuse any loaded data in the past, but silently tries to update the data
   * @this IGNORE this policy ignores any loaded data in the past
   * **/
  REUSE: "reuse",
  UPDATE: "update",
  IGNORE: "ignore",
};
export const LOADING_STATE = {
  NOT_LOADED: "not_loaded",
  LOADING: "loading",
  UPDATING: "updating",
  FAILED: "failed",
  LOADED: "loaded",
};
export default class RemoteStore extends Store {
  static storeName = "RemoteStore";

  static getActions() {
    return ["load", "redirect"];
  }

  getInitialState(args) {
    return {
      loadingState: LOADING_STATE.NOT_LOADED,
      data: undefined,
      status: undefined,
      error: undefined,
      location: undefined,
      title: this.getTitle(args),
      ...args,
    };
  }

  onCreate() {
    this.load(CACHE_POLICY.IGNORE);
  }

  load(cache_policy = CACHE_POLICY.IGNORE) {
    let shouldRequest, newLoadingState;
    let loadingState = this.state.loadingState;
    switch (loadingState) {
      case LOADING_STATE.NOT_LOADED:
      case LOADING_STATE.FAILED:
        shouldRequest = true;
        newLoadingState = LOADING_STATE.LOADING;
        break;
      case LOADING_STATE.LOADING:
        shouldRequest = false;
        newLoadingState = LOADING_STATE.LOADING;
        break;
      case LOADING_STATE.UPDATING:
        shouldRequest = false;
        switch (cache_policy) {
          case CACHE_POLICY.REUSE:
          case CACHE_POLICY.UPDATE:
            newLoadingState = LOADING_STATE.UPDATING;
            break;
          case CACHE_POLICY.IGNORE:
            newLoadingState = LOADING_STATE.LOADING;
            break;
          default:
            return;
        }
        break;
      case LOADING_STATE.LOADED:
        switch (cache_policy) {
          case CACHE_POLICY.REUSE:
            shouldRequest = false;
            newLoadingState = LOADING_STATE.LOADED;
            break;
          case CACHE_POLICY.UPDATE:
            shouldRequest = true;
            newLoadingState = LOADING_STATE.UPDATING;
            break;
          case CACHE_POLICY.IGNORE:
            shouldRequest = true;
            newLoadingState = LOADING_STATE.LOADING;
            break;
          default:
            return;
        }
        break;
      default:
        return;
    }
    this.state.loadingState = newLoadingState;
    this.save();
    if (shouldRequest) {
      let callback = (response) => {
        if (Status.isOk(response.status)) {
          this.success(response.data, response.status);
        } else if (Status.isRedirect(response.status)) {
          this.redirect(response.location, response.status);
        } else {
          this.failure(response.data, response.status);
        }
      };
      Requester.request(
        this.getMethod(),
        this.getUrl(),
        this.getParams(),
        callback,
        "application/json",
        this.getLoginRequired()
      );
    }
  }

  success(data, status) {
    this.state.loadingState = LOADING_STATE.LOADED;
    this.state.data = data;
    this.state.status = status;
    this.save();
  }

  failure(error, status) {
    if (this.state.loadingState === LOADING_STATE.UPDATING) {
      this.state.loadingState = LOADING_STATE.LOADED;
    }
    if (this.state.loadingState === LOADING_STATE.LOADING) {
      this.state.loadingState = LOADING_STATE.FAILED;
      this.state.error = error;
      this.state.data = error;
      this.state.status = status;
    }
    this.save();
  }

  redirect(location, status) {
    this.state.loadingState = LOADING_STATE.LOADED;
    this.state.location = location;
    this.state.status = status;
    this.save();
  }

  getUrl() {
    throw Error(`You should override static getUrl method in ${this.name}`);
  }

  getMethod() {
    return "get";
  }

  getParams() {
    return {};
  }

  getLoginRequired() {
    return true;
  }

  getTitle() {
    return undefined;
  }
}
