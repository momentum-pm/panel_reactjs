import Store from "./Store";
import Status from "../../utils/requests/Status";
import Requester from "../../utils/requests/Requester";
import RemoteStore from "./RemoteStore";

export default class ProxyRemoteStore extends RemoteStore {
  static storeName = "ProxyRemoteStore";

  getProxy() {
    throw Error(
      "You should override this method and return an instance of a remote store, like: RemoteStore.get(id,{...args});"
    );
  }
  getUrl() {
    return "";
  }
  getSubdirectory() {
    throw Error(
      "You should override this method and return the relative path of data to be taken from this.getProxy() data e.g: 'items' -> this.data = this.getProxy().data.items"
    );
  }
  onCreate() {
    this.onProxyStateChange(this.getProxy());
    this.getProxy().subscribe((remoteStore) =>
      this.onProxyStateChange(remoteStore)
    );
  }

  load(cache_policy) {
    this.getProxy().load(cache_policy);
  }

  onProxyStateChange(remoteStore) {
    let { loadingState, data, status, error, location } = remoteStore.state;
    this.state = {
      ...this.state,
      loadingState,
      data: data[this.getSubdirectory()],
      status,
      error,
      location,
    };
    this.save();
  }
}
