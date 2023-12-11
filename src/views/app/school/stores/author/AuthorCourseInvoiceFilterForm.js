import Res from "../../../../../assets/Res";
import DateField from "../../../../../stores/base/form/fields/DateField";
import { GregorianCalendar } from "../../../../../utils/CalendarUtils";
import FilterForm from "../../../../../stores/base/form/FilterForm";
import SwitchField from "../../../../../stores/base/form/fields/SwitchField";

export default class AuthorCourseInvoiceFilterForm extends FilterForm {
  static storeName = "AuthorCourseInvoiceFilterForm";

  getTitle(args) {
    return Res.string.dashboard.admin.filters_title;
  }

  createFields(args) {
    return [
      SwitchField.create({
        name: "paid",
        question: "فقط پرداخت شده",
        isInstant: true,
        required: false,
        className: "half-row-responsive",
      }),
      DateField.create({
        name: "creation__date__gte",
        label: "از تاریخ",
        isInstant: true,
        minDate: "2021-05-22",
        required: false,
        className: "inline-half-row-responsive",
        showLabelDetails: false,
      }),
      DateField.create({
        name: "creation__date__lte",
        label: "تا تاریخ",
        isInstant: true,
        minDate: "2021-05-22",
        className: "inline-half-row-responsive",
        required: false,
        showLabelDetails: false,
      }),
    ];
  }
}
