import RemoteStoreView from "../../../base/RemoteStoreView";
import Row from "../../../base/Row";
import ButtonView from "../../../base/forms/button/ButtonView";
import { BUTTON_TYPE } from "../../../../stores/base/form/buttons/Button";
import Res from "../../../../assets/Res";
import Box from "../../../base/refactored/box/Box";
import NotesView from "./NotesView";
import React from "react";
import Episode from "../stores/Episode";
import { withRouter } from "react-router";
import { connect } from "../../../../stores/base/StoreManager";
import History, { get_lang_free_url } from "../../../../History";
import TabsContainerView from "../../../base/tabView/TabsContainerView";
import Body from "../../../base/Body";
import LoadingView from "../../../base/refactored/loadingView/LoadingView";
import Column from "../../../base/Column";
import MasterColumn from "../../../base/MasterColumn";
import {
  getCurrency,
  normalizeNumber,
  splitDigits,
} from "../../../../utils/StringUtils";
import Course from "../stores/Course";
import DownloadFileIconView from "../../../base/downloadFileIconView/DownloadFileIconView";
import Thumbnail from "../../../base/refactored/thumbnail/Thumbnail";
import ItemInfo from "../../../base/refactored/itemInfo/ItemInfo";
import IconTitleValueView from "../../../base/iconTitleValueView/IconTitleValueView";
import { getDurationTextLong } from "../../../../utils/DateUtils";
import CommentView from "./CommentView";
import CommentCreateView from "./CommentCreateView";
import RichText from "../../../base/richText/RichText";
import ExerciseView from "./ExerciseView";
import Auth from "../../../auth/stores/Auth";
import QuickLoginView from "../../../auth/views/QuickLoginView";

class EpisodeShowView extends RemoteStoreView {
  static getRemoteStore(props) {
    let episodeSlug = props.slug;
    let courseSlug = props.match.params.courseSlug;
    let episodeId = props.id;
    return Episode.map(episodeId, { courseSlug, episodeSlug, episodeId });
  }

  static mapPropsToStores(props) {
    let courseSlug = props.match.params.courseSlug;
    return {
      ...super.mapPropsToStores(props),
      course: Course.map(courseSlug, { courseSlug }),
    };
  }

  constructor(props) {
    super(props);
    this.hashedRefs = {
      notes: React.createRef(),
      files: React.createRef(),
      comments: React.createRef(),
      exercises: React.createRef(),
    };
    this.state = {};
  }

  getData() {
    let superData = super.getData();
    if (superData) {
      return superData;
    } else {
      return this.getError();
    }
  }

  getOkView() {
    let courses = this.getData().related_courses;
    let count = courses?.length;
    return (
      <div>
        {this.getData().is_related ? (
          <div className={"player-box"}>
            <Row className={"full-height"}>
              <Column className={"half-column full-height"}>
                <MasterColumn className={""}>
                  {this.getCourseView(courses[0])}
                </MasterColumn>
                {count > 2 ? (
                  <MasterColumn className={"background-light"}>
                    {this.getCourseView(courses[2])}
                  </MasterColumn>
                ) : null}
              </Column>
              <Column className={"half-column full-height"}>
                {count > 1 ? (
                  <MasterColumn className={"background-light"}>
                    {this.getCourseView(courses[1])}
                  </MasterColumn>
                ) : null}
                {count > 3 ? (
                  <MasterColumn className={""}>
                    {this.getCourseView(courses[3])}
                  </MasterColumn>
                ) : null}
              </Column>
            </Row>
          </div>
        ) : this.getData().config_url ? (
          <Box className={"hidden-overflow no-margin-responsive"}>
            <div className={"player-container"}>
              <LoadingView className={"mask"} />
              <iframe
                className={"player"}
                title={this.getData().title}
                src={this.getData().config_url}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen="true"
              />
            </div>
          </Box>
        ) : this.getData().video_on_register ? (
          <Box className={"hidden-overflow no-margin-responsive"}>
            <div className={"player-container"}>
              <div className="player">
                <div className="row centered full-height">
                  <Column className={"centered full-width"}>
                    <Row className={"full-width"}>
                      <MasterColumn className={"column centered"}>
                        <h4 className={"center margin-one success"}></h4>
                        <Row className={"centered"}>
                          <QuickLoginView
                            title={"ویدیوی رایگان"}
                            message={
                              "برای مشاهده این ویدیو فقط کافیست با شماره موبایل خود وارد شوید. "
                            }
                            id={this.props.location.pathname}
                            callbackUrl={this.props.location.pathname}
                            callbackFunction={() => this.getStore().load()}
                          />
                        </Row>
                      </MasterColumn>
                    </Row>
                  </Column>
                </div>
              </div>
            </div>
          </Box>
        ) : null}
        {this.getContentRow()}
      </div>
    );
  }

  getFailedView() {
    if (this.getState().status === 402) {
      return (
        <div className="">
          <Box className={"player-container hidden-overflow"}>
            <div className={"player"}>
              <Body className={"full-height"}>
                <Column className={"full-height full-width centered"}>
                  <Row className={"centered full-height full-width"}>
                    <Column className={"centered full-width"}>
                      <div className={" padding-two "}>
                        <h3 className={"center"}>
                          {Res.string.school.buy_to_continue}
                        </h3>
                      </div>
                      <Row className={"full-width padding-two"}>
                        <MasterColumn className={"column centered"}>
                          <h4 className={"center margin-two success"}>{`${
                            Res.string.school.course_sell
                          }: ${getCurrency(
                            this.props.course.state.data.price
                          )}`}</h4>
                          <Row className={"centered"}>
                            <ButtonView
                              id={this.props.course.state.purchaseButton.id}
                            />
                            <ButtonView
                              type={BUTTON_TYPE.EXTERNAL_LINK}
                              link={"tel:02188740578"}
                              icon={Res.icon.call}
                              title={"مشاوره رایگان 02188740578"}
                              className={"bordered white large"}
                            />
                          </Row>
                        </MasterColumn>
                      </Row>
                      {/*<p className={'title success'}>{Res.string.school.refund}</p>*/}
                    </Column>
                  </Row>
                </Column>
              </Body>
            </div>
          </Box>
        </div>
      );
    } else {
      return super.getFailedView();
    }
  }

  getCourseView(course) {
    return (
      <a
        target={"_blank"}
        href={`/c/${course.slug}`}
        rel={"noopener noreferrer"}
        className={"full-height block-display clickable"}
      >
        <Row className={"full-height centered"}>
          <Row className={"padding-one master-column"}>
            <Thumbnail
              alt={course.title}
              className={"large"}
              src={course.cover}
            />
            <MasterColumn>
              <div className={"padding-one"}>
                <ItemInfo>{course.title}</ItemInfo>
                <div className={"padding-one-before-after"}>
                  <IconTitleValueView
                    // icon={Res.icon.clock}
                    title={"طول دوره"}
                    className={"expanded"}
                    value={getDurationTextLong(course.duration)}
                  />
                  <IconTitleValueView
                    // icon={Res.icon.edit}
                    className={"expanded"}
                    title={Res.string.school.episodes}
                    value={`${splitDigits(course.episode_count)} ${
                      Res.string.school.episode
                    }`}
                  />
                </div>
              </div>
              <Row className={"reverse"}>
                <ButtonView
                  type={BUTTON_TYPE.FAKE}
                  icon={Res.icon.nextArrow}
                  title={Res.string.school.view_course_2}
                  className={"raised success"}
                />
              </Row>
            </MasterColumn>
          </Row>
        </Row>
      </a>
    );
  }

  getLoadingView() {
    return (
      <div>
        <Box className={"hidden-overflow"}>
          <div className={"player-container"}>
            <div className={"player"}>
              <LoadingView className={"mask"} />
            </div>
          </div>
        </Box>
      </div>
    );
  }

  getContentRow() {
    return (
      <Box className={"white-background hidden-overflow"}>
        {this.getTabsView()}
        <div className={"episode-content-notes"}>
          {this.getData().notes?.length > 51 ? (
            <div ref={this.hashedRefs.notes}>
              <div className="header-row">
                <h2>{Res.string.school.notes}</h2>
                <RichText className={"padding-two-before-after"}>
                  {this.getData().notes}
                </RichText>
              </div>
            </div>
          ) : null}
          {this.getData().files?.length ? (
            <div
              className={"padding-two"}
              id={"files"}
              ref={this.hashedRefs.files}
            >
              <div className="header-row">
                <h2>{Res.string.school.files}</h2>
              </div>
              <Row>
                {this.getData().files.map((item) => (
                  <DownloadFileIconView fileAddress={item} />
                ))}
              </Row>
            </div>
          ) : null}

          {this.getData().exercises?.length ? (
            <div
              className={"padding-two"}
              id={"exercises"}
              ref={this.hashedRefs.exercises}
            >
              <div className="header-row">
                <h2>{Res.string.school.exercises}</h2>
              </div>
              <Row>
                {this.getData().exercises.map((exercise, index) => (
                  <ExerciseView exercise={exercise} episode={this.getData()} />
                ))}
              </Row>
            </div>
          ) : null}
          <div
            className={"padding-two"}
            id={"comments"}
            ref={this.hashedRefs.comments}
          >
            <div className="header-row">
              <h2>{Res.string.school.comments}</h2>
            </div>
            <CommentCreateView />
            <Row>
              {this.getData().comments?.map((comment) => (
                <CommentView comment={comment} commentType={"episode"} />
              ))}
            </Row>
          </div>
        </div>
      </Box>
    );
  }

  getTabsView() {
    let path = this.props.location.pathname + this.props.location.hash;
    path = get_lang_free_url(path);
    let basePath = `/c/${this.props.course.state.data.slug}/e/${
      this.getData()?.id
    }/${this.getData()?.slug}/`;
    return (
      <TabsContainerView className={" z-index-2"}>
        {this.getData().notes?.length > 51 ? (
          <ButtonView
            type={BUTTON_TYPE.BUTTON}
            onClick={() => {
              History.replace(`${basePath}#notes`);
              this.hashedRefs.notes.current.scrollIntoView();
            }}
            className={`flat small ${
              path === basePath + "#notes" || path === basePath ? "primary" : ""
            }`}
            icon={Res.icon.check}
            title={Res.string.school.notes}
          />
        ) : null}
        {this.getData().files?.length ? (
          <ButtonView
            type={BUTTON_TYPE.BUTTON}
            onClick={() => {
              History.replace(`${basePath}#files`);
              this.hashedRefs.files.current.scrollIntoView();
            }}
            className={`flat small ${
              path === basePath + "#files" ? "primary" : ""
            }`}
            icon={Res.icon.attach}
            title={`${Res.string.school.files} (${normalizeNumber(
              this.getData().files.length
            )})`}
          />
        ) : null}

        {this.getData().exercises?.length ? (
          <ButtonView
            type={BUTTON_TYPE.BUTTON}
            onClick={() => {
              History.replace(`${basePath}#exercises`);
              this.hashedRefs.exercises.current.scrollIntoView();
            }}
            className={`flat small ${
              path === basePath + "#exercises" ? "primary" : ""
            }`}
            icon={Res.icon.note}
            title={`${Res.string.school.exercises} (${normalizeNumber(
              this.getData().exercises.length
            )})`}
          />
        ) : null}

        <ButtonView
          type={BUTTON_TYPE.BUTTON}
          onClick={() => {
            History.replace(`${basePath}#comments`);
            this.hashedRefs.comments.current.scrollIntoView();
          }}
          className={`flat small ${
            path === basePath + "#comments" ? "primary" : ""
          }`}
          icon={Res.icon.comment}
          title={`${Res.string.school.comments} (${normalizeNumber(
            this.getData().comments?.length
          )})`}
        />
      </TabsContainerView>
    );
  }
}

export default withRouter(connect(EpisodeShowView));
