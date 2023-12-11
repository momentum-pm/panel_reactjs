import RemoteStore, { CACHE_POLICY } from "../../../../stores/base/RemoteStore";
import History from "../../../../History";
import Requester from "../../../../utils/requests/Requester";
import Button from "../../../../stores/base/form/buttons/Button";
import Res from "../../../../assets/Res";
import MessageQueue from "../../../../stores/base/MessageQueue";
import Status from "../../../../utils/requests/Status";
import ParagraphEditForm from "./ParagraphEditForm";
import ImagePartEditForm from "./ImagePartEditForm";
import CoursePromotionEditForm from "./CoursePromotionEditForm";

export default class AuthorPostParts extends RemoteStore {
  static storeName = "AuthorPostParts";

  static getActions() {
    return [
      ...super.getActions(),
      "createPart",
      "createParagraph",
      "createImagePart",
    ];
  }

  static SUBTYPES = {
    PARAGRAPH: "paragraph",
    COURSE_PROMOtION: "course",
    CALL_TO_ACTION: "cta",
    IMAGE: "image",
  };

  getInitialState(args) {
    return {
      order: undefined,
      ...super.getInitialState(args),
      createParagraphButton: Button.create_button({
        title: Res.string.blog.paragraph_subtype,
        icon: Res.icon.edit,
        name: "createParagraphButton",
        className: "main-flex bordered primary",
        onClick: () => this.createParagraph(),
      }),
      createImagePartButton: Button.create_button({
        title: Res.string.blog.image_part_subtype,
        icon: Res.icon.imageFile,
        name: "createImagePartButton",
        className: "main-flex bordered primary",
        onClick: () => this.createImagePart(),
      }),
      createCoursePromotionButton: Button.create_button({
        title: Res.string.blog.course_promotion_subtype,
        icon: Res.icon.education,
        name: "createCoursePromotionButton",
        className: "main-flex bordered primary",
        onClick: () => this.createCoursePromotion(),
      }),
    };
  }

  getUrl() {
    return `blog/authors/${this.state.authorId}/posts/${this.state.postId}/parts/`;
  }

  success(data, status) {
    data = data.map((part) => {
      let isOpen = part.order === this.state.order;
      if (isOpen) {
        this.setPartContext(part);
      }
      return {
        ...part,
        open: () => this.open(part.id),
        isOpen,
      };
    });
    this.state.order = undefined;
    super.success(data, status);
  }

  createPart(index) {
    let order;
    if (index === -1) {
      if (this.state.data.length === 0) {
        order = 0;
      } else {
        order = this.state.data[0].order - 1;
      }
    } else {
      if (index === this.state.data.length - 1) {
        order = this.state.data[index].order + 1;
      } else {
        order =
          (this.state.data[index].order + this.state.data[index + 1].order) / 2;
      }
    }
    this.state.order = order;
    this.save();
    History.pushSmallModal(
      `/blog/authors/${this.state.authorId}/posts/${this.state.postId}/parts/create/`
    );
  }

  createParagraph() {
    this.state.createParagraphButton.set_loading(true);
    Requester.request(
      "post",
      `blog/authors/${this.state.authorId}/posts/${this.state.postId}/paragraphs/`,
      { order: this.state.order },
      (response) => this.createParagraphCallback(response)
    );
  }

  createImagePart() {
    this.state.createImagePartButton.set_loading(true);
    Requester.request(
      "post",
      `blog/authors/${this.state.authorId}/posts/${this.state.postId}/image-parts/`,
      { order: this.state.order },
      (response) => this.createImagePartCallback(response)
    );
  }

  createCoursePromotion() {
    this.state.createCoursePromotionButton.set_loading(true);
    Requester.request(
      "post",
      `blog/authors/${this.state.authorId}/posts/${this.state.postId}/course-promotions/`,
      { order: this.state.order },
      (response) => this.createCoursePromotionCallback(response)
    );
  }

  createParagraphCallback(response) {
    this.state.createParagraphButton.set_loading(false);
    MessageQueue.showObject(response.data);
    if (Status.isOk(response.status)) {
      this.load(CACHE_POLICY.IGNORE);
    }
    History.goBack();
  }

  createImagePartCallback(response) {
    this.state.createImagePartButton.set_loading(false);
    MessageQueue.showObject(response.data);
    if (Status.isOk(response.status)) {
      this.load(CACHE_POLICY.IGNORE);
    }
    History.goBack();
  }

  createCoursePromotionCallback(response) {
    this.state.createCoursePromotionButton.set_loading(false);
    MessageQueue.showObject(response.data);
    if (Status.isOk(response.status)) {
      this.load(CACHE_POLICY.IGNORE);
    }
    History.goBack();
  }

  open(partId) {
    this.state.data = this.state.data.map((part) => {
      if (part.id === partId) {
        this.setPartContext(part);
        return {
          ...part,
          isOpen: true,
        };
      } else {
        return part;
      }
    });
    this.save();
  }

  close(partId) {
    this.state.data = this.state.data.map((part) => {
      if (part.id === partId) {
        this.setPartContext(part);
        return {
          ...part,
          isOpen: false,
        };
      } else {
        return part;
      }
    });
    this.save();
  }

  setPartContext(part) {
    let partId = part.id;
    let authorId = this.state.authorId;
    let postId = this.state.postId;
    switch (part.subtype) {
      case AuthorPostParts.SUBTYPES.PARAGRAPH:
        ParagraphEditForm.get(partId, { partId, authorId, postId }).setContext({
          ...part,
        });
        break;
      case AuthorPostParts.SUBTYPES.IMAGE:
        ImagePartEditForm.get(partId, { partId, authorId, postId }).setContext({
          ...part,
        });
        break;
      case AuthorPostParts.SUBTYPES.COURSE_PROMOtION:
        CoursePromotionEditForm.get(partId, {
          partId,
          authorId,
          postId,
        }).setContext({ ...part });
        break;
      default:
        break;
    }
  }
}
