import History from "../../../../../History";
import Requester from "../../../../../utils/requests/Requester";
import Confirm from "../../../../../stores/base/Confirm";
import MessageQueue from "../../../../../stores/base/MessageQueue";
import PaginatedRemoteStore from "../../../../../stores/base/PaginatedRemoteStore";
import RemoteStore, {
  CACHE_POLICY,
} from "../../../../../stores/base/RemoteStore";
import { GregorianCalendar } from "../../../../../utils/CalendarUtils";
import AccessEditForm from "./AccessEditForm";
import AuthorCourseInvoiceFilterForm from "./AuthorCourseInvoiceFilterForm";
export default class AuthorCourseTeachers extends RemoteStore {
  static storeName = "AuthorCourseTeachers";

  static getActions() {
    return [...super.getActions(), "deleteItem", "editItem"];
  }
  getUrl() {
    return `school/authors/${this.state.authorId}/courses/${this.state.courseId}/teachers/`;
  }

  deleteItem(item) {
    Confirm.open(
      "حذف دبیر",
      "آیا میخواهید این دبیر را از دوره حذف کنید؟",
      () => {
        Requester.request(
          "post",
          `school/authors/${this.state.authorId}/courses/${this.state.courseId}/accesses/${item.id}/delete/`,
          {},
          (response) => this.onDeleteCallback(response, item)
        );
      },
      "حذف دبیر",
      "raised large danger"
    );
  }

  onDeleteCallback(response, item) {
    MessageQueue.showObject(response.data);
    this.load(CACHE_POLICY.UPDATE);
  }

  editItem(item) {
    let accessId = item.id.toString();
    let { courseId, authorId } = this.state;
    console.log(accessId, "setting context");
    AccessEditForm.get(accessId, { authorId, courseId, accessId }).setContext(
      item
    );

    History.pushMediumModal(
      `/school/authors/${this.state.authorId}/courses/${this.state.courseId}/accesses/${item.id}/edit/`
    );
  }
}
