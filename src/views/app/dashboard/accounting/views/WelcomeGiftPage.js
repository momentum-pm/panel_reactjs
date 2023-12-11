import RemoteStoreView from "../../../../base/RemoteStoreView";
import { withRouter } from "react-router";
import { connect } from "../../../../../stores/base/StoreManager";
import ScrollableColumn from "../../../../base/refactored/scrollable/ScrollableColumn";
import Scrollable from "../../../../base/refactored/scrollable/Scrollable";
import Header from "../../../../base/refactored/header/Header";
import Res from "../../../../../assets/Res";
import React from "react";
import TitleValueView from "../../../../base/titleValueView/TitleValueView";
import ButtonView from "../../../../base/forms/button/ButtonView";
import { getCredit, getCurrency } from "../../../../../utils/StringUtils";
import Row from "../../../../base/Row";
import MasterColumn from "../../../../base/MasterColumn";
import Box from "../../../../base/refactored/box/Box";
import Thumbnail from "../../../../base/refactored/thumbnail/Thumbnail";
import Column from "../../../../base/Column";
import TagView from "../../../../base/tag/TagView";
import WelcomeGift from "../stores/WelcomeGift";
import {
  getDatetimeDistanceObject,
  getDatetimeDistanceString,
} from "../../../../../utils/DateUtils";
import Body from "../../../../base/Body";
import TimerView from "../../../../base/timerView/TimerView";
import { BUTTON_TYPE } from "../../../../../stores/base/form/buttons/Button";

class WelcomeGiftPage extends RemoteStoreView {
  static getRemoteStore() {
    return WelcomeGift.map();
  }

  getOkView() {
    return (
      <ScrollableColumn>
        <Scrollable>
          <div className="container">
            <Row>
              <MasterColumn className={"desktop-only"} />
              <MasterColumn>
                <Box>
                  <Body>
                    <Column className={"centered full-width"}>
                      <Header className={"header-style"}>
                        {this.getData().type.title_fa}
                      </Header>
                      
                      {this.getState().isExpired ? (
                        <TagView className="danger large" title="منقضی شده" />
                      ) : (
                        <Column className={"full-width centered"}>
                          <h2 className="primary margin-two large bold">
                        {getCurrency(this.getData().type.fixed_discount)}
                      </h2>
                          <p>کد تخفیف</p>
                          <div className="margin-two  bordered-box">
                            <h1 className="center padding-two">
                              {this.getData().type.code}
                            </h1>
                          </div>
                          <p className="margin-two">زمان استفاده</p>
                          {this.getState().timer ? (
                            <TimerView timer={this.getState().timer} />
                          ) : null}

                          <div className="padding-one full-width">
                            <ButtonView
                              type={BUTTON_TYPE.LINK}
                              title={"مشاهده همه دوره ها"}
                              link={"/school/"}
                              className={"raised large primary"}
                              icon={Res.icon.nextArrow}
                            />
                          </div>
                  
                        </Column>
                      )}
                              <div className="padding-one-sides  full-width">
                            <ButtonView
                              type={BUTTON_TYPE.LINK}
                              title={"بازگشت به خانه"}
                              link={"/dashboard/"}
                              className={"bordered large primary"}
                              icon={Res.icon.home}
                            />
                          </div>
                    </Column>
                  </Body>
                </Box>
              </MasterColumn>
              <MasterColumn className={"desktop-only"} />
            </Row>
          </div>
        </Scrollable>
      </ScrollableColumn>
    );
  }
}

export default withRouter(connect(WelcomeGiftPage));
