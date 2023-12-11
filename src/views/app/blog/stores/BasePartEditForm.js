import Res from "../../../../assets/Res";
import RemoteForm from "../../../../stores/base/form/RemoteForm";
import RemoteSelectField from "../../../../stores/base/form/fields/RemoteSelectField";
import Spacings from "./Spacings";
import HiddenField from "../../../../stores/base/form/fields/HiddenField";
import BackgroundColors from "./BackgroundColors";
import Button from "../../../../stores/base/form/buttons/Button";
import AuthorPostParts from "./AuthorPostParts";
import { CACHE_POLICY } from "../../../../stores/base/RemoteStore";
import Requester from "../../../../utils/requests/Requester";
import MessageQueue from "../../../../stores/base/MessageQueue";
import CharField from "../../../../stores/base/form/fields/CharField";

export default class BasePartEditForm extends RemoteForm {
  static storeName = "BasePartEditForm";

  createFields(args) {
    return [
      CharField.create({
        name: "order",
        required: false,
        label: "ترتیب",
        placeholder: "عدد وارد کنید...",
      }),
      RemoteSelectField.create({
        name: "padding_top",
        label: Res.string.blog.spacing_top_label,
        itemToTitle: (item) => Res.get_attribute(item, "title"),
        itemToValue: (item) => item.id,
        remoteStore: Spacings.get(),
        placeholder: Res.string.blog.spacing_placeholder,
        className: "inline-half-row-responsive",
      }),
      RemoteSelectField.create({
        name: "padding_bottom",
        label: Res.string.blog.spacing_bottom_label,
        itemToTitle: (item) => Res.get_attribute(item, "title"),
        itemToValue: (item) => item.id,
        remoteStore: Spacings.get(),
        placeholder: Res.string.blog.spacing_placeholder,
        className: "inline-half-row-responsive",
      }),
      RemoteSelectField.create({
        name: "background_color",
        label: Res.string.blog.background_color_label,
        itemToTitle: (item) => Res.get_attribute(item, "title"),
        itemToValue: (item) => item.id,
        remoteStore: BackgroundColors.get(),
        placeholder: Res.string.blog.background_color_placeholder,
        className: "half-row-responsive",
      }),
    ];
  }

  forceSetContext() {
    return true;
  }

  createButtons(args) {
    return [
      Button.createSubmit({
        title: Res.string.blog.save_part,
        icon: Res.icon.check,
        className: "raised primary",
        onClick: () => this.submit(),
      }),

      Button.create_button({
        name: "reset",
        title: Res.string.reset_form,
        className: "flat primary",
        onClick: () => this.reset(),
      }),
      Button.create_button({
        name: "delete",
        title: Res.string.blog.delete_part,
        icon: Res.icon.cross,
        className: "flat danger",
        onClick: () => this.delete(),
      }),
      Button.create_button({
        name: "cancel",
        title: Res.string.blog.close_part,
        icon: Res.icon.upArrow,
        className: "flat primary",
        onClick: () => this.cancel(),
      }),
    ];
  }

  reset() {
    this.setContext({ ...this.state.context });
  }

  cancel() {
    let postId = this.state.postId;
    let partId = this.state.partId;
    let authorId = this.state.authorId;
    AuthorPostParts.get(postId, { postId, authorId }).close(partId);
  }

  onSubmitCallback(response) {
    let postId = this.state.postId;
    let partId = this.state.partId;
    let authorId = this.state.authorId;
    AuthorPostParts.get(postId, { postId, authorId }).close(partId);
    AuthorPostParts.get(postId, { postId, authorId }).load(CACHE_POLICY.UPDATE);
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
    let postId = this.state.postId;
    let partId = this.state.partId;
    let authorId = this.state.authorId;
    AuthorPostParts.get(postId, { postId, authorId }).close(partId);
    AuthorPostParts.get(postId, { postId, authorId }).load(CACHE_POLICY.UPDATE);
  }
}
