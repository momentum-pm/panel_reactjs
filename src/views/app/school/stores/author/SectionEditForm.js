import SectionBaseForm from "./SectionBaseForm";
import Button from "../../../../../stores/base/form/buttons/Button";
import Res from "../../../../../assets/Res";
import Status from "../../../../../utils/requests/Status";
import History from "../../../../../History";
import { CACHE_POLICY } from "../../../../../stores/base/RemoteStore";
import AuthorCourse from "../../stores/author/AuthorCourse";

export default class SectionEditForm extends SectionBaseForm {
  static storeName = "SectionEditForm";

  getRemoteStore(args) {
    return AuthorCourse.get(args.courseId, args);
  }
  mapData(course) {
    return this.findSectionById(course?.sections, this.state?.sectionId);
  }
  findSectionById(sections, sectionId) {
    let section = null;

    sections.forEach((s) => {
      if (!section) {
        if (s.id.toString() === sectionId) {
          section = s;
        }
        let insSubsections = this.findSectionById(s.subsections, sectionId);
        if (insSubsections) {
          section = insSubsections;
        }
      }
    });
    return section;
  }

  getSubmitUrl() {
    return `school/authors/${this.state.authorId}/courses/${this.state.courseId}/sections/${this.state.sectionId}/`;
  }

  createButtons(args) {
    return [
      Button.createSubmit({
        title: Res.string.school.section_edit_button,
        className: "raised primary",
        icon: Res.icon.edit,
        onClick: () => this.submit(),
      }),
      Button.create_back(),
    ];
  }

  onSubmitCallback(response) {
    if (Status.isOk(response.status)) {
      History.goBack();
      AuthorCourse.get(this.state.courseId).load(CACHE_POLICY.UPDATE);
    }
  }

  getTitle(args) {
    return Res.string.school.section_edit_form_title;
  }
}
