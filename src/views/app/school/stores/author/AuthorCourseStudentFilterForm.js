import Res from "../../../../../assets/Res";
import DateField from "../../../../../stores/base/form/fields/DateField";
import { GregorianCalendar } from "../../../../../utils/CalendarUtils";
import FilterForm from "../../../../../stores/base/form/FilterForm";
import SwitchField from "../../../../../stores/base/form/fields/SwitchField";
import CharField from "../../../../../stores/base/form/fields/CharField";
import Button from "../../../../../stores/base/form/buttons/Button";

export default class AuthorCourseStudentFilterForm extends FilterForm {
  static storeName = "AuthorCourseStudentFilterForm";

  createFields(args) {
    return [
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
