import Res from "../../../../../assets/Res";
import DateField from "../../../../../stores/base/form/fields/DateField";
import { GregorianCalendar } from "../../../../../utils/CalendarUtils";
import FilterForm from "../../../../../stores/base/form/FilterForm";
import SwitchField from "../../../../../stores/base/form/fields/SwitchField";
import CharField from "../../../../../stores/base/form/fields/CharField";
import Button from "../../../../../stores/base/form/buttons/Button";
import History from "../../../../../History";
export default class AuthorCourseDiscountTypesFilterForm extends FilterForm {
  static storeName = "AuthorCourseDiscountTypesFilterForm";

  createFields(args) {
    return [
      SwitchField.create({
        name: "active",
        question: "فقط فعال ها",
        isInstant: true,
        required: false,
        className: "half-row-responsive",
      }),
      SwitchField.create({
        name: "is_admin",
        question: "فقط کد های ادمین",
        isInstant: true,
        required: false,
        className: "half-row-responsive",
      }),
      CharField.create({
        name: "q",
        placeholder: "نام، شماره، ایمیل،...",
        isInstant: false,
        required: false,
      }),
    ];
  }
  createButtons(args) {
    return [
      Button.createSubmit({
        onClick: () => this.submit(),
        icon: Res.icon.search,
        className: "flat large primary",
      }),
     
    ];
  }
}
