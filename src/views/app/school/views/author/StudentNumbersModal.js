import ScrollableFormBox from "../../../../base/forms/ScrollableFormBox";
import { withRouter } from "react-router";
import { connect } from "../../../../../stores/base/StoreManager";
import SectionCreateForm from "../../stores/author/SectionCreateForm";
import StoreView from "../../../../base/StoreView";
import StudentNumbers from "../../stores/author/StudentNumbers";
import Box from "../../../../base/refactored/box/Box";
import CharField from "../../../../../stores/base/form/fields/CharField";
import Body from "../../../../base/Body";
import ButtonView from "../../../../base/forms/button/ButtonView";
import { BUTTON_TYPE } from "../../../../../stores/base/form/buttons/Button";
import History from "../../../../../History";

class StudentNumbersModal extends StoreView {
  static mapPropsToStores(props) {
    return {
      store: StudentNumbers.map(),
    };
  }
  render() {
    return (
      <Box>
        <Body className={"full-width form-view form"}>
          <div className="field">
            <textarea
              rows={3}
              className="full-width char-field-view"
              value={this.getTextValue()}
            />
          </div>
          <ButtonView
            type={BUTTON_TYPE.BUTTON}
            onClick={()=>History.goBack()}
            title={"بستن"}
            className="raised primary"
          />
        </Body>
        {/* {this.getStudents().map(item=><p>{item.phone_number}</p>)} */}
      </Box>
    );
  }
  getStudents() {
    return this.props.store.state.numbers;
  }
  getTextValue() {
    let students = this.getStudents();
    let value = "";
    students.forEach((student) => {
      value += student.m + "\n";
    });
    return value;
  }
}

export default withRouter(connect(StudentNumbersModal));
