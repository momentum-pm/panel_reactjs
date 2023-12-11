import { connect } from "../../../../stores/base/StoreManager";
import RemoteFormView from "../../../base/forms/RemoteFormView";
import MasterColumn from "../../../base/MasterColumn";
import Row from "../../../base/Row";
import ExerciseAnswerForm from "../stores/ExerciseAnswerForm";

class ExerciseAnswerFormView extends RemoteFormView {
  static getForm(props) {
    return ExerciseAnswerForm.map(props.exerciseId, {
      episodeId: props.episodeId,
      exercise: props.exercise,
    });
  }
  getFormView() {
    return (
      <Row className={"centered"}>
        <MasterColumn>{this.getFieldsView()}</MasterColumn>
        {this.getButtonsView()}
      </Row>
    );
  }
}
export default connect(ExerciseAnswerFormView);
