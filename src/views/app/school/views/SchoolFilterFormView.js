import { withRouter } from "react-router";
import { connect } from "../../../../stores/base/StoreManager";
import SchoolFilterForm from "../stores/SchoolFilterForm";
import FilterFormView from "../../../base/FilterFormView";

class SchoolFilterFormView extends FilterFormView {
  static getForm(props) {
    return SchoolFilterForm.map();
  }
  getFormClass() {
    return "header-filter-form  compact-form hidden-overflow tabs-container";
  }
  render() {
    return (
      <form className={this.getFormClass()}>
        <div className={`container `}>
          {this.getHintView()}
          {this.getFieldsView()}
        </div>
      </form>
    );
  }
}

export default withRouter(connect(SchoolFilterFormView));
