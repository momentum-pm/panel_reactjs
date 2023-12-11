import { withRouter } from "react-router";
import Res from "../../../../../assets/Res";
import History from "../../../../../History";
import { BUTTON_TYPE } from "../../../../../stores/base/form/buttons/Button";
import { connect } from "../../../../../stores/base/StoreManager";
import FilterFormView from "../../../../base/FilterFormView";
import ButtonView from "../../../../base/forms/button/ButtonView";
import FormView from "../../../../base/forms/FormView";
import MasterColumn from "../../../../base/MasterColumn";
import Row from "../../../../base/Row";
import AuthorCourseDiscountTypesFilterForm from "../../stores/author/AuthorCourseDiscountTypesFilterForm";
class AuthorCourseDiscountTypesFilterFormView extends FormView {
  static getForm(props) {
    let { courseId, authorId } = props.match.params;
    return AuthorCourseDiscountTypesFilterForm.map(courseId, {
      courseId,
      authorId,
    });
  }
  render() {
    return (
      <form className={"compact-form"}>
        <div className={`row`}>
          <MasterColumn>
            {this.mapFieldToView(this.getState().fields[0])}
            {this.mapFieldToView(this.getState().fields[1])}
            <Row className={"centered"}>
              <MasterColumn>
                {this.mapFieldToView(this.getState().fields[2])}
              </MasterColumn>
              {this.map_button_to_view(this.getState().buttons[0])}
            </Row>
          </MasterColumn>
          <MasterColumn>
            <Row className={"reverse"}>
              <ButtonView
                title={"افزودن تخفیف"}
                type={BUTTON_TYPE.BUTTON}
                onClick={() => {
                  History.pushLargeModal(
                    `/school/authors/${this.props.match.params.authorId}/courses/${
                      this.props.match.params.courseId
                    }/discounts/`
                  );
                }}
                icon={Res.icon.add}
                className={"large raised primary"}
              />
              {/* {this.map_button_to_view(this.getState().buttons[1])} */}
            </Row>
          </MasterColumn>
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

export default withRouter(connect(AuthorCourseDiscountTypesFilterFormView));
