import { withRouter } from "react-router";
import { connect } from "../../../../../stores/base/StoreManager";
import FilterFormView from "../../../../base/FilterFormView";
import FormView from "../../../../base/forms/FormView";
import AuthorCourseInvoiceFilterForm from "../../stores/author/AuthorCourseInvoiceFilterForm";
class AuthorCourseInvoiceFilterFormView extends FormView {
  static getForm(props) {
    let {courseId,authorId} = props.match.params;
    return AuthorCourseInvoiceFilterForm.map(courseId,{courseId,authorId});
  }
  render() {
    return (
      <form className={'compact-form'}>
        <div className={` `}>
          {this.getHintView()}
          {this.getFieldsView()}
        </div>
      </form>
    );
  }
}

export default withRouter(connect(AuthorCourseInvoiceFilterFormView));
