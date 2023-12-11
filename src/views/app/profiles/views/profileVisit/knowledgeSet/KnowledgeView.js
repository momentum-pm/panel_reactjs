import React from "react";
import "./KnowledgeView.scss";
import MasterColumn from "../../../../../base/MasterColumn";
import Row from "../../../../../base/Row";
import Res from "../../../../../../assets/Res";
import ScoreView from "../../../../../base/scoreView/ScoreView";

export default function KnowledgeView({ knowledge }) {
  return (
    <Row className={"centered full-width padding-one-sides"}>
      <MasterColumn>
        <p className="small"> {Res.get_attribute(knowledge.skill, "title")}</p>
      </MasterColumn>
      <ScoreView maxScore={5} score={knowledge.level}  className={'small'}/>
    </Row>
  );
}
