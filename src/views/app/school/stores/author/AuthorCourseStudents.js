import Button from "../../../../../stores/base/form/buttons/Button";
import PaginatedRemoteStore from "../../../../../stores/base/PaginatedRemoteStore";
import Res from "../../../../../assets/Res";
import History from "../../../../../History";
import AuthorCourseStudentFilterForm from "./AuthorCourseStudentFilterForm";
import Confirm from "../../../../../stores/base/Confirm";
import Requester from "../../../../../utils/requests/Requester";
import MessageQueue from "../../../../../stores/base/MessageQueue";
import { CACHE_POLICY } from "../../../../../stores/base/RemoteStore";
import AccessEditForm from "./AccessEditForm";
import StudentNumbers from "./StudentNumbers";

export default class AuthorCourseStudents extends PaginatedRemoteStore {
  static storeName = "AuthorCourseStudents";

  static getActions() {
    return [...super.getActions(), "deleteItem", "editItem"];
  }
  getInitialState(args) {
    return {
      ...super.getInitialState(args),
      addStudentButton: Button.create_button({
        name: "addSection",
        onClick: () =>
          History.pushMediumModal(
            `/school/authors/${this.state.authorId}/courses/${this.state.courseId}/accesses/create/student/`
          ),
        title: "ثبت نام",
        icon: Res.icon.add,
        className: "large raised primary ",
      }),
      downloadButton: Button.create_button({
        name: "downloadButton",
        onClick: () => this.download(),
        title: "شماره ها",
        className: "small flat primary ",
      }),
      downloadAllButton: Button.create_button({
        name: "downloadButton",
        onClick: () => this.downloadAll(),
        title: "همه شماره ها",
        className: "small flat primary ",
      }),
    };
  }
  download() {
    this.state.downloadButton.set_loading(true);
    Requester.request(
      "get",
      `school/authors/${this.state.authorId}/courses/${this.state.courseId}/students/download/`,
      {},
      (response) => {
        console.log(response.data);
        this.state.downloadButton.set_loading(false);
        StudentNumbers.get().setNumbers(response.data);
        History.pushSmallModal("/school/numbers/");
      }
    );
  }
  downloadAll() {
    this.state.downloadButton.set_loading(true);
    Requester.request(
      "get",
      `school/students/download-all/`,
      {},
      (response) => {
        console.log(response.data);
        this.state.downloadButton.set_loading(false);
        StudentNumbers.get().setNumbers(response.data);
        History.pushSmallModal("/school/numbers/");
      }
    );
  }
  getFilterForm() {
    return AuthorCourseStudentFilterForm.get(this.id, this.state);
  }
  getAllowedParams() {
    return ["q"];
  }
  getUrl() {
    return `school/authors/${this.state.authorId}/courses/${this.state.courseId}/students/`;
  }

  deleteItem(item) {
    Confirm.open(
      "حذف دانش آموز",
      "آیا میخواهید این دانش آموز را از دوره حذف کنید؟",
      () => {
        Requester.request(
          "post",
          `school/authors/${this.state.authorId}/courses/${this.state.courseId}/accesses/${item.id}/delete/`,
          {},
          (response) => this.onDeleteCallback(response, item)
        );
      },
      "حذف دانش آموز",
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
    AccessEditForm.get(accessId, { authorId, courseId, accessId }).setContext(
      item
    );

    History.pushMediumModal(
      `/school/authors/${this.state.authorId}/courses/${this.state.courseId}/accesses/${item.id}/edit/`
    );
  }
}
