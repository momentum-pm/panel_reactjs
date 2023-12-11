import PaginatedRemoteStore from "../../../../stores/base/PaginatedRemoteStore";
import { STORE_TYPE } from "../../../../stores/base/Store";
export default class AdminBlogComments extends PaginatedRemoteStore {
  static storeName = "AdminBlogComments";
  static type = STORE_TYPE.SINGLETON;

  getUrl() {
    return `blog/comments/`;
  }
}
