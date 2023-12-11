import Button from "../../../../stores/base/form/buttons/Button";
import { normalizeNumber } from "../../../../utils/StringUtils";
import CharField from "../../../../stores/base/form/fields/CharField";
import BulletField from "../../../../stores/base/form/fields/BulletField";
import { LatexView } from "../views/ExerciseView";
import Exercise from "./Exercise";
import Form from "../../../../stores/base/form/Form";
import MasterColumn from "../../../base/MasterColumn";
export default class ExerciseAnswerForm extends Form {
  static storeName = "ExerciseAnswerForm";

  createButtons(args) {
    let exercise = args.exercise;
    if (exercise.exercise_items.length === 1) {
      return [
        Button.createSubmit({
          title: "ثبت پاسخ",
          className: "raised  secondary",
          onClick: () => this.submit(),
        }),
      ];
    } else {
      return [];
    }
    return [];
  }
  createFields(args) {
    let exercise = args.exercise;
    if (exercise.exercise_items.length === 1) {
      return [
        CharField.create({
          name: "charField",
          className: "master-column compact-form",
          placeholder: "پاسخ شما...",
        }),
      ];
    } else {
      return [
        BulletField.create({
          name: "bulletField",
          items: exercise.exercise_items,
          itemToView: (item, index) => (
            <div className="exercise-item centered padding-one row">
              <div className="item-index">{normalizeNumber(index + 1)}</div>
              <MasterColumn>
                <LatexView latex={item.content} />
              </MasterColumn>
            </div>
          ),
          itemToTitle: (item) => item.content,
          itemToValue: (item) => item.id,
        }),
      ];
    }
  }
  submit() {
    let answered = this.getValue("charField").toString();
    let correct = this.state.exercise.exercise_items[0].content;
    let isCorrect = answered === correct;
    Exercise.get(this.state.exercise.id).setAnswered(
      answered,
      correct,
      isCorrect
    );
  }
  onFieldChange(field) {
    let value = this.getField("bulletField")?.state.item;
    if (value) {
      let answered = value.content;
      let correct = this.state.exercise.exercise_items.find(
        (item) => item.correct
      ).content;
      let isCorrect = value.correct;
      if (Exercise.exists(this.state.exercise.id)) {
        Exercise.get(this.state.exercise.id).setAnswered(
          answered,
          correct,
          isCorrect
        );
      }
    }
  }
}
