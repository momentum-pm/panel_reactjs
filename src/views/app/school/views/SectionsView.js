import { withRouter } from "react-router";
import { connect } from "../../../../stores/base/StoreManager";
import NoLoadRemoteStoreView from "../../../base/NoLoadRemoteStoreView";
import Box from "../../../base/refactored/box/Box";
import EpisodeItemView from "./EpisodeItemView";
import Course from "../stores/Course";
import StepLinkView from "../../../base/forms/fields/stepView/StepLinkView";
import Body from "../../../base/Body";
import { normalizeNumber, toLangNumber } from "../../../../utils/StringUtils";
import Row from "../../../base/Row";
import IconTitleValueView from "../../../base/iconTitleValueView/IconTitleValueView";
import {
  getDurationText,
  getDurationTextShort,
} from "../../../../utils/DateUtils";
import Res from "../../../../assets/Res";
import MasterColumn from "../../../base/MasterColumn";
import StepView from "../../../base/forms/fields/stepView/StepView";
import ScrollableColumn from "../../../base/refactored/scrollable/ScrollableColumn";
import Scrollable from "../../../base/refactored/scrollable/Scrollable";
import ButtonView from "../../../base/forms/button/ButtonView";
import { BUTTON_TYPE } from "../../../../stores/base/form/buttons/Button";
import TagView from "../../../base/tag/TagView";
class SectionsView extends NoLoadRemoteStoreView {
  static getRemoteStore(props) {
    let courseSlug = props.match.params.courseSlug;
    return Course.map(courseSlug, { courseSlug });
  }

  getOkView() {
    return (
      <Box className={"hidden-overflow full-height"}>
        <ScrollableColumn className={"full-height"}>
          {this.getNavigationRow()}
          {/* <div className="header-row">
            <h2 className="">سرفصل ها</h2>
          </div> */}
          <Scrollable className={"padding-one"}>
            <ol>
              {this.getData().sections.map((section, index) =>
                this.renderSection(section, index, false)
              )}
            </ol>
          </Scrollable>
        </ScrollableColumn>
      </Box>
    );
  }
  renderSection(section, index, alwaysOpen) {
    return (
      <li
        className={`bordered-box low-margin section-view ${
          index === this.getState().openIndex || alwaysOpen
            ? "open-section"
            : "close-section"
        }`}
      >
        <div
          className="row centered section-title-view"
          onClick={() =>
            this.getState().openIndex === index
              ? this.getStore().setOpenIndex(-1)
              : this.getStore().setOpenIndex(index)
          }
        >
          <MasterColumn>
            <StepView
              index={index + 1}
              label={section.title}
              className={`medium ${section.containsFree ? "secondary" : ""}`}
            />
          </MasterColumn>
          {section.containsFree ? (
            <TagView
              title={"ویدیوی نمونه"}
              // icon={Res.icon.gift}
              className="secondary low-margin small"
            />
          ) : null}
          <IconTitleValueView
            icon={Res.icon.clock}
            className={""}
            value={getDurationTextShort(section.duration)}
          />
          <IconTitleValueView
            icon={Res.icon.note}
            className={""}
            value={`${normalizeNumber(section.episode_count)} ${
              Res.string.school.episodesTitle
            }`}
          />
        </div>
        <div className="padding-one">
          {section.subsections.map((section, index) =>
            this.renderSection(section, index, true)
          )}
          {section.episodes.map((episode, index) => (
            <EpisodeItemView
              episode={episode}
              courseSlug={this.getData().slug}
              active={this.getState().active}
              index={index}
              key={episode.id}
            />
          ))}
        </div>
      </li>
    );
  }

  getNavigationRow() {
    return (
      <Row className={"centered padding-two"}>
        <div className={"master-column padding-two-sides"}>
          <IconTitleValueView
            icon={Res.icon.play}
            value={
              this.getState().active ? this.getState().active.title : "سرفصل ها"
            }
            className="icon-primary large"
          />
        </div>
        {this.getState().active && this.getState().active.previous ? (
          <ButtonView
            type={BUTTON_TYPE.LINK}
            link={`/c/${this.getData().slug}/e/${
              this.getState().active.previous.id
            }/${this.getState().active.previous.slug}/`}
            className={`primary flat default`}
            about={Res.string.school.previous_episode}
            icon={Res.icon.backArrow}
          />
        ) : null}
        {this.getState().active && this.getState().active.next ? (
          <ButtonView
            type={BUTTON_TYPE.LINK}
            link={`/c/${this.getData().slug}/e/${
              this.getState().active.next.id
            }/${this.getState().active.next.slug}/`}
            className={`primary flat default`}
            about={Res.string.school.next_episode}
            icon={Res.icon.nextArrow}
          />
        ) : null}
      </Row>
    );
  }
}
export default withRouter(connect(SectionsView));
