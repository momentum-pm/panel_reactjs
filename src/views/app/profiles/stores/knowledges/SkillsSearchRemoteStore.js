import RemoteStore, {
  CACHE_POLICY,
} from "../../../../../stores/base/RemoteStore";
import Res from "../../../../../assets/Res";
import Status from "../../../../../utils/requests/Status";
import KnowledgeCreateForm from "./KnowledgeCreateForm";
import KnowledgeSet from "./KnowledgeSet";

export default class SkillsSearchRemoteStore extends RemoteStore {
  static storeName = "SkillsSearchRemoteStore";

  timer = undefined;

  onCreate() {
    let profileId = this.state.profileId;
    KnowledgeSet.get(profileId, { profileId }).subscribe(() => this.callback());
  }

  callback() {
    let profileId = this.state.profileId;
    this.state.hasKnowledgeSet =
      KnowledgeSet.get(profileId, { profileId }).state.data || [];
    this.save();
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

  getInitialState(args) {
    return {
      ...super.getInitialState(args),
      query: "",
      data: [],
      hasKnowledgeSet: [],
      profileId: args.profileId,
      loading: false,
    };
  }

  static getActions() {
    return [...super.getActions(), "setQuery", "getToShow"];
  }

  setQuery(skill) {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = undefined;
    this.state.query = skill;
    this.state.data = [];
    if (skill.length >= 1) {
      let profileId = this.state.profileId;
      let createStore = KnowledgeCreateForm.get(skill, { skill, profileId });
      createStore.setContext({ level: 0, skill });
      this.state.data = [{ skill, profileId }];
      this.state.loading = true;
      this.timer = setTimeout(() => this.load(CACHE_POLICY.IGNORE), 700);
    } else {
      this.state.loading = false;
    }
    this.save();
  }

  getParams() {
    return {
      query: this.state.query,
    };
  }

  getUrl() {
    return `profiles/profiles/${this.state.profileId}/knowledge-set/search/`;
  }

  success(data, status) {
    let profileId = this.state.profileId;
    this.state.loading = false;
    data = data.filter(
      (item) =>
        item.title_en !== this.state.query && item.title_fa !== this.state.query
    );
    data = data.map((item) => {
      let skill = Res.get_attribute(item, "title");
      let createStore = KnowledgeCreateForm.get(skill, { skill, profileId });
      createStore.setContext({ level: 0, skill });
      return { skill, profileId };
    });
    let skill = this.state.query;
    let createStore = KnowledgeCreateForm.get(skill, { skill, profileId });
    createStore.setContext({ level: 0, skill });
    data = [{ skill, profileId }, ...data];
    super.success(data, status);
  }

  failure(error, status) {
    this.success([], Status.OK_200);
  }

  created(skill) {
    if (skill === this.state.query) {
      this.setQuery("");
    } else {
      // this.state.data = this.state.data.filter(item => item.skill !== skill);
      // this.save();
    }
  }
}
