import React from "react";
import ScrollableColumn from "../../../base/refactored/scrollable/ScrollableColumn";
import Scrollable from "../../../base/refactored/scrollable/Scrollable";
import Row from "../../../base/Row";
import MasterColumn from "../../../base/MasterColumn";
import { getCurrency, splitDigits } from "../../../../utils/StringUtils";
import Res from "../../../../assets/Res";
import ButtonView from "../../../base/forms/button/ButtonView";
import IconTitleValueView from "../../../base/iconTitleValueView/IconTitleValueView";
import { withRouter } from "react-router";
import RemoteStoreView from "../../../base/RemoteStoreView";
import Course from "../stores/Course";
import { connect } from "../../../../stores/base/StoreManager";
import EpisodeShowView from "./EpisodeShowView";
import { getDurationTextLong } from "../../../../utils/DateUtils";
import EpisodeItemView from "./EpisodeItemView";
import SlaveColumn from "../../../base/SlaveColumn";
import Box from "../../../base/refactored/box/Box";
import Body from "../../../base/Body";
import Episode from "../stores/Episode";
import SectionsView from "./SectionsView";
import Column from "../../../base/Column";
class CoursePage extends RemoteStoreView {
  static getRemoteStore(props) {
    let episodeSlug = props.match.params.episodeSlug;
    let episodeId = props.match.params.episodeId;
    let courseSlug = props.match.params.courseSlug;
    return Course.map(courseSlug, { episodeSlug, episodeId, courseSlug });
  }

  getEpisodeSlug() {
    return this.props.match.params.episodeSlug;
  }

  getEpisodeId() {
    return parseInt(this.props.match.params.episodeId);
  }
  getSaleView() {
    return (
      <div className={"course-header-container desktop-only"}>
        <img
          src={this.getData().cover}
          className={"course-image"}
          alt={this.getData().title}
        />
        <Body>
          <Row>
            <MasterColumn>
              <IconTitleValueView
                icon={Res.icon.clock}
                title={"طول دوره"}
                className={"vertical primary"}
                value={getDurationTextLong(this.getData().duration)}
              />
            </MasterColumn>
            <MasterColumn>
              <IconTitleValueView
                icon={Res.icon.note}
                className={"vertical primary"}
                title={Res.string.school.episodes}
                value={`${splitDigits(this.getData().episode_count)} ${
                  Res.string.school.episode
                }`}
              />
            </MasterColumn>
            <MasterColumn>
              <IconTitleValueView
                icon={Res.icon.eye}
                className={"vertical primary bold"}
                title={Res.string.school.views}
                value={splitDigits(this.getData().views)}
              />
            </MasterColumn>
          </Row>
          {this.getState().showButton ? (
            <div className="padding-two-top">
              <h4 className={"center success"}>{`${
                Res.string.school.course_sell
              }: ${getCurrency(this.getData().price)}`}</h4>
              <ButtonView id={this.getState().purchaseButton.id} />
            </div>
          ) : null}
        </Body>
      </div>
    );
  }


  getOkView() {
    return (
      <ScrollableColumn className={`full-height`}>
        <Scrollable>
          <div className="container full-height">
            <Row className={"padding-one-desktop desktop-reverse"}>
              <MasterColumn className={"full-responsive"}>
                <EpisodeShowView
                  slug={this.getEpisodeSlug()}
                  id={this.getEpisodeId()}
                />
              </MasterColumn>
              <SlaveColumn
                className={"dominant full-height with-fixed-in-scroll"}
              >
                <div className={"fixed-in-scroll right"}>{this.getEpisodes()}</div>
                {/* <Box className={"hidden-overflow"}>{this.getSaleView()}</Box> */}
              </SlaveColumn>
            </Row>
          </div>
        </Scrollable>
      </ScrollableColumn>
    );
  }
  getEpisodes() {
    return (
      <SectionsView slug={this.getEpisodeSlug()} id={this.getEpisodeId()} />
    );
  }
}

export default withRouter(connect(CoursePage));
