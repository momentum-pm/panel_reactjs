import { withRouter } from "react-router";
import History from "../../../../History";
import { BUTTON_TYPE } from "../../../../stores/base/form/buttons/Button";
import { connect } from "../../../../stores/base/StoreManager";
import Body from "../../../base/Body";
import ButtonView from "../../../base/forms/button/ButtonView";
import RemoteFormView from "../../../base/forms/RemoteFormView";
import MasterColumn from "../../../base/MasterColumn";
import NoLoadRemoteStoreView from "../../../base/NoLoadRemoteStoreView";
import Box from "../../../base/refactored/box/Box";
import Header from "../../../base/refactored/header/Header";
import RemoteStoreView from "../../../base/RemoteStoreView";
import Row from "../../../base/Row";
import Exercise from "../stores/Exercise";
import ExerciseAnswerForm from "../stores/ExerciseAnswerForm";
import Scrollable from "../../../base/refactored/scrollable/Scrollable";
import ScrollableColumn from "../../../base/refactored/scrollable/ScrollableColumn";
import { LatexView } from "./ExerciseView";

class ExerciseHintModal extends NoLoadRemoteStoreView {
  static getRemoteStore(props) {
    let exerciseId = props.match.params.exerciseId;
    return Exercise.map(exerciseId);
  }
  render() {
    return (
      <div className="full-height">
        <Box className={"centered column full-height"}>
          <ScrollableColumn className={"full-hiht"}>
            <Header className={""}>راهنمایی</Header>

            <Scrollable c>
              <Body className={"full-with"}>
                <LatexView latex={this.getData().hint} />
              </Body>
            </Scrollable>
            <Row className={"reverse"}>
              <ButtonView
                type={BUTTON_TYPE.BUTTON}
                onClick={() => History.goBack()}
                title="بستن"
              />
            </Row>
          </ScrollableColumn>
        </Box>
      </div>
    );
  }
}
export default withRouter(connect(ExerciseHintModal));
