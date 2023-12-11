import Form from "../../../../../stores/base/form/Form";
import ScoreField from "../../../../../stores/base/form/fields/ScoreField";
import HiddenField from "../../../../../stores/base/form/fields/HiddenField";
import KnowledgeSet from "./KnowledgeSet";
import { CACHE_POLICY } from "../../../../../stores/base/RemoteStore";
import Requester from "../../../../../utils/requests/Requester";
import Status from "../../../../../utils/requests/Status";
import SkillsSearchRemoteStore from "./SkillsSearchRemoteStore";
import SkillsSuggestionRemoteStore from "./SkillsSuggestionRemoteStore";

export default class KnowledgeCreateForm extends Form {
  static storeName = "KnowledgeCreateForm";

  getInitialState(args) {
    return {
      ...super.getInitialState(args),
      loading: false,
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
    return `profiles/profiles/${this.state.profileId}/knowledge-set/`;
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
    super.setContext(context);
    this.getField("level").setProperty("label", context.skill);
  }

  onFieldChange(field) {
    if (field.state.name === "level") {
      if (field.state.value && field.state.value > 0) {
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
    let profileId = this.state.profileId;

    if (Status.isOk(response.status)) {
      SkillsSearchRemoteStore.get(profileId, { profileId }).created(
        this.state.skill
      );
      SkillsSuggestionRemoteStore.get(profileId, { profileId }).created(
        this.state.skill
      );
      KnowledgeSet.get(this.state.profileId).load(CACHE_POLICY.UPDATE);
    } else {
      this.setContext(this.state.context);
    }
  }
}
