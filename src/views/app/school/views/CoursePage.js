import React from "react";
import ScrollableColumn from "../../../base/refactored/scrollable/ScrollableColumn";
import Scrollable from "../../../base/refactored/scrollable/Scrollable";
import Row from "../../../base/Row";
import MasterColumn from "../../../base/MasterColumn";
import {
  getCurrency,
  normalizeNumber,
  splitDigits,
} from "../../../../utils/StringUtils";
import Res from "../../../../assets/Res";
import ButtonView from "../../../base/forms/button/ButtonView";
import IconTitleValueView from "../../../base/iconTitleValueView/IconTitleValueView";
import { withRouter } from "react-router";
import CourseCommentCreateView from "./CourseCommentCreateView";
import CommentView from "./CommentView";
import RemoteStoreView from "../../../base/RemoteStoreView";
import Course from "../stores/Course";
import { connect } from "../../../../stores/base/StoreManager";
import {
  getDurationTextLong,
  getDurationTextShort,
} from "../../../../utils/DateUtils";
import CoursePostView from "./CoursePostView";
import SlaveColumn from "../../../base/SlaveColumn";
import Box from "../../../base/refactored/box/Box";
import Body from "../../../base/Body";
import SectionsView from "./SectionsView";
import TabsContainerView from "../../../base/tabView/TabsContainerView";
import Button, {
  BUTTON_TYPE,
} from "../../../../stores/base/form/buttons/Button";
import History from "../../../../History";
import AuthorsView from "./AuthorsView";
import RichText from "../../../base/richText/RichText";
import Thumbnail from "../../../base/refactored/thumbnail/Thumbnail";
import VLine from "../../../base/VLine";
import Column from "../../../base/Column";
import SchoolCourseView from "./SchoolCourseView";

export function PackageView({ p, i }) {
  return (
    <div className="bordered-box golden-gradient full-width">
      <div className="padding-one">
        <p className="center bold padding-one">{p.title}</p>
      </div>
      <div className="padding-four-sides">
        <ul className="stylish">
          {p.courses?.map((item) => (
            <li>{item.title}</li>
          ))}
        </ul>
      </div>

      <div className={"padding-two-sides"}>
        <Row className={"centered full-width"}>
          <p className="line-through text-secondary">
            {normalizeNumber(p.actual_price)}
          </p>
          <p className="success title bold padding-one-sides">
            {getCurrency(p.price)}
          </p>
        </Row>
      </div>
      <div className="padding-one">
        <ButtonView
          type={BUTTON_TYPE.BUTTON}
          onClick={() => p.onClick()}
          className="raised primary large"
          title="خرید این پکیج"
          loading={p.loading}
          icon={Res.icon.shop}
        />
      </div>
    </div>
  );
}

const links = [
  {
    hash: "about",
    title: "معرفی",
    icon: Res.icon.check,
    isDefault: true,
  },
  {
    hash: "students",
    title: "مخاطبین",
    icon: Res.icon.profile,
  },
  {
    hash: "pre-course",
    title: "پیشنیاز ها",
    icon: Res.icon.login,
  },
  {
    hash: "teachers",
    title: "اساتید دوره",
    icon: Res.icon.education,
  },
  {
    hash: "sections",
    title: "سرفصل ها",
    icon: Res.icon.note,
  },
  {
    hash: "comments",
    title: "نظرات",
    icon: Res.icon.comment,
  },
];
class CoursePage extends RemoteStoreView {
  static getRemoteStore(props) {
    let courseSlug = props.match.params.courseSlug;
    return Course.map(courseSlug, { courseSlug });
  }
  constructor(props) {
    super(props);
    this.state = {
      currentHash: this.props.location.hash,
      scrollStates: {},
      showSalesButton: false,
    };
    this.linkRefs = {};
    links.forEach((link) => {
      this.linkRefs[link.hash] = React.createRef();
    });
    this.scrollableRef = React.createRef();
  }
  componentDidUpdate() {
    let data = this.getData() || {};

    if (this.props.location.hash !== this.state.currentHash) {
      let nextHash = this.props.location.hash;
      this.setState({ currentHash: nextHash });
      if (nextHash.startsWith("#")) {
        nextHash = nextHash.substring(1);
      }
      if (!nextHash) {
        nextHash = "about";
      }
      this.linkRefs[nextHash].current.scrollIntoView();

      // this.scrollableRef.current.scrollTo();
    }
  }

  scrolled() {
    let scrollTop = this.scrollableRef.current.scrollTop;
    if (scrollTop > 600 && !this.state.showSalesButton) {
      console.log("SETTTING");
      this.setState({ showSalesButton: true });
    }
    if (scrollTop < 500 && this.state.showSalesButton) {
      this.setState({ showSalesButton: false });
    }
  }

  getSaleView() {
    let data = this.getData();
    let episode;
    if (this.getData().has_access) {
      episode = this.getData().last_watched || this.getData().first;
    }
    return (
      <div className="scrollable-column full-height">
        <img
          className="desktop-only full-width"
          alt={this.getData().title}
          src={this.getData().cover}
        />
        <div className="scrollable">
          <div className="padding-one">
            <h1 className="center responsive-only header">
              {this.getData().title}
            </h1>
            <Row className={"responsive-only"}>
              <div className=" master-column">
                <IconTitleValueView
                  icon={Res.icon.clock}
                  title={"طول دوره"}
                  className={"vertical primary"}
                  value={getDurationTextShort(this.getData().duration)}
                />
              </div>
              <VLine />
              <div className=" master-column">
                <IconTitleValueView
                  icon={Res.icon.note}
                  className={"vertical primary"}
                  title={Res.string.school.episodes}
                  value={`${splitDigits(this.getData().episode_count)} ${
                    Res.string.school.episode
                  }`}
                />
              </div>
              <VLine />

              <div className=" master-column">
                <IconTitleValueView
                  icon={Res.icon.eye}
                  className={"vertical primary"}
                  title={Res.string.school.access_count}
                  value={
                    splitDigits(this.getData().access_count) +
                    " " +
                    Res.string.people
                  }
                />
              </div>
            </Row>
            {this.getData().has_access && episode ? (
              <div className="">
                <p className="header center">ادامه یادگیری</p>
                <Row className={"centered"}>
                  <MasterColumn className={"padding-one"}>
                    <p>{episode.title}</p>
                  </MasterColumn>
                  <ButtonView
                    type={BUTTON_TYPE.LINK}
                    title={"مشاهده"}
                    className={"raised large primary"}
                    icon={Res.icon.nextArrow}
                    link={`/c/${data.slug}/e/${episode.id}/${episode.slug}/`}
                  />
                </Row>
              </div>
            ) : (
              <div className="">
                <p className="header center">ثبت نام در این دوره</p>
                <Row className={"centered"}>
                  <MasterColumn className={"padding-one"}>
                    {this.getData().actual_price ? (
                      <p className="line-through small">
                        {splitDigits(this.getData().actual_price)}
                      </p>
                    ) : null}
                    <p className="primary">
                      {getCurrency(this.getData().price)}
                    </p>
                  </MasterColumn>
                  <ButtonView id={this.getState().purchaseButton.id} />
                </Row>
                {this.getData().packages?.length ? (
                  <div className="">
                    <p className="header responsive-only center">
                      یا به همراه این دوره ها
                    </p>
                    {this.getData().packages?.map((p) => (
                      <PackageView p={p} i={this.getData().thumbnail_image} />
                    ))}
                  </div>
                ) : null}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  getOkView() {
    let data = this.getData();
    let episode;
    if (this.getData().has_access) {
      episode = this.getData().last_watched || this.getData().first;
    }

    return (
      <ScrollableColumn className={`full-height`}>
        {this.getTabsView()}
        <div
          className={"scrollable"}
          ref={this.scrollableRef}
          onScroll={() => this.scrolled()}
        >
          <div></div>
          <div className="container">
            <div className="padding-one-desktop">
              <Row className={" desktop-reverse"}>
                <SlaveColumn className={"dominant"}>
                  <div className="desktop-only  fixed-in-scroll left after-tabs ">
                    <Box
                      className={
                        "hidden-overflow full-height responsive-no-margin"
                      }
                    >
                      {this.getSaleView()}
                    </Box>
                  </div>
                </SlaveColumn>

                <MasterColumn className={"full-responsive"}>
                  <Box className={"hidden-overflow responsive-no-margin"}>
                    <div className={"course-post-image-container"}>
                      {this.getData().teaser_config_url ? (
                        <iframe
                          className={"course-post-image"}
                          title={this.getData().title}
                          src={this.getData().teaser_config_url}
                          frameBorder="0"
                          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen="true"
                        />
                      ) : (
                        <img
                          className={"course-post-image"}
                          src={this.getData().cover}
                        />
                      )}
                    </div>
                  </Box>
                  <Box
                    className={
                      "hidden-overflow responsive-no-margin responsive-only"
                    }
                  >
                    {this.getSaleView()}
                  </Box>
                  {links.map((link) => {
                    return (
                      <div
                        className="tab-container"
                        id={link.hash}
                        ref={this.linkRefs[link.hash]}
                      >
                        {/* {link.hash === "about" && <SectionsView />} */}
                        {/* {link.hash === "students" && <SectionsView />} */}
                        {/* {link.hash === "pre-course" && <SectionsView />} */}

                        {link.hash === "about" ? (
                          <Box>
                            <Row className={"desktop-only"}>
                              <div className=" master-column">
                                <IconTitleValueView
                                  icon={Res.icon.clock}
                                  title={"طول دوره"}
                                  className={
                                    "vertical large large-icon primary"
                                  }
                                  value={getDurationTextShort(
                                    this.getData().duration
                                  )}
                                />
                              </div>
                              <VLine />
                              <div className=" master-column">
                                <IconTitleValueView
                                  icon={Res.icon.note}
                                  className={
                                    "vertical large large-icon primary"
                                  }
                                  title={Res.string.school.episodes}
                                  value={`${splitDigits(
                                    this.getData().episode_count
                                  )} ${Res.string.school.episode}`}
                                />
                              </div>
                              <VLine />

                              <div className=" master-column">
                                <IconTitleValueView
                                  icon={Res.icon.eye}
                                  className={
                                    "vertical large large-icon primary"
                                  }
                                  title={Res.string.school.access_count}
                                  value={
                                    splitDigits(this.getData().access_count) +
                                    " " +
                                    Res.string.people
                                  }
                                />
                              </div>
                            </Row>

                            <div className="padding-two-sides">
                              <Row>
                                <h2 className="header-style">معرفی دوره</h2>
                              </Row>
                              <RichText
                                className={
                                  "margin-two-desktop padding-two-before-after"
                                }
                              >
                                {this.getData().about_course_long}
                              </RichText>
                              {this.getData().children.length ? (
                                <div className="padding-two-sides">
                                  <Row>
                                    {this.getData().children.map((item) => (
                                      <MasterColumn>
                                        <SchoolCourseView course={item}  showPrice={true}/>
                                      </MasterColumn>
                                    ))}
                                  </Row>
                                </div>
                              ) : null}
                            </div>
                          </Box>
                        ) : null}
                        {link.hash === "students" ? (
                          <Box>
                            <Body>
                              <Row>
                                <h2 className="header-style">مخاطبین دوره</h2>
                              </Row>
                              <RichText
                                className={
                                  "margin-two-desktop padding-two-before-after"
                                }
                              >
                                {this.getData().students}
                              </RichText>
                            </Body>
                          </Box>
                        ) : null}
                        {link.hash === "pre-course" ? (
                          <Box>
                            <Body>
                              <Row>
                                <h2 className="header-style">پیش نیاز ها</h2>
                              </Row>
                              <RichText
                                className={
                                  "margin-two-desktop padding-two-before-after"
                                }
                              >
                                {this.getData().pre_course}
                              </RichText>
                            </Body>
                          </Box>
                        ) : null}
                        {link.hash === "teachers" && <AuthorsView />}
                        {link.hash === "sections" && <SectionsView />}
                        {link.hash === "comments" && (
                          <div className={"box"} id={"comments"}>
                            <Body>
                              <div className="header-row">
                                <h2>{Res.string.school.comments}</h2>
                              </div>
                              <CourseCommentCreateView />
                              <Row>
                                {this.getData().comments?.map((comment) => (
                                  <CommentView
                                    comment={comment}
                                    commentType="course"
                                  />
                                ))}
                              </Row>
                            </Body>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </MasterColumn>
              </Row>
            </div>
          </div>
        </div>
        <div
          className={`full-width responsive-only desktop-boxed ${
            this.state.showSalesButton
              ? "course-sales-show"
              : "course-sales-hide"
          }`}
        >
          <div className="container">
            <Row>
              <MasterColumn className={" padding-two-sides"}>
                {this.getData().has_access && episode ? (
                  <Row className={"centered padding-one-before-after"}>
                    <MasterColumn className={"padding-one-desktop"}>
                      <p>{episode.title}</p>
                    </MasterColumn>
                    <ButtonView
                      type={BUTTON_TYPE.LINK}
                      title={"مشاهده"}
                      className={"raised desktop-only large primary"}
                      icon={Res.icon.nextArrow}
                      link={`/c/${data.slug}/e/${episode.id}/${episode.slug}/`}
                    />
                    <ButtonView
                      type={BUTTON_TYPE.LINK}
                      title={"مشاهده"}
                      className={"raised responsive-onlu low-margin primary"}
                      icon={Res.icon.nextArrow}
                      link={`/c/${data.slug}/e/${episode.id}/${episode.slug}/`}
                    />
                  </Row>
                ) : (
                  <Row className={"bottomed padding-one-before-after"}>
                    <MasterColumn className={"padding-one-desktop"}>
                      {this.getData().actual_price ? (
                        <p className="line-through small">
                          {splitDigits(this.getData().actual_price)}
                        </p>
                      ) : null}
                      <p className="primary">
                        {getCurrency(this.getData().price)}
                      </p>
                    </MasterColumn>
                    <ButtonView id={this.getState().purchaseButton.id} />
                  </Row>
                )}
              </MasterColumn>
              <SlaveColumn className={"dominant"}></SlaveColumn>
            </Row>
          </div>
        </div>
      </ScrollableColumn>
    );
  }
  getTabsView() {
    let hash = this.props.location.hash;
    let path = this.props.location.pathname;
    return (
      <TabsContainerView
        className={"full-width desktop-only z-index-2 background"}
      >
        {links.map((link) => (
          <ButtonView
            type={BUTTON_TYPE.LINK}
            className={`flat ${
              (!hash && link.isDefault) || hash === `#${link.hash}`
                ? "primary"
                : "gray"
            }`}
            icon={link.icon}
            title={link.title}
            link={`${path}#${link.hash}`}
          />
        ))}
      </TabsContainerView>
    );
  }
}

export default withRouter(connect(CoursePage));
