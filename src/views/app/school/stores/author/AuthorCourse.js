import RemoteStore from "../../../../../stores/base/RemoteStore";
import Button from "../../../../../stores/base/form/buttons/Button";
import Res from "../../../../../assets/Res";
import History from "../../../../../History";
import Confirm from "../../../../../stores/base/Confirm";
import Requester from "../../../../../utils/requests/Requester";
import MessageQueue from "../../../../../stores/base/MessageQueue";
import Status from "../../../../../utils/requests/Status";
import { CACHE_POLICY } from "../../../../../stores/base/RemoteStore";
export default class AuthorCourse extends RemoteStore {
  static storeName = "AuthorCourse";

  getUrl() {
    return `school/authors/${this.state.authorId}/courses/${this.state.courseId}/`;
  }
  getInitialState(args) {
    return {
      ...super.getInitialState(args),
      addSectionButton: Button.create_button({
        name: "addSection",
        onClick: () =>
          History.pushSmallModal(
            `/school/authors/${args.authorId}/courses/${args.courseId}/sections/create/`
          ),
        title: Res.string.school.add_section_button,
        icon: Res.icon.add,
        className: "flat primary",
      }),
      addChildrenButton:Button.create_button({
        name: "addChildren",
        onClick: () =>
          History.pushSmallModal(
            `/school/authors/${args.authorId}/courses/${args.courseId}/create-children/`
          ),
        title: "افزودن زیر دوره",
        icon: Res.icon.add,
        className: "flat primary",
      })
    };
  }

  success(data, status) {
    data = {
      ...data,
      sections: data.sections.map((section) => ({
        ...section,
        buttons: this.createButtonsFor(section),
        open: this.isOpen(section),
        episodes: section.episodes.map((episode) => ({
          ...episode,
          buttons: this.createEpisodeButtonsFor(episode, section.id),
        })),
        subsections: section.subsections?.map((section) => ({
          ...section,
          open: this.isOpen(section),
          buttons: this.createButtonsFor(section),
          episodes: section.episodes?.map((episode) => ({
            ...episode,
            buttons: this.createEpisodeButtonsFor(episode, section.id),
          })),
          subsections: section.subsections?.map((section) => ({
            ...section,
            buttons: this.createButtonsFor(section),
            open: this.isOpen(section),
            episodes: section.episodes?.map((episode) => ({
              ...episode,
              buttons: this.createEpisodeButtonsFor(episode, section.id),
            })),
            subsections: section.subsections.map((section) => ({
              ...section,
              buttons: this.createButtonsFor(section),
              open: this.isOpen(section),
              episodes: section.episodes?.map((episode) => ({
                ...episode,
                buttons: this.createEpisodeButtonsFor(episode, section.id),
              })),
            })),
          })),
        })),
      })),
    };
    this.state.viewButton = Button.create_external_link({
      name: "viewButton",
      link: `/c/${data.slug}/`,
      title: Res.string.school.view_course,
      icon: Res.icon.hyperlink,
      className: "flat white start-aligned",
    });
    this.state.openForButton = Button.create_button({
      name: "addSection",
      onClick: () =>
        History.pushMediumModal(
          `/school/authors/${this.state.authorId}/courses/${this.state.courseId}/accesses/create/student/`
        ),
      title: "ثبت نام دانش آموز",
      icon: Res.icon.profile,
      className: "flat white   start-aligned",
    });
    this.state.accessCreate = Button.create_button({
      name: "accessCreate",
      onClick: () =>
        History.pushMediumModal(
          `/school/authors/${this.state.authorId}/courses/${this.state.courseId}/accesses/create/teacher/`
        ),
      title: "افزودن استاد",
      icon: Res.icon.education,
      className: "flat white   start-aligned",
    });
    this.state.discountCreate = Button.create_button({
      name: "discountCreate",
      onClick: () =>
        History.pushMediumModal(
          `/school/authors/${this.state.authorId}/courses/${this.state.courseId}/accesses/create/teacher/`
        ),
      title: "افزودن تخفیف",
      icon: Res.icon.discount,
      className: "flat white   start-aligned",
    });
    this.state.updateDurations = Button.create_button({
      name: "updateDurations",
      onClick: () => this.updateDurationsSubmit(),
      title: "بروزرسانی زمان ویدیو ها",
      icon: Res.icon.refresh,
      className: "flat white   start-aligned",
    });
    this.state.uploadVideos = Button.create_button({
      name: "uploadVideos",
      onClick: () => this.uploadVideosSubmit(),
      title: "آپلود ویدیو در آروان",
      icon: Res.icon.fileUpload,
      className: "flat white   start-aligned",
    });
    super.success(data, status);
  }
  updateDurationsSubmit() {
    this.state.updateDurations.set_loading(true);
    Requester.request(
      "post",
      `school/authors/${this.state.authorId}/courses/${this.state.courseId}/update-durations/`,
      {},
      (response) => {
        this.state.updateDurations.set_loading(false);

        MessageQueue.showObject(response.data);
        this.load(CACHE_POLICY.UPDATE);
      }
    );
  }

  uploadVideosSubmit() {
    this.state.uploadVideos.set_loading(true);
    Requester.request(
      "post",
      `school/authors/${this.state.authorId}/courses/${this.state.courseId}/upload-videos/`,
      {},
      (response) => {
        this.state.uploadVideos.set_loading(false);

        MessageQueue.showObject(response.data);
        this.load(CACHE_POLICY.UPDATE);
      }
    );
  }

  createButtonsFor(section) {
    let courseId = this.state.courseId;
    let authorId = this.state.authorId;
    return [
      Button.create_button({
        name: "cascade",
        about: "بیشتر",
        icon: Res.icon.downArrow,
        onClick: () => this.toggleSection(section),
        className: "flat default small low-margin",
      }),
      Button.create_button({
        name: "editButton",
        about: "ویرایش",
        icon: Res.icon.edit,
        onClick: () =>
          History.pushSmallModal(
            section.parent_id
              ? `/school/authors/${authorId}/courses/${courseId}/sections/${section.parent_id}/subsections/${section.id}/edit/`
              : `/school/authors/${authorId}/courses/${courseId}/sections/${section.id}/edit/`
          ),
        className: "flat default small low-margin",
      }),
      Button.create_button({
        name: "deleteButton",
        icon: Res.icon.trash,
        about: "حذف",
        onClick: () => this.deleteSectionConfirm(section),
        className: "flat default small low-margin",
      }),
      Button.create_button({
        name: "addEpisode",
        onClick: () =>
          History.pushLargeModal(
            `/school/authors/${authorId}/courses/${courseId}/sections/${section.id}/episodes/create/`
          ),
        about: Res.string.school.add_episode_button,
        icon: Res.icon.add,
        className: "flat default small low-margin",
      }),
      Button.create_button({
        name: "addSubsection",
        onClick: () =>
          History.pushSmallModal(
            `/school/authors/${authorId}/courses/${courseId}/sections/${section.id}/subsections/create/`
          ),
        about: Res.string.school.add_subsection_button,
        icon: Res.icon.list,
        className: "flat default small low-margin",
      }),
    ];
  }
  createEpisodeButtonsFor(episode, sectionId) {
    let courseId = this.state.courseId;
    let authorId = this.state.authorId;
    return [
      Button.create_button({
        name: "editButton",
        icon: Res.icon.edit,
        onClick: () =>
          History.pushLargeModal(
            `/school/authors/${authorId}/courses/${courseId}/sections/${sectionId}/episodes/${episode.id}/edit/`
          ),
        className: "flat low-margin small",
      }),
      Button.create_button({
        name: "deleteButton",
        icon: Res.icon.trash,
        onClick: () => this.deleteEpisode(sectionId, episode.id),
        className: "flat low-margin small",
      }),
    ];
  }

  //section
  //toggle

  toggleSection(section) {
    this.state.data.sections.forEach((s) =>
      this.togglePossibleSection(s, section)
    );
    this.save();
  }
  togglePossibleSection(s, section) {
    if (section.id === s.id) {
      s.open = !s.open;
    }
    if (s.subsections?.length) {
      s.subsections.forEach((sub) => this.togglePossibleSection(sub, section));
    }
  }

  isOpen(section) {
    return this.state.data?.sections?.some((s) =>
      this.isOpenOrSubsectionsOpen(s, section)
    );
  }
  isOpenOrSubsectionsOpen(s, section) {
    if (section.id === s.id && s.open) {
      return true;
    } else {
      return s.subsections?.some((ss) =>
        this.isOpenOrSubsectionsOpen(ss, section)
      );
    }
  }
  //delete

  deleteSectionConfirm(section) {
    Confirm.open(
      Res.string.school.delete_section_title,
      Res.string.school.delete_section_text,
      () => this.deleteSection(section),
      Res.string.school.delete_section_title,
      "raised danger"
    );
  }

  deleteEpisode(sectionId, episodeId) {
    Requester.request(
      "post",
      `school/authors/${this.state.authorId}/courses/${this.state.courseId}/sections/${sectionId}/episodes/${episodeId}/delete/`,
      {},
      (response) => this.deleteEpisodeCallback(response)
    );
  }

  deleteEpisodeCallback(response) {
    MessageQueue.showObject(response.data);
    if (Status.isOk(response.status)) {
      this.load(CACHE_POLICY.UPDATE);
    }
  }

  deleteSectionConfirm(section) {
    Confirm.open(
      Res.string.school.delete_section_title,
      Res.string.school.delete_section_text,
      () => this.deleteSection(section),
      Res.string.school.delete_section_title,
      "raised danger"
    );
  }

  deleteSection(section) {
    this.setSectionLoading(section, true);
    Requester.request(
      "post",
      `school/authors/${this.state.authorId}/courses/${this.state.courseId}/sections/${section.id}/delete/`,
      {},
      (response) => this.deleteSectionCallback(response, section)
    );
  }
  setSectionLoading(section, loading) {
    this.state.data.sections.forEach((s) =>
      this.setPossibleSectionLoading(s, section, loading)
    );
  }
  setPossibleSectionLoading(s, section, loading) {
    if (section.id === s.id) {
      s.buttons[2].set_loading(loading);
    }
    if (s.subsections?.length) {
      s.subsections.forEach((sub) =>
        this.setPossibleSectionLoading(sub, section, loading)
      );
    }
  }
  deleteSectionCallback(response, section) {
    this.setSectionLoading(section, false);
    MessageQueue.showObject(response.data);
    if (Status.isOk(response.status)) {
      this.load(CACHE_POLICY.UPDATE);
    }
  }
}
