import FormView from "../../../../base/forms/FormView";
import { withRouter } from "react-router";
import { connect } from "../../../../../stores/base/StoreManager";
import DiscountCodeForm from "../stores/DiscountCodeForm";

class DiscountCodeFormView extends FormView {
  static getForm(props) {
    let invoiceId = props.invoiceId;
    return DiscountCodeForm.map(invoiceId, { invoiceId });
  }
  getFormClass() {
    return "centered compact-form row full-width";
  }
  getFieldsClassName(){
    return 'master-column'
  }
  getButtonsClass(){
    return '';
  }
}

export default withRouter(connect(DiscountCodeFormView));
