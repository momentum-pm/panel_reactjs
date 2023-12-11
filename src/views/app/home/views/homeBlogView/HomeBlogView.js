import { connect } from "../../../../../stores/base/StoreManager";
import HomeBlog from "../../stores/HomeBlog";
import React from "react";
import Res from "../../../../../assets/Res";
import Row from "../../../../base/Row";
import Column from "../../../../base/Column";
import ButtonView from "../../../../base/forms/button/ButtonView";
import { BUTTON_TYPE } from "../../../../../stores/base/form/buttons/Button";
import RemoteStoreView from "../../../../base/RemoteStoreView";
import HomePostView from "./HomePostView";
import MasterColumn from "../../../../base/MasterColumn";

class HomeBlogView extends RemoteStoreView {
  static getRemoteStore() {
    return HomeBlog.map();
  }

  getLoadingView() {
    return null;
  }

  getOkView() {
    return (
      <div className={"home-blog-container"}>
        <div className={"blog-content container padding-two-before-after"}>
          <h3 className={"center margin-two"}>{Res.string.home.blog_title}</h3>
          <div className={" padding-two-before-after"}>
            <Row>
              {this.getData().map((post) => (
                <HomePostView post={post} key={post.id} />
              ))}
            </Row>
          </div>
          <Column className={"centered padding-two-before-after"}>
            <Row className={"home-categories-buttons"}>
              <ButtonView
                type={BUTTON_TYPE.LINK}
                title={Res.string.home.blog_button}
                icon={Res.icon.nextArrow}
                link={"/blog"}
                className={"large flat default"}
              />
            </Row>
          </Column>
        </div>
      </div>
    );
  }

  mapItemToView(item, index) {
    return <div>{item.title}</div>;
  }
}

export default connect(HomeBlogView);
