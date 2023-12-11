import Form from "./Form";
import { CACHE_POLICY, LOADING_STATE } from "../RemoteStore";
import Status from "../../../utils/requests/Status";

export default class RemoteForm extends Form {
  static storeName = "RemoteForm";

  getInitialState(args) {
    let superInitialState = super.getInitialState(args);
    let remoteStore = this.getRemoteStore(args);
    if (remoteStore !== undefined) {
      remoteStore.subscribe(() => this.onRemoteStoreChange());
    } else {
      remoteStore = {
        state: {
          loadingState: LOADING_STATE.LOADED,
          status: Status.OK_200,
          error: undefined,
          location: undefined,
          context: undefined,
        },
        load: () => {},
      };
    }

    return {
      ...superInitialState,
      remoteStore,
      loadingState: remoteStore.state.loadingState,
      status: remoteStore.state.status,
      error: remoteStore.state.error,
      location: remoteStore.state.location,
      context: this.mapData(remoteStore.state.data),
    };
  }

  getRemoteStore(args) {
    return undefined;
  }

  onCreate() {
    this.state.remoteStore.load(CACHE_POLICY.UPDATE);
  }

  onRemoteStoreChange() {
    let remoteStore = this.state.remoteStore;
    this.state.loadingState = remoteStore.state.loadingState;
    this.state.error = remoteStore.state.error;
    this.state.status = remoteStore.state.status;
    this.state.location = remoteStore.state.location;
    this.setContext(this.mapData(remoteStore.state.data));
  }
  mapData(remoteData) {
    return remoteData;
  }
}
