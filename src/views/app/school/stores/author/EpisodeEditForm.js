import History from "../../../../../History";
import Status from "../../../../../utils/requests/Status";
import Button from "../../../../../stores/base/form/buttons/Button";
import Res from "../../../../../assets/Res";
import { CACHE_POLICY } from "../../../../../stores/base/RemoteStore";
import EpisodeBaseForm from "./EpisodeBaseForm";
import AuthorCourse from "./AuthorCourse";

export default class EpisodeEditForm extends EpisodeBaseForm {
  static storeName = "EpisodeEditForm";

  getRemoteStore(args) {
    return AuthorCourse.get(args.courseId, args);
  }

  mapData(course) {
    return this.findSectionById(course.sections, this.state?.episodeId);
  }
  findSectionById(sections, episodeId) {
    let episode = null;
    sections.forEach((s) => {
      if (!episode) {
        s.episodes?.forEach((e) => {
          if (e.id.toString() === episodeId) {
            episode = e;
          }
        });
        let insSubsections = this.findSectionById(s.subsections, episodeId);
        if (insSubsections) {
          episode = insSubsections;
        }
      }
    });
    return episode;
  }
  forceSetContext() {
    return true;
  }

  createButtons(args) {
    return [
      Button.createSubmit({
        title: Res.string.school.edit_episode_button,
        className: "raised primary",
        onClick: () => this.submit(),
      }),
      Button.create_back(),
    ];
  }

  getSubmitUrl() {
    return `school/authors/${this.state.authorId}/courses/${this.state.courseId}/sections/${this.state.sectionId}/episodes/${this.state.episodeId}/`;
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
    return Res.string.school.edit_episode_button;
  }
}
