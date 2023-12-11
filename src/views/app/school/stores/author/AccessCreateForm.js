import CharField from "../../../../../stores/base/form/fields/CharField";
import Res from "../../../../../assets/Res";
import AccessBaseForm from "./AccessBaseForm";
import Button from "../../../../../stores/base/form/buttons/Button";
import { CACHE_POLICY } from "../../../../../stores/base/RemoteStore";
import Status from "../../../../../utils/requests/Status";
import AuthorCourse from "./AuthorCourse";
import History from "../../../../../History";
import AuthorCourseTeachers from "./AuthorCourseTeachers";
import AuthorCourseStudents from "./AuthorCourseStudents";
export default class AccessCreateForm extends AccessBaseForm {
  static storeName = "AccessCreateForm";

  forceSetContext() {
    return true;
  }

  createButtons(args) {
    return [
      Button.createSubmit({
        title: "افزودن دسترسی",
        className: "raised primary",
        onClick: () => this.submit(),
      }),
      Button.create_back(),
    ];
  }

  getSubmitUrl() {
    return `school/authors/${this.state.authorId}/courses/${this.state.courseId}/accesses/`;
  }

  onSubmitCallback(response) {
    super.onSubmitCallback(response);
    if (Status.isOk(response.status)) {
      this.setContext({});
      AuthorCourse.get(this.state.courseId, this.state).load(
        CACHE_POLICY.UPDATE
      );
      AuthorCourseTeachers.get(this.state.courseId, this.state).load(
        CACHE_POLICY.UPDATE
      );
      AuthorCourseStudents.get(this.state.courseId, this.state).load(
        CACHE_POLICY.UPDATE
      );
      History.goBack();
    }
  }

  getValues() {
    let values = super.getValues();
    return { ...values, commission_rate: (values.commission_rate || 0) / 100 };
  }
  getTitle(args) {
    return "افزودن دسترسی";
  }
}
