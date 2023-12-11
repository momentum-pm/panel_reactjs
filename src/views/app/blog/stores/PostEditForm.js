import CharField from "../../../../stores/base/form/fields/CharField";
import Validators from "../../../../utils/Validators";
import Res from "../../../../assets/Res";
import TextField from "../../../../stores/base/form/fields/TextField";
import SelectField from "../../../../stores/base/form/fields/SelectField";
import BooleanField from "../../../../stores/base/form/fields/BooleanField";
import FileField, {
  IMAGE_FORMATS,
} from "../../../../stores/base/form/fields/FileField";
import RemoteForm from "../../../../stores/base/form/RemoteForm";
import AuthorPost from "./AuthorPost";
import RemoteSelectField from "../../../../stores/base/form/fields/RemoteSelectField";
import BackgroundColors from "./BackgroundColors";
import Button from "../../../../stores/base/form/buttons/Button";
import { CACHE_POLICY } from "../../../../stores/base/RemoteStore";
import Requester from "../../../../utils/requests/Requester";
import MessageQueue from "../../../../stores/base/MessageQueue";
import Status from "../../../../utils/requests/Status";
import { getSlug } from "../../../../utils/StringUtils";
import Confirm from "../../../../stores/base/Confirm";
import History from "../../../../History";
import AuthorPosts from "./AuthorPosts";
import CompactCourses from "../../school/stores/CompactCourses";

export default class PostEditForm extends RemoteForm {
  static storeName = "PostCreateForm";

  getRemoteStore(args) {
    let postId = args.postId;
    let authorId = args.authorId;
    return AuthorPost.get(postId, { authorId, postId });
  }

  createFields(args) {
    return [
      SelectField.create({
        name: "state",
        items: ["draft", "published", "course"],
        itemToTitle: (item) => Res.string.blog.state_to_title[item],
        itemToValue: (item) => item,
        label: Res.string.blog.state_label,
        placeholder: Res.string.blog.state_placeholder,
        value: "draft",
      }),
      RemoteSelectField.create({
        name: "course",
        remoteStore: CompactCourses.get(),
        itemToValue: (item) => item.id,
        itemToTitle: (item) => item.title,
        required: false,
        label: Res.string.blog.course_label,
        placeholder: Res.string.blog.course_placeholder,
      }),
      CharField.create({
        name: "slug",
        label: Res.string.blog.slug_label,
        placeholder: Res.string.blog.slug_placeholder,
        validators: [Validators.at_last(300, Res.string.characters)],
        required: false,
      }),
      CharField.create({
        name: "title",
        label: Res.string.blog.title_label,
        placeholder: Res.string.blog.title_placeholder,
        validators: [Validators.at_last(250, Res.string.characters)],
        required: false,
      }),
      CharField.create({
        name: "meta_title",
        label: Res.string.blog.meta_title_label,
        placeholder: Res.string.blog.meta_title_placeholder,
        validators: [Validators.at_last(60, Res.string.characters)],
        required: false,
      }),
      TextField.create({
        name: "description",
        label: Res.string.blog.description_title,
        placeholder: Res.string.blog.description_placeholder,
        rows: 4,
        required: false,
      }),
      TextField.create({
        name: "meta_description",
        label: Res.string.blog.meta_description_title,
        placeholder: Res.string.blog.meta_description_placeholder,
        rows: 4,
        validators: [Validators.at_last(200, Res.string.characters)],
        required: false,
      }),

      FileField.create({
        name: "meta_image",
        validators: [Validators.file_format(IMAGE_FORMATS)],
        label: Res.string.blog.meta_image_label,
        placeholder: Res.string.blog.meta_image_placeholder,
        required: false,
        className: "inline-half-row-responsive",
      }),

      FileField.create({
        name: "thumbnail_image",
        validators: [Validators.file_format(IMAGE_FORMATS)],
        label: "عکس مربعی",
        placeholder: "اینجا رها کنید",
        required: false,
        className: "inline-half-row-responsive",
      }),
      FileField.create({
        name: "desktop_header_image",
        validators: [Validators.file_format(IMAGE_FORMATS)],
        label: "هدر دسکتاپ ۳ در ۱",
        placeholder: "اینجا رها کنید",
        required: false,
        className: "inline-half-row-responsive",
      }),
      FileField.create({
        name: "mobile_header_image",
        validators: [Validators.file_format(IMAGE_FORMATS)],
        label: "هدر موبایل ۴ در ۶",
        placeholder: "اینجا رها کنید",
        required: false,
        className: "inline-half-row-responsive",
      }),
      CharField.createNumber({
        name: "time_to_read",
        label: Res.string.blog.time_to_read_label,
        placeholder: Res.string.blog.time_to_read_placeholder,
        unit: Res.string.seconds,
        required: false,
      }),
      RemoteSelectField.create({
        name: "background_color",
        label: Res.string.blog.background_color_label,
        itemToTitle: (item) => Res.get_attribute(item, "title"),
        itemToValue: (item) => item.id,
        remoteStore: BackgroundColors.get(),
        placeholder: Res.string.blog.background_color_placeholder,
      }),
      BooleanField.create({
        name: "show_in_home",
        question: Res.string.blog.show_in_home_question,
        required: false,
      }),
    ];
  }

  fillSlug() {
    let title = this.getValue("title");
    let slug = getSlug(title);
    this.getField("slug").setValue(slug);
  }

  createButtons(args) {
    return [
      Button.create_button({
        name: "submit",
        title: Res.string.blog.save_post,
        icon: Res.icon.check,
        className: "raised primary",
        onClick: () => this.submit(),
      }),
      Button.create_button({
        name: "recalculate",
        title: Res.string.blog.recalculate_time_to_read,
        icon: Res.icon.clock,
        className: "flat primary",
        onClick: () => this.recalculate(),
      }),
      Button.create_button({
        name: "delete",
        title: Res.string.blog.delete_post,
        icon: Res.icon.cross,
        className: "flat danger",
        onClick: () => this.deleteConfirm(),
      }),
      Button.create_button({
        name: "fillSlug",
        title: Res.string.blog.fill_slug,
        className: "flat primary",
        onClick: () => this.fillSlug(),
      }),
    ];
  }

  deleteConfirm() {
    Confirm.open(
      Res.string.blog.delete_post,
      Res.string.blog.delete_post_message,
      () => this.delete(),
      Res.string.blog.delete_post,
      "raised danger"
    );
  }

  delete() {
    this.getButton("delete").set_loading(true);
    Requester.request("post", this.getSubmitUrl() + "delete/", {}, (response) =>
      this.deleteCallback(response)
    );
  }

  deleteCallback(response) {
    this.getButton("delete").set_loading(false);
    MessageQueue.showObject(response.data);
    if (Status.isOk(response.status)) {
      let authorId = this.state.authorId;
      AuthorPosts.get(authorId, { authorId }).load(CACHE_POLICY.IGNORE);
      History.replace_url(`/blog/authors/${authorId}/posts/`);
    }
  }

  onSubmitCallback(response) {
    super.onSubmitCallback(response);
    let postId = this.state.postId;
    let authorId = this.state.authorId;
    return AuthorPost.get(postId, { authorId, postId }).load(
      CACHE_POLICY.IGNORE
    );
  }

  getSubmitUrl() {
    return `blog/authors/${this.state.authorId}/posts/${this.state.postId}/`;
  }

  getTitle(args) {
    return Res.string.blog.edit_post_page;
  }

  recalculate() {
    this.getButton("recalculate").set_loading(true);
    Requester.request(
      "get",
      this.getSubmitUrl() + "time-to-read/",
      {},
      (response) => this.recalculateCallback(response)
    );
  }

  recalculateCallback(response) {
    this.getButton("recalculate").set_loading(false);
    MessageQueue.showObject(response.data);
    if (Status.isOk(response.status)) {
      this.getField("time_to_read").setValue(response.data.time_to_read);
    }
  }

  onFieldChange(field) {
    if (field.state.name === "state") {
      let state = field.state.value;
      if (state === "course") {
        this.getField("course").setProperty(
          "className",
          "inline-half-row-responsive"
        );
      } else {
        this.getField("course").setProperty(
          "className",
          "inline-half-row-responsive invisible-field"
        );
        this.getField("course").setValue(null);
      }
    }
  }

  setContext(context) {
    if (context) {
      context.image_url = context.image;
      context.meta_image_url = context.meta_image;
    }
    super.setContext(context);
  }
}
