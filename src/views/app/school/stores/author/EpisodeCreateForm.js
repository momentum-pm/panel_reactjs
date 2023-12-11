import History from "../../../../../History";
import Status from "../../../../../utils/requests/Status";
import Button from "../../../../../stores/base/form/buttons/Button";
import Res from "../../../../../assets/Res";
import { CACHE_POLICY } from "../../../../../stores/base/RemoteStore";
import EpisodeBaseForm from "./EpisodeBaseForm";
import AuthorCourse from "./AuthorCourse";

export default class EpisodeCreateForm extends EpisodeBaseForm {
  static storeName = "EpisodeCreateForm";

  forceSetContext() {
    return true;
  }

  createButtons(args) {
    return [
      Button.createSubmit({
        title: Res.string.school.add_episode_button,
        className: "raised primary",
        onClick: () => this.submit(),
      }),
      Button.create_back(),
    ];
  }

  setOrder(order) {
    this.getField("order").setValue(order);
  }
  getSubmitUrl() {
    return `school/authors/${this.state.authorId}/courses/${this.state.courseId}/sections/${this.state.sectionId}/episodes/`;
  }

  onSubmitCallback(response) {
    super.onSubmitCallback(response);
    if (Status.isOk(response.status)) {
      this.setContext({});
      AuthorCourse.get(this.state.courseId).load(CACHE_POLICY.UPDATE);
      History.goBack();
    }
  }

  getTitle(args) {
    return Res.string.school.add_episode_button;
  }
}
