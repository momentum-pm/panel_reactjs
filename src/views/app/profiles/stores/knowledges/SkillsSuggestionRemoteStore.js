import RemoteStore, {
  CACHE_POLICY,
} from "../../../../../stores/base/RemoteStore";
import Res from "../../../../../assets/Res";
import KnowledgeCreateForm from "./KnowledgeCreateForm";
import Status from "../../../../../utils/requests/Status";
import KnowledgeSet from "./KnowledgeSet";

export default class SkillsSuggestionRemoteStore extends RemoteStore {
  static storeName = "SkillsSuggestionRemoteStore";

  getInitialState(args) {
    return {
      ...super.getInitialState(args),
      data: [],
      hasKnowledgeSet: [],
    };
  }

  static getActions() {
    return [...super.getActions(), "getToShow"];
  }

  onCreate() {
    super.onCreate();
    let profileId = this.state.profileId;
    KnowledgeSet.get(profileId, { profileId }).subscribe(() => this.callback());
  }

  callback() {
    let profileId = this.state.profileId;
    this.state.hasKnowledgeSet =
      KnowledgeSet.get(profileId, { profileId }).state.data || [];
    this.save();
    if (this.state.hasKnowledgeSet.length > 0) {
      this.created();
    }
  }

  getToShow() {
    return this.state.data.filter((item) => {
      let hasKnowledge = false;
      this.state.hasKnowledgeSet.forEach((hasKnowledgeItem) => {
        if (
          hasKnowledgeItem.skill.title_en === item.skill ||
          hasKnowledgeItem.skill.title_fa === item.skill
        ) {
          hasKnowledge = true;
        }
      });
      return !hasKnowledge;
    });
  }

  getUrl() {
    return `profiles/profiles/${this.state.profileId}/knowledge-set/suggestions/`;
  }

  success(data, status) {
    let profileId = this.state.profileId;
    data = data.map((item) => {
      let skill = Res.get_attribute(item, "title");
      let createStore = KnowledgeCreateForm.get(skill, { skill, profileId });
      createStore.setContext({ level: 0, skill });
      return { skill, profileId };
    });
    super.success(data, status);
  }

  failure(error, status) {
    this.success([], Status.OK_200);
  }

  created() {
    // this.state.data = this.state.data.filter(item => item.skill !== skill);
    // this.save();
    this.load(CACHE_POLICY.UPDATE);
  }
}
