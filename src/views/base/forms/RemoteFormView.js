import React from "react";
import FormView from "./FormView";
import { CACHE_POLICY, LOADING_STATE } from "../../../stores/base/RemoteStore";
import LoadingView from "../refactored/loadingView/LoadingView";
import Status from "../../../utils/requests/Status";
import { Redirect } from "react-router";
import { get_lang_url } from "../../../History";
import NotFoundPage from "../notFound/NotFoundPage";
import FailedBox from "../failedView/FailedBox";

export default class RemoteFormView extends FormView {
  constructor(props) {
    super(props);
    this.getLoadingState = this.getLoadingState.bind(this);
    this.getLoadingView = this.getLoadingView.bind(this);
    this.getLoadedView = this.getLoadedView.bind(this);
    this.getFailedView = this.getFailedView.bind(this);
  }

  getLoadingState() {
    if (this.getState().remoteStore) {
      return this.getState().loadingState;
    }
  }

  componentDidMount() {
    if (this.getState().remoteStore) {
      this.getState().remoteStore.load(CACHE_POLICY.UPDATE);
    }
  }

  render() {
    if (this.getState().remoteStore) {
      let loadingState = this.getLoadingState();
      let state = this.getState();
      switch (loadingState) {
        case LOADING_STATE.NOT_LOADED:
        case LOADING_STATE.LOADING:
          return this.getLoadingView();
        case LOADING_STATE.LOADED:
        case LOADING_STATE.UPDATING:
          if (state.status === Status.FOUND_302) {
            return <Redirect to={get_lang_url(state.location)} />;
          } else {
            return this.getLoadedView();
          }
        case LOADING_STATE.FAILED:
          return this.getFailedView();
        default:
          break;
      }
    } else {
      return this.getLoadedView();
    }
  }

  getLoadingView() {
    return <LoadingView />;
  }

  getLoadedView() {
    if (this.getState().remoteStore) {
      let state = this.getState();
      if (state.status === Status.FOUND_302) {
        return <Redirect to={get_lang_url(state.location)} />;
      }
      if (state.status === Status.OK_200) {
        return this.getFormView();
      }
      return <div>failed</div>;
    } else {
      return this.getFormView();
    }
  }

  getFormView() {
    return super.render();
  }
  getFailedView() {
    let store = this.getForm().state.remoteStore;
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
