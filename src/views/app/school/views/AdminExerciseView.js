import Row from "../../../base/Row";
import { normalizeNumber } from "../../../../utils/StringUtils";
import "katex/dist/katex.min.css";
import katex from "katex";
import ButtonView from "../../../base/forms/button/ButtonView";
import React from "react";
import MasterColumn from "../../../base/MasterColumn";
import { BUTTON_TYPE } from "../../../../stores/base/form/buttons/Button";
import History from "../../../../History";
import Res from "../../../../assets/Res";
import CharField from "../../../../stores/base/form/fields/CharField";
import RemoteStoreView from "../../../base/RemoteStoreView";
import Exercise from "../stores/Exercise";
import { connect } from "../../../../stores/base/StoreManager";
import ExerciseAnswerFormView from "./ExerciseAnswerFormView";
export function LatexView({ latex, className }) {
  // latex = latex.replaceAll("$", "");
  // latex = latex.replaceAll("\\\\\\t", "\\\\t");
  // if (latex.startsWith("$.")) {
  //   latex = latex.substring(latex.indexOf(" ") + 1);
  // }
  // latex = latex.replaceAll("\\n", "");
  // latex = normalizeNumber(latex);
  // try{

  // }catch(E){
  //   latex = latex;
  // }
  latex = latex.replaceAll('\\"https', "https");
  latex = latex.replaceAll('\\"/', "");
  let parts = latex.split("$");

  let rendered = (
    <div className={`has-latex ${className}`}>
      {parts.map((part, index) => {
        let partTemp = part;
        part = part.replaceAll("circ", "\\\\\\circ");
        part = part.replaceAll("sin", "\\\\sin");

        part = part.replaceAll("\\mid", "\\\\mid");
        part = part.replaceAll("\\angle", "\\\\angle");
        part = part.replaceAll("\\perp", "\\\\\\\\perp");
        part = part.replaceAll("\\leq", "\\\\leq");
        part = part.replaceAll("\\ge", "\\\\ge");
        part = part.replaceAll("\\le", "\\\\le");
        part = part.replaceAll("\\binom", "\\\\binom");
        part = part.replaceAll("\\space", "\\\\space");
        part = part.replaceAll("\t", "\\\\t");
        part = part.replaceAll("\\n", "\\\\t");
        part = part.replaceAll("ldots", "\\\\ldots");
        part = part.replaceAll("sqrt", "\\\\\\sqrt");
        part = part.replaceAll("hat", "\\\\\\hat");
        part = part.replaceAll("alpha", "\\\\\\alpha");
        part = part.replaceAll("pi", "\\\\\\pi");
        part = part.replaceAll("beta", "\\\\\\beta");
        part = part.replaceAll("\\begin", "\\\\\\\\begin");
        part = part.replaceAll("\\end", "\\\\\\\\end");
        part = part.replaceAll("overbrace", "\\\\\\overbrace");
        part = part.replaceAll("circ", "\\\\\\circ");
        part = part.replaceAll("\\overline", "\\\\overline");
        part = part.replaceAll("\\Rightarrow", "\\\\Rightarrow");
        part = part.replaceAll("\\rightarrow", "\\\\rightarrow");
        part = part.replaceAll("circ", "\\\\\\circ");
        part = part.replaceAll("ldots", "\\\\\\ldots");
        part = part.replaceAll("frac", "\\frac");
        let isLatex =
          (index % 2 === 1 || partTemp !== part) &&
          partTemp.indexOf("http") === -1;
        if (isLatex) {
          // part = part.replaceAll("\\}","")
          part = part.replaceAll("wide", "");

          part = part.replaceAll("\\\\prime", "\\prime");
          // part = part.replaceAll("\\\\fraq","\\fraq")
          return (
            <span
              className="latex-part katex-render"
              dangerouslySetInnerHTML={{
                __html: katex.renderToString(part, {
                  displayMode: false,
                  output: "htmlAndMathml",
                }),
              }}
            />
          );
        } else {
          part = part.replaceAll("\\n", "");
          part = part.replaceAll('\\"""', "");
          part = part.replaceAll("src=h", 'src="h');
          return (
            <span
              className="latex-part default-render"
              dangerouslySetInnerHTML={{ __html: part }}
            />
          );
        }
      })}
    </div>
  );

  return rendered;
}
class AdminExerciseView extends React.Component {
  render() {
    let exercise = this.props.exercise;
    let index = this.props.index;
    return (
      <div className="">
        <Row className={`padding-two centered`}>
          <h6 className={"header-style"}>سوال {normalizeNumber(index + 1)}</h6>
          <MasterColumn>
            <Row className={"reverse"}>
              {exercise.hint ? (
                <ButtonView
                  type={BUTTON_TYPE.BUTTON}
                  onClick={() =>
                    History.pushMediumModal(
                      `/school/exercises/${exercise.id}/hint/`
                    )
                  }
                  title="راهنمایی"
                  className="flat  small primary low-margin"
                  icon={Res.icon.note}
                />
              ) : null}
              {exercise.answer ? (
                <ButtonView
                  type={BUTTON_TYPE.BUTTON}
                  onClick={() =>
                    History.pushMediumModal(
                      `/school/exercises/${exercise.id}/answer/`
                    )
                  }
                  title="راه حل"
                  className="flat  small secondary low-margin"
                  icon={Res.icon.eye}
                />
              ) : null}
              {exercise.link ? (
                <ButtonView
                  type={BUTTON_TYPE.EXTERNAL_LINK}
                  link={exercise.link}
                  title="لینک"
                  className="flat small secondary low-margin"
                  icon={Res.icon.hyperlink}
                />
              ) : null}
            </Row>
          </MasterColumn>
        </Row>
        <div className="padding-two">
          <LatexView latex={exercise.problem} />
        </div>
        <div className="padding-two">
          {exercise.exercise_items?.length > 0 ? (
            <ExerciseAnswerFormView
              exerciseId={exercise.id}
              episodeId={exercise.episode.id}
              exercise={exercise}
            />
          ) : null}
        </div>
      </div>
    );
  }
}
export default AdminExerciseView;
