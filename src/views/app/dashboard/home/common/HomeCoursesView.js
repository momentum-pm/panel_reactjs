import Box from "../../../../base/refactored/box/Box";
import React from "react";
import { connect } from "../../../../../stores/base/StoreManager";
import HeaderRow from "../../../../base/refactored/headerRow/HeaderRow";
import ButtonView from "../../../../base/forms/button/ButtonView";
import { BUTTON_TYPE } from "../../../../../stores/base/form/buttons/Button";
import Res from "../../../../../assets/Res";
import MasterColumn from "../../../../base/MasterColumn";
import ScrollableColumn from "../../../../base/refactored/scrollable/ScrollableColumn";
import Scrollable from "../../../../base/refactored/scrollable/Scrollable";
import NoLoadRemoteStoreView from "../../../../base/NoLoadRemoteStoreView";
import HomeCourseView from "./HomeCourseView";
import Body from "../../../../base/Body";
import App from "../../../../../stores/app/App";
import Row from "../../../../base/Row";
import Column from "../../../../base/Column";
import LandingCoursesView from "../../../home/views/homeCoursesView/LandingCoursesView";
class HomeCoursesView extends NoLoadRemoteStoreView {
  static getRemoteStore() {
    return App.map();
  }

  constructor(props) {
    super(props);
    this.mapItemToView = this.mapItemToView.bind(this);
  }

  getOkView() {
    let myCourses = this.getData().profile.courses;
    if (myCourses.length > 0) {
      return (
        <Box className={""}>
          <ScrollableColumn>
            <HeaderRow>
              <MasterColumn>
                <h2>{Res.string.dashboard.notifications.courses}</h2>
              </MasterColumn>
              <ButtonView
                type={BUTTON_TYPE.LINK}
                icon={Res.icon.nextArrow}
                title={"همه دوره ها"}
                className={"flat primary"}
                link={"/school/"}
              />
            </HeaderRow>
            <Scrollable className={"padding-one"}>
              {myCourses.map(this.mapItemToView)}
            </Scrollable>
          </ScrollableColumn>
        </Box>
      );
    } else {
      return (
        <Box className={""}>
          <Body>
            <Column className={"centered"}>
              <h2 className={"center header-style"}>دوره های آموزشی</h2>
            </Column>
            <p className={"center padding-two-before-after"}>
              شما هنوز هیچ دوره ای تهیه نکرده اید. برای مشاهده دوره ها به صفحه
              زیر مراجعه کنید
            </p>
            <Row className={"reverse"}>
              <ButtonView
                type={BUTTON_TYPE.LINK}
                title={"مشاهده همه دوره ها"}
                className={"center raised large success"}
                link={"/school/"}
              />
            </Row>
          </Body>
          <LandingCoursesView showAll={false} />
        </Box>
      );
    }
  }

  mapItemToView(item, index) {
    let isLast = this.getData().profile.courses.length - 1 === index;
    return <HomeCourseView course={item} key={item.id} isLast={isLast} />;
  }
}

export default connect(HomeCoursesView);
