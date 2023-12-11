import PaginatedRemoteStore from "../../../../stores/base/PaginatedRemoteStore";
import { STORE_TYPE } from "../../../../stores/base/Store";
export default class AdminCourseComments extends PaginatedRemoteStore {
  static storeName = "AdminCourseComments";
  static type = STORE_TYPE.SINGLETON;

  getUrl() {
    return `school/course-comments/`;
  }
}
