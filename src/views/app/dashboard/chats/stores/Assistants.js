import RemoteStore from "../../../../../stores/base/RemoteStore";
import { STORE_TYPE } from "../../../../../stores/base/Store";
export default class Assistants extends RemoteStore {
  static storeName = "Assistants";
  static type = STORE_TYPE.SINGLETON;

  getUrl() {
    return "assistants/assistants/";
  }
}
