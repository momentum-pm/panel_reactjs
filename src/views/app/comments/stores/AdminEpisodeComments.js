import PaginatedRemoteStore from "../../../../stores/base/PaginatedRemoteStore";
import { STORE_TYPE } from "../../../../stores/base/Store";
export default class AdminEpisodeComments extends PaginatedRemoteStore {
  static storeName = "AdminEpisodeComments";
  static type = STORE_TYPE.SINGLETON;

  getUrl() {
    return `school/comments/`;
  }
}
