import { connect } from "../../../../stores/base/StoreManager";
import PaginatedRemoteStorePage from "../../../base/PaginatedRemoteStorePage";
import Exercises from "../stores/Exercises";
import SlaveColumn from "../../../base/SlaveColumn";
import { withRouter } from "react-router";
import AdminExerciseView from "./AdminExerciseView";
class ExercisePage extends PaginatedRemoteStorePage {
  static getRemoteStore() {
    return Exercises.map();
  }
  getFilterFormView() {
    return <SlaveColumn className={"dominant"}></SlaveColumn>;
  }

  mapItemToView(exercise, index) {
    return (
      <AdminExerciseView key={exercise.id} exercise={exercise} index={index} />
    );
  }
}
export default withRouter(connect(ExercisePage));
