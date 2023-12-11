import CharField from "../../../../../stores/base/form/fields/CharField";
import Res from "../../../../../assets/Res";
import RemoteForm from "../../../../../stores/base/form/RemoteForm";
import HiddenField from "../../../../../stores/base/form/fields/HiddenField";
import Button from "../../../../../stores/base/form/buttons/Button";
import TextField from "../../../../../stores/base/form/fields/TextField";
import { isDigitalString } from "../../../../../utils/StringUtils";
import { CACHE_POLICY } from "../../../../../stores/base/RemoteStore";

import Episode from "../Episode";
import AdminEpisodeComments from "../../../comments/stores/AdminEpisodeComments";
export default class CommentCreateForm extends RemoteForm {
  static storeName = "CommentCreateForm";

  onCreate() {
    if (this.state.parent) {
      this.setContext({ parent: this.state.parent });
      this.state.isOpen = false;
      this.getButton("open").setClassName("flat primary");
      this.getButton("submit").setClassName("hidden");
      this.getField("text").setProperty("className", "hidden");
    } else {
      this.state.isOpen = true;
    }
    this.save();
  }

  toggleOpen() {
    if (this.state.parent) {
      this.state.isOpen = !this.state.isOpen;
      if (this.state.isOpen) {
        this.getButton("open").setClassName("flat white");
        this.getButton("open").setIcon(Res.icon.cross);
        this.getButton("open").setTitle("انصراف");
        this.getButton("submit").setClassName("flat success");
        this.getField("text").setProperty("className", "darker-field");
      } else {
        this.getButton("open").setClassName("flat primary");
        this.getButton("open").setIcon(Res.icon.reply);
        this.getButton("open").setTitle("پاسخ به نظر");
        this.getButton("submit").setClassName("hidden");
        this.getField("text").setProperty("className", "hidden");
        this.setContext({ parent: this.state.parent });
      }
      this.save();
    }
  }
  createFields(args) {
    return [
      HiddenField.create({ name: "parent", required: false }),
      CharField.create({
        className: "darker-field",
        name: "text",
        required: false,
        placeholder: "نظر شما...",
      }),
    ];
  }
  onFieldChange(field) {
    if (field.state.name === "text") {
      this.getButton("submit").set_active(field.state.value);
    }
  }
  createButtons() {
    return [
      Button.create_button({
        name: "open",
        className: "hidden",
        onClick: () => this.toggleOpen(),
        icon: Res.icon.reply,
        title: "پاسخ به نظر",
      }),
      Button.createSubmit({
        name: "submit",
        className: "large flat primary",
        active: false,
        onClick: () => this.submit(),
        icon: Res.icon.send,
      }),
    ];
  }
  getSubmitUrl() {
    let id;
    if (isDigitalString(this.state.episodeId)) {
      id = this.state.episodeId;
    } else {
      id = this.state.episodeSlug;
    }
    return `school/episodes/${id}/comments/`;
  }
  onSubmitCallback() {
    super.onSubmitCallback();
    this.setContext({ parent: this.state.parent });
    this.toggleOpen();
    if(this.state.episodeSlug && this.state.courseSlug){
      Episode.get(this.state.episodeSlug, this.state).load(CACHE_POLICY.UPDATE);
    }
    if(this.state.episodeId && this.state.courseSlug){
      Episode.get(this.state.episodeId, this.state).load(CACHE_POLICY.UPDATE);
    }
    if(!this.state.courseSlug){
      AdminEpisodeComments.get().load(CACHE_POLICY.UPDATE)
    }
  }
  forceSetContext() {
    return true;
  }
}
