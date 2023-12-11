import { connect } from "../../../../../stores/base/StoreManager";
import ContactUsForm from "../../stores/ContactUsForm";
import FormView from "../../../../base/forms/FormView";
import React from "react";
import "./AboutUsPage.scss";
import "../../../newLanding/NewLanding.scss";

import Res from "../../../../../assets/Res";
import ScrollableColumn from "../../../../base/refactored/scrollable/ScrollableColumn";
import Scrollable from "../../../../base/refactored/scrollable/Scrollable";
import FooterView from "../footerView/FooterView";
import Row from "../../../../base/Row";
import Body from "../../../../base/Body";

class AboutUsPage extends FormView {
  static getForm() {
    return ContactUsForm.map();
  }

  render() {
    return (
      <ScrollableColumn>
        <Scrollable>
          <div className={"contact-us-page"}>
            <div className={"container"}>
              <h2 className={"nlanding-h2"}>{Res.string.home.about_us}</h2>
              <div className={"box"}>
                <Body>
                  <div className={"about-us-logo-container"}>
                    <Row className={"centered"}>
                      <h2>{Res.string.app_name}</h2>
                    </Row>
                    <p>
                      گرینولی ، ناشر آنلاین دوره های آموزشی باکیفیت استودیویی
                      المپیاد و برنامه نویسی با مدرسین برترین مدارس کشور
                    </p>
                  </div>
                </Body>
              </div>
              <div className={"box"}>
                <Body>
                  <Row>
                    <h2 className={"margin-two header-style"}>
                      {Res.string.home.contact_us}
                    </h2>
                  </Row>
                  {super.render()}
                </Body>
              </div>
            </div>
          </div>
          <FooterView />
        </Scrollable>
      </ScrollableColumn>
    );
  }
}

export default connect(AboutUsPage);
