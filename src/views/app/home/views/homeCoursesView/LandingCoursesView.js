import React from "react";
import Res from "../../../../../assets/Res";
import Row from "../../../../base/Row";
import ButtonView from "../../../../base/forms/button/ButtonView";
import { BUTTON_TYPE } from "../../../../../stores/base/form/buttons/Button";
import MasterColumn from "../../../../base/MasterColumn";
import SchoolCourseView from "../../../school/views/SchoolCourseView";
import home_edu_background from "../../../../../assets/images/home_edu_background.png";
import NoLoadRemoteStoreView from "../../../../base/NoLoadRemoteStoreView";
import App from "../../../../../stores/app/App";
import { connect } from "../../../../../stores/base/StoreManager";

class LandingCoursesView extends NoLoadRemoteStoreView {
  static getRemoteStore() {
    return App.map();
  }
  getOkView() {
    let courses = this.getData().top_courses;
    return (
      <div className="">
        <div className={"header-row"}>
          <h2 className={" margin-two padding-two"}>آخرین تخفیف ها</h2>
        </div>
        <Row className={"centered"}>
          {courses.map((post) => (
            <MasterColumn key={post.id} className={"responsive"}>
              <SchoolCourseView course={post} showPrice={true} />
            </MasterColumn>
          ))}
          {this.props.showAll ? (
            <ButtonView
              type={BUTTON_TYPE.LINK}
              about={"مشاهده همه دوره ها"}
              icon={Res.icon.nextArrow}
              link={"/school"}
              className={"large raised primary circle desktop-only"}
            />
          ) : null}
          {this.props.showAll ? (
            <ButtonView
              type={BUTTON_TYPE.LINK}
              title={"مشاهده همه دوره ها"}
              icon={Res.icon.nextArrow}
              link={"/school"}
              className={"large center raised primary responsive-only"}
            />
          ) : null}
        </Row>
      </div>
    );
  }
}

export default connect(LandingCoursesView);
