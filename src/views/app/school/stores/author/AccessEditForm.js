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
export default class AccessEditForm extends AccessBaseForm {
  static storeName = "AccessEditForm";

  forceSetContext() {
    return true;
  }
  setContext(context) {
    context = {
      ...context,
      commission_rate: (context?.commission_rate || 0) * 100,
    };
    console.log("seting context", context);
    super.setContext(context);
  }

  createButtons(args) {
    return [
      Button.createSubmit({
        title: "ویرایش دسترسی",
        className: "raised primary",
        onClick: () => this.submit(),
      }),
      Button.create_back(),
    ];
  }

  getSubmitUrl() {
    return `school/authors/${this.state.authorId}/courses/${this.state.courseId}/accesses/${this.state.accessId}/edit/`;
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
    return "ویرایش دسترسی";
  }
}
