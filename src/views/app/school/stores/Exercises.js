import PaginatedRemoteStore from "../../../../stores/base/PaginatedRemoteStore";
import { STORE_TYPE } from "../../../../stores/base/Store";
export default class Exercises extends PaginatedRemoteStore {
  static storeName = "Exercises";
  static type = STORE_TYPE.SINGLETON;

  getUrl() {
    return `school/exercises/`;
  }
}
