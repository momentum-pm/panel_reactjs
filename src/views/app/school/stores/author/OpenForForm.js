import SectionBaseForm from "./SectionBaseForm";
import History from "../../../../../History";
import Status from "../../../../../utils/requests/Status";
import Button from "../../../../../stores/base/form/buttons/Button";
import CharField from "../../../../../stores/base/form/fields/CharField";

export default class OpenForForm extends SectionBaseForm {
  static storeName = "OpenForForm";

  forceSetContext() {
    return true;
  }

  createFields(args) {
    return [
      CharField.create({
        name: "username",
        label: "پروفایل",
        placeholder: "شماره موبایل یا ایمیل...",
      }),
    ];
  }

  createButtons(args) {
    return [
      Button.createSubmit({
        title: "ثبت دسترسی",
        className: "raised primary",
        onClick: () => this.submit(),
      }),
      Button.create_back(),
    ];
  }

  getSubmitUrl() {
    return `school/authors/${this.state.authorId}/courses/${this.state.courseId}/open-for/`;
  }

  onSubmitCallback(response) {
    super.onSubmitCallback(response);
    if (Status.isOk(response.status)) {
      this.setContext({});
      History.goBack();
    }
  }

  getTitle(args) {
    return "ثبت نام دستی";
  }
}
