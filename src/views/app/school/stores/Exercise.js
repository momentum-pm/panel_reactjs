import RemoteStore, { CACHE_POLICY } from "../../../../stores/base/RemoteStore";
import Episode from "./Episode";
import Exercises from "./Exercises";
export default class Exercise extends RemoteStore {
  static storeName = "Exercise";
  static getActions() {
    return [...super.getActions(), "setAnswered"];
  }
  load() {
    let data;
    let index;
    if (this.state.episodeId) {
      let episode = Episode.get(this.state.episodeId);

      episode.state.data.exercises.forEach((e, i) => {
        if (e.id === this.state.exerciseId) {
          data = e;
          index = i;
        }
      });
      this.state.index = index;
    } else if (this.id) {
      let exercises = Exercises.get();

      exercises.state.data.forEach((e, i) => {
        if (e.id.toString() === this.id.toString()) {
          data = e;
          index = i;
        }
      });
      this.state.index = index;
    }
    this.success(data, 200);
  }
  setAnswered(answer, correct, isCorrect) {
    this.state.answered = true;
    this.state.answer = answer;
    this.state.correct = correct;
    this.state.isCorrect = isCorrect;
    this.save();
  }
}
