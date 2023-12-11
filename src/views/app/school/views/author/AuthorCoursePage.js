import React from "react";
import ScrollableColumn from "../../../../base/refactored/scrollable/ScrollableColumn";
import Scrollable from "../../../../base/refactored/scrollable/Scrollable";
import Box from "../../../../base/refactored/box/Box";
import Body from "../../../../base/Body";
import Row from "../../../../base/Row";
import MasterColumn from "../../../../base/MasterColumn";
import { splitDigits } from "../../../../../utils/StringUtils";
import Res from "../../../../../assets/Res";
import IconTitleValueView from "../../../../base/iconTitleValueView/IconTitleValueView";
import { withRouter } from "react-router";
import RemoteStoreView from "../../../../base/RemoteStoreView";
import { connect } from "../../../../../stores/base/StoreManager";
import { getDurationText } from "../../../../../utils/DateUtils";
import AuthorCourse from "../../stores/author/AuthorCourse";
import AuthorSectionsListView from "./AuthorSectionsListView";
import ButtonView from "../../../../base/forms/button/ButtonView";
import CourseEditModal from "./CourseEditModal";
import HeaderRow from "../../../../base/refactored/headerRow/HeaderRow";
import TabsContainerView from "../../../../base/tabView/TabsContainerView";
import { BUTTON_TYPE } from "../../../../../stores/base/form/buttons/Button";
import { Switch, Route } from "react-router";
import { Suspense } from "react";
import LoadingView from "../../../../base/refactored/loadingView/LoadingView";
import SlaveColumn from "../../../../base/SlaveColumn";
import CourseCommentCreateView from "../CourseCommentCreateView";
import CommentView from "../CommentView";
import AuthorCourseInvoicesPage from "./AuthorCourseInvoicesPage";
import AuthorCourseTeachersPage from "./AuthorCourseTeachersPage";
import AuthorCourseStudentsPage from "./AuthorCourseStudentsPage";
import AuthorCourseDiscountTypesPage from "./AuthorCourseDiscountTypesPage";
const links = [
  {
    hash: "dashboard",
    title: "داشبورد",
    icon: Res.icon.home,
  },
  {
    hash: "edit",
    title: "اطلاعات پایه",
    isDefault: true,
    icon: Res.icon.edit,
  },
  {
    hash: "invoices",
    title: "فروش",
    icon: Res.icon.shop,
  },

  {
    hash: "sections",
    title: "سرفصل ها",
    icon: Res.icon.note,
  },
  {
    hash: "students",
    title: "دانش آموزان",
    icon: Res.icon.profile,
  },

  {
    hash: "teachers",
    title: "اساتید",
    icon: Res.icon.education,
  },
  {
    hash: "discounts",
    title: "تخفیف ها",
    icon: Res.icon.discount,
  },
  {
    hash: "comments",
    title: "نظرات",
    icon: Res.icon.comment,
  },
];

class AuthorCoursePage extends RemoteStoreView {
  static getRemoteStore(props) {
    let { courseId, authorId } = props.match.params;
    return AuthorCourse.map(courseId, { courseId, authorId });
  }

  getTabsView() {
    let { courseId, authorId } = this.props.match.params;
    let hash = this.props.location.pathname;

    return (
      <TabsContainerView
        className={"full-width desktop-only z-index-2 background"}
      >
        {links.map((link) => (
          <ButtonView
            type={BUTTON_TYPE.LINK}
            className={`flat ${
              (!hash && link.isDefault) || hash.indexOf(link.hash) > -1
                ? "primary"
                : "gray"
            }`}
            icon={link.icon}
            title={link.title}
            link={`/school/authors/${authorId}/courses/${courseId}/${link.hash}`}
          />
        ))}
      </TabsContainerView>
    );
  }
  getOkView() {
    let path = this.props.match.path;

    return (
      <ScrollableColumn>
        <Scrollable className={`padding-one-before-after`}>
          <div className={`full-height container`}>
            <Row className={"full-height"}>
              <MasterColumn>
                <Box>
                  {this.getTabsView()}
                  <Body>
                    <Suspense fallback={<LoadingView />}>
                      <Switch>
                        <Route
                          path={path + "sections"}
                          render={() => <AuthorSectionsListView />}
                        />
                        <Route
                          path={path + "invoices"}
                          render={() => <AuthorCourseInvoicesPage />}
                        />

                        <Route
                          path={path + "teachers"}
                          render={() => <AuthorCourseTeachersPage />}
                        />
                        <Route
                          path={path + "students"}
                          render={() => <AuthorCourseStudentsPage />}
                        />
                          <Route
                          path={path + "discounts"}
                          render={() => <AuthorCourseDiscountTypesPage />}
                        />
                        <Route
                          path={path + "comments"}
                          render={() => (
                            <div className={""} id={"comments"}>
                              <div className="header-row">
                                <h2>{Res.string.school.comments}</h2>
                              </div>
                              <CourseCommentCreateView
                                courseSlug={this.getData().slug}
                              />
                              <Row>
                                {this.getData().comments?.map((comment) => (
                                  <CommentView comment={comment} commentType={"course"} />
                                ))}
                              </Row>
                            </div>
                          )}
                        />
                        <Route
                          path={path }
                          render={() => <CourseEditModal />}
                        />
                      </Switch>
                    </Suspense>
                  </Body>
                </Box>
              </MasterColumn>
              <SlaveColumn className={"full-height"}>
                <Box className={"asteroid-gradient"}>
                  <Body>
                    <h1 className={"header-style"}>دسترسی سریع</h1>
                  </Body>
                  <div className="padding-one">
                    <ButtonView id={this.getState().openForButton.id} />
                    <ButtonView id={this.getState().accessCreate.id} />
                    <ButtonView id={this.getState().discountCreate.id} />
                    <ButtonView id={this.getState().uploadVideos.id} />
                    <ButtonView id={this.getState().updateDurations.id} />
                    <ButtonView id={this.getState().viewButton.id} />

                  </div>
                </Box>
              </SlaveColumn>
            </Row>
          </div>
        </Scrollable>
      </ScrollableColumn>
    );
  }
}

export default withRouter(connect(AuthorCoursePage));
