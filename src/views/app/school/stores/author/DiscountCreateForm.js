import CharField from "../../../../../stores/base/form/fields/CharField";
import Res from "../../../../../assets/Res";
import Button from "../../../../../stores/base/form/buttons/Button";
import { CACHE_POLICY } from "../../../../../stores/base/RemoteStore";
import Status from "../../../../../utils/requests/Status";
import AuthorCourse from "./AuthorCourse";
import History from "../../../../../History";
import DiscountBaseForm from "./DiscountBaseForm";
import AuthorCourseDiscountTypes from "./AuthorCourseDiscountTypes";
export default class DiscountCreateForm extends DiscountBaseForm {
  static storeName = "DiscountCreateForm";

  forceSetContext() {
    return true;
  }

  createButtons(args) {
    return [
      Button.createSubmit({
        title: "افزودن تخفیف",
        className: "raised primary",
        onClick: () => this.submit(),
      }),
      Button.create_back(),
    ];
  }

  getSubmitUrl() {
    return `school/authors/${this.state.authorId}/courses/${this.state.courseId}/discounts/`;
  }

  getValues() {
    let values = super.getValues();
    values.commission_percentage = values.commission_percentage / 100;
    values.percentage = values.percentage / 100;
    return values;
  }

  onSubmitCallback(response) {
    super.onSubmitCallback(response);
    if (Status.isOk(response.status)) {
      this.setContext({});
      AuthorCourseDiscountTypes.get(this.state.courseId).load(
        CACHE_POLICY.UPDATE
      );
      History.goBack();
    }
  }

  getTitle(args) {
    return "افزودن تخفیف";
  }
}
