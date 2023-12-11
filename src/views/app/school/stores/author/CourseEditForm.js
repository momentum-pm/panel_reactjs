import CourseBaseForm from "./CourseBaseForm";
import Status from "../../../../../utils/requests/Status";
import History from "../../../../../History";
import Button from "../../../../../stores/base/form/buttons/Button";
import Res from "../../../../../assets/Res";
import AuthorCourse from "./AuthorCourse";
import { CACHE_POLICY } from "../../../../../stores/base/RemoteStore";

export default class CourseEditForm extends CourseBaseForm {
  static storeName = "CourseEditForm";

  getRemoteStore(args) {
    return AuthorCourse.get(args.courseId, args);
  }
  getSubmitUrl() {
    return `school/authors/${this.state.authorId}/courses/${this.state.courseId}/`;
  }

  createButtons(args) {
    return [
      Button.createSubmit({
        title: "ویرایش",
        onClick: () => this.submit(),
        className: "raised large primary ",
        icon: Res.icon.edit,
      }),
    ];
  }

  submitCallback(response) {
    super.submitCallback(response);
    if (Status.isOk(response.status)) {
      AuthorCourse.get(this.state.courseId).load(CACHE_POLICY.UPDATE);
    }
  }
}
