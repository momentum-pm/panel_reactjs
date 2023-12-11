import KnowledgeSet from "./KnowledgeSet";
import { CACHE_POLICY } from "../../../../../stores/base/RemoteStore";
import Requester from "../../../../../utils/requests/Requester";
import Form from "../../../../../stores/base/form/Form";
import ScoreField from "../../../../../stores/base/form/fields/ScoreField";
import Res from "../../../../../assets/Res";
import HiddenField from "../../../../../stores/base/form/fields/HiddenField";
import Button from "../../../../../stores/base/form/buttons/Button";

export default class KnowledgeEditForm extends Form {
  static storeName = "KnowledgeEditForm";

  getInitialState(args) {
    return {
      ...super.getInitialState(args),
      loading: false,
      deleteButton: Button.create_button({
        name: "delete",
        icon: Res.icon.cross,
        onClick: () => this.delete(),
        className: "small flat danger",
      }),
    };
  }

  createFields(args) {
    return [
      ScoreField.create({
        name: "level",
        minValue: 1,
        maxValue: 4,
        steps: 4,
        mapValueToTitle: (value) => "salam",
      }),
      HiddenField.create({
        name: "skill",
      }),
    ];
  }

  createButtons(args) {
    return [];
  }

  getSubmitUrl() {
    return `profiles/profiles/${this.state.profileId}/knowledge-set/${this.state.knowledgeId}/edit/`;
  }

  onSubmitCallback(response) {
    super.onSubmitCallback(response);
    KnowledgeSet.get(this.state.profileId).load(CACHE_POLICY.UPDATE);
  }

  delete() {
    if (!this.state.loading) {
      this.state.loading = true;
      this.save();
      Requester.request(
        "post",
        `profiles/profiles/${this.state.profileId}/knowledge-set/${this.state.knowledgeId}/delete/`,
        {},
        (response) => this.onDeleteCallback(response)
      );
    }
  }

  onDeleteCallback(response) {
    this.state.loading = false;
    this.save();
    KnowledgeSet.get(this.state.profileId).load(CACHE_POLICY.UPDATE);
  }

  setContext(context) {
    super.setContext({ ...context, skill: context.skill.title_fa });
    this.getField("level").setProperty(
      "label",
      Res.get_attribute(context.skill, "title")
    );
  }

  onFieldChange(field) {
    if (field.state.name === "level") {
      if (field.state.value && field.state.value !== this.state.context.level) {
        this.submit();
      }
    }
  }

  submit() {
    if (!this.state.loading) {
      this.state.loading = true;
      this.save();
      let values = this.getValues();
      Requester.request("post", this.getSubmitUrl(), values, (response) =>
        this.submitCallback(response)
      );
    }
  }

  submitCallback(response) {
    this.state.loading = false;
    this.save();
    KnowledgeSet.get(this.state.profileId).load(CACHE_POLICY.UPDATE);
  }
}
