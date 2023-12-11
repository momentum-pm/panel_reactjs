import History from "../../../../../History";
import Status from "../../../../../utils/requests/Status";
import Button from "../../../../../stores/base/form/buttons/Button";
import Res from "../../../../../assets/Res";
import { CACHE_POLICY } from "../../../../../stores/base/RemoteStore";
import AuthorCourse from "./AuthorCourse";
import RemoteForm from "../../../../../stores/base/form/RemoteForm";
import MultiSelectField from "../../../../../stores/base/form/fields/MultiSelectField";
import CharField from "../../../../../stores/base/form/fields/CharField";
import Validators from "../../../../../utils/Validators";
export default class CourseChildrenCreateForm extends RemoteForm {
  static storeName = "CourseChildrenCreateForm";

  createFields(args) {
    return [
      CharField.create({
        name: "title",
        label: Res.string.school.section_title_label,
        placeholder: Res.string.school.section_title_placeholder,
      }),
      CharField.create({
        name: "slug",
        label: Res.string.school.slug_label,
        placeholder: Res.string.school.slug_placeholder,
        className: "inline-half-row-responsive",
      }),

      CharField.createNumber({
        name: "price",
        label: Res.string.school.price_label,
        placeholder: Res.string.school.price_placeholder,
        validators: [
          Validators.at_last_num(100000000, Res.string.tooman),
          Validators.at_least_num(10000, Res.string.tooman),
        ],
        className: "inline-half-row-responsive",
      }),
      MultiSelectField.create({
        placeholder: "زیرفصل ها",
        name: "sections",
        required: false,
        items: AuthorCourse.get(args.courseId, args).state.data.sections,
        itemToTitle: (item) => item.title,
        itemToValue: (item) => item.id,
        label: "زیرفصل ها",
      }),
    ];
  }
  forceSetContext() {
    return true;
  }

  createButtons(args) {
    return [
      Button.createSubmit({
        title: "افزودن",
        className: "raised primary",
        onClick: () => this.submit(),
      }),
      Button.create_back(),
    ];
  }

  getSubmitUrl() {
    return `school/authors/${this.state.authorId}/courses/${this.state.courseId}/create-children/`;
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
    return "افزودن زیر دوره";
  }
}
