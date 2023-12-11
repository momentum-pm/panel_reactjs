import CourseBaseForm from "./CourseBaseForm";
import Status from "../../../../../utils/requests/Status";
import History from "../../../../../History";
import Button from "../../../../../stores/base/form/buttons/Button";
import Res from "../../../../../assets/Res";
import AuthorCourses from "./AuthorCourses";
import { CACHE_POLICY } from "../../../../../stores/base/RemoteStore";

export default class CourseCreateForm extends CourseBaseForm {
  static storeName = "CourseCreateForm";

  getSubmitUrl() {
    return `school/authors/${this.state.authorId}/courses/`;
  }

  forceSetContext() {
    return true;
  }

  createButtons(args) {
    return [
      Button.createSubmit({
        title: Res.string.school.create_button_title,
        onClick: () => this.submit(),
        className: "raised primary large",
        icon: Res.icon.add,
      }),
    ];
  }

  submitCallback(response) {
    super.submitCallback(response);
    if (Status.isOk(response.status)) {
      this.setContext({});
      History.replace_url(`/school/authors/${this.state.authorId}/courses/`);
      AuthorCourses.get().load(CACHE_POLICY.UPDATE);
    }
  }
}
