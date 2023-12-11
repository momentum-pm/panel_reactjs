import Row from "../../../base/Row";
import MasterColumn from "../../../base/MasterColumn";
import TagView from "../../../base/tag/TagView";
import ItemDescription from "../../../base/refactored/itemDescription/ItemDescription";
import {
  getDurationText,
  getDurationTextLong,
} from "../../../../utils/DateUtils";
import Column from "../../../base/Column";
import Res from "../../../../assets/Res";
import ButtonView from "../../../base/forms/button/ButtonView";
import { BUTTON_TYPE } from "../../../../stores/base/form/buttons/Button";
import React from "react";
import Link from "../../../base/Link";
import IconTitleValueView from "../../../base/iconTitleValueView/IconTitleValueView";
import ItemInfo from "../../../base/refactored/itemInfo/ItemInfo";
import StepView from "../../../base/forms/fields/stepView/StepView";

export default function EpisodeItemView({
  episode,
  active,
  courseSlug,
  index,
}) {
  return (
    <Link to={`/c/${courseSlug}/e/${episode.id}/${episode.slug}/`}>
      <div
        className={`clickable bordered-box low-margin ${
          active === episode.id ? "episode-item-active" : ""
        } ${index % 2 ? "-item" : ""}`}
      >
        <div className={"padding-one"}>
          <Row className={"centered"}>
            <MasterColumn>
              <Row className={"centered"}>
                <StepView
                  index={index + 1}
                  label={episode.title}
                  className={`medium ${episode.public ? "secondary" : ""}`}
                />
              </Row>
            </MasterColumn>
            {episode.public ? (
              <TagView
                title={"ویدیوی نمونه"}
                // icon={Res.icon.gift}
                className="secondary low-margin small"
              />
            ) : null}
            {active?.id === episode.id ? (
              <TagView
                className={"low-margin primary"}
                title={Res.string.school.watching}
              />
            ) : episode.catalogue && episode.catalogue.watched ? (
              <TagView
                className={"low-margin"}
                title={Res.string.school.watched}
              />
            ) : (
              <IconTitleValueView
                icon={Res.icon.clock}
                className={"x-small small small-text tiny"}
                value={getDurationText(episode.duration)}
              />
            )}
          </Row>
        </div>
      </div>
    </Link>
  );
}
