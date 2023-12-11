import PaginatedRemoteStore from "../../../../../stores/base/PaginatedRemoteStore";
import { GregorianCalendar } from "../../../../../utils/CalendarUtils";
import AuthorCourseInvoiceFilterForm from "./AuthorCourseInvoiceFilterForm";
export default class AuthorCourseInvoices extends PaginatedRemoteStore {
  static storeName = "AuthorCourseInvoices";

  getUrl() {
    return `school/authors/${this.state.authorId}/courses/${this.state.courseId}/invoices/`;
  }
  getFilterForm(){
    return AuthorCourseInvoiceFilterForm.get(this.id,this.state);
  }
  getAllowedParams() {
    return ["paid", "creation__date__lte", "creation__date__gte"];
  }
  getInitialParams() {
    return {
      paid: true,
      creation__date__lte: GregorianCalendar.getToday(),
      creation__date__gte: GregorianCalendar.addTo(
        GregorianCalendar.getToday(),
        -30
      ),
    };
  }
}
