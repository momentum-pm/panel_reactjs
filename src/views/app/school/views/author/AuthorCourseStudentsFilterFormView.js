import { withRouter } from "react-router";
import { connect } from "../../../../../stores/base/StoreManager";
import FilterFormView from "../../../../base/FilterFormView";
import FormView from "../../../../base/forms/FormView";
import MasterColumn from "../../../../base/MasterColumn";
import AuthorCourseStudentFilterForm from "../../stores/author/AuthorCourseStudentFilterForm";
class AuthorCourseStudentsFilterFormView extends FormView {
  static getForm(props) {
    let { courseId, authorId } = props.match.params;
    return AuthorCourseStudentFilterForm.map(courseId, { courseId, authorId });
  }
  render() {
    return (
      <form className={"compact-form"}>
        <div className={`row centered`}>
          <MasterColumn>{this.getFieldsView()}</MasterColumn>
          {this.getButtonsView()}
        </div>
      </form>
    );
  }
  getButtonsView() {
    let state = this.getState();
    return (
      <div className="row">{state.buttons.map(this.map_button_to_view)}</div>
    );
  }
}

export default withRouter(connect(AuthorCourseStudentsFilterFormView));
