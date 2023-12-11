import React from "react";
import MasterColumn from "../../../../base/MasterColumn";
import ButtonView from "../../../../base/forms/button/ButtonView";
import Row from "../../../../base/Row";
import StepView from "../../../../base/forms/fields/stepView/StepView";
export default function AuthorEpisodeView({ episode }) {
  return (
    <div className={"bordered-box low-"}>
      <Row className={"centered"}>
        <MasterColumn>
          <StepView className="small" index={episode.order} label={episode.title} />
        </MasterColumn>
        {episode.buttons.map((button) => (
          <ButtonView id={button.id} />
        ))}
      </Row>
    </div>
  );
}
