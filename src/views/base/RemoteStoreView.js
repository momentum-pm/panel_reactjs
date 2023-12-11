import React from "react";
import LoadingView from "./refactored/loadingView/LoadingView";
import Status from "../../utils/requests/Status";
import { Redirect } from "react-router";
import NotFoundPage from "./notFound/NotFoundPage";
import StoreView from "./StoreView";
import { CACHE_POLICY, LOADING_STATE } from "../../stores/base/RemoteStore";
import FailedBox from "../base/failedView/FailedBox";
import { get_lang_url } from "../../History";

export default class RemoteStoreView extends StoreView {
  static getRemoteStore(props) {}

  static mapPropsToStores(props) {
    return {
      remoteStore: this.getRemoteStore(props),
    };
  }

  constructor(props) {
    super(props);
    this.getStore = this.getStore.bind(this);
    this.getState = this.getState.bind(this);
    this.getData = this.getData.bind(this);
    this.getError = this.getError.bind(this);
    this.getLoadingState = this.getLoadingState.bind(this);

    this.getLoadingView = this.getLoadingView.bind(this);
    this.getLoadedView = this.getLoadedView.bind(this);
    this.getOkView = this.getOkView.bind(this);
    this.getFailedView = this.getFailedView.bind(this);
  }

  componentDidMount() {
    this.getStore().load(CACHE_POLICY.UPDATE);
  }

  getStore() {
    return this.props.remoteStore;
  }

  getState() {
    return this.getStore().state;
  }

  getData() {
    return this.getState().data;
  }
  getError() {
    return this.getState().error;
  }

  getLoadingState() {
    return this.getState().loadingState;
  }

  render() {
    let loadingState = this.getLoadingState();
    switch (loadingState) {
      case LOADING_STATE.NOT_LOADED:
      case LOADING_STATE.LOADING:
        return this.getLoadingView();
      case LOADING_STATE.LOADED:
      case LOADING_STATE.UPDATING:
        return this.getLoadedView();
      case LOADING_STATE.FAILED:
        return this.getFailedView();
      default:
        break;
    }
  }

  getLoadingView() {
    return <LoadingView />;
  }

  getLoadedView() {
    let state = this.getState();
    if (state.status === Status.FOUND_302) {
      if (state.location.startsWith("http")) {
        window.location = state.location;
        return <p>Redirecting...</p>;
      } else {
        return <Redirect to={get_lang_url(state.location)} />;
      }
    }
    if (state.status === Status.OK_200) {
      return this.getOkView();
    }
    return <div>failed</div>;
  }

  getOkView() {
    throw Error(
      `You should override getOkView in ${this.constructor.name} class`
    );
  }

  getFailedView() {
    let store = this.getStore();
    let status = store.state.status;
    if (status === Status.NOT_FOUND_404) {
      return <NotFoundPage />;
    } else {
      return (
        <FailedBox
          message={store.state.error}
          reload={() => store.load(CACHE_POLICY.IGNORE)}
        />
      );
    }
  }
}
