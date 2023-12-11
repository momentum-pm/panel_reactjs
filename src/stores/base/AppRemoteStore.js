import Status from "../../utils/requests/Status";
import RemoteStore from "./RemoteStore";

export default class AppRemoteStore extends RemoteStore {
  static storeName = "AppRemoteStore";

  static getActions() {
    return [...super.getActions(), "setData"];
  }

  onCreate() {}

  load() {}

  setData(data) {
    this.success(data, Status.OK_200);
  }
}
