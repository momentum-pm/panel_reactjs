import Button from "../../../../../stores/base/form/buttons/Button";
import PaginatedRemoteStore from "../../../../../stores/base/PaginatedRemoteStore";
import Res from "../../../../../assets/Res";
import History from "../../../../../History";
import AuthorCourseDiscountTypesFilterForm from "./AuthorCourseDiscountTypesFilterForm";
export default class AuthorCourseDiscountTypes extends PaginatedRemoteStore {
  static storeName = "AuthorCourseDiscountTypes";

  getInitialState(args) {
    return {
      ...super.getInitialState(args),
    };
  }
  getFilterForm() {
    return AuthorCourseDiscountTypesFilterForm.get(this.id, this.state);
  }
  getAllowedParams() {
    return ["q", "active", "is_admin"];
  }
  getInitialParams(){
    return {
      active:true,
      is_admin:true,
    }
  }
  getUrl() {
    return `school/authors/${this.state.authorId}/courses/${this.state.courseId}/discounts/`;
  }
}
