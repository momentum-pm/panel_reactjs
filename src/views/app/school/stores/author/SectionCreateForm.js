import SectionBaseForm from "./SectionBaseForm";
import History from "../../../../../History";
import Status from "../../../../../utils/requests/Status";
import Button from "../../../../../stores/base/form/buttons/Button";
import Res from "../../../../../assets/Res";
import { CACHE_POLICY } from "../../../../../stores/base/RemoteStore";
import AuthorCourse from "./AuthorCourse";

export default class SectionCreateForm extends SectionBaseForm {
  static storeName = "SectionCreateForm";

  forceSetContext() {
    return true;
  }

  createButtons(args) {
    return [
      Button.createSubmit({
        title: Res.string.school.add_section_button,
        className: "raised primary",
        onClick: () => this.submit(),
      }),
      Button.create_back(),
    ];
  }

  getSubmitUrl() {
    return `school/authors/${this.state.authorId}/courses/${this.state.courseId}/sections/`;
  }

  onSubmitCallback(response) {
    super.onSubmitCallback(response);
    if (Status.isOk(response.status)) {
      this.setContext({});
      AuthorCourse.get(this.state.courseId).load(CACHE_POLICY.UPDATE);
      History.goBack();
    }
  }

  getTitle(args) {
    return Res.string.school.add_section_button;
  }
}
