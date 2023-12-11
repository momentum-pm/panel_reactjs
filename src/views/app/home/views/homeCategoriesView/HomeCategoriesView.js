import { connect } from "../../../../../stores/base/StoreManager";
import React from "react";
import Res from "../../../../../assets/Res";
import Row from "../../../../base/Row";
import Column from "../../../../base/Column";
import ButtonView from "../../../../base/forms/button/ButtonView";
import { BUTTON_TYPE } from "../../../../../stores/base/form/buttons/Button";
import RemoteStoreView from "../../../../base/RemoteStoreView";
import HomePostView from "./HomePostView";
import MasterColumn from "../../../../base/MasterColumn";
import SlaveColumn from "../../../../base/SlaveColumn";
import HomeCategories from "../../stores/HomeCategories";
import Box from "../../../../base/refactored/box/Box";
import Body from "../../../../base/Body";
import RichText from "../../../../base/richText/RichText";
import background from "../../../../../assets/images/home_categories_background.png";
import Link from "../../../../base/Link";
class HomeCategoriesView extends RemoteStoreView {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
  }
  static getRemoteStore() {
    return HomeCategories.map();
  }

  getLoadingView() {
    return null;
  }

  getOkView() {
    let activeCategory = this.getActive();
    return (
      <div className={"home-categories"}>
        <img
          className="home-categories-background"
          src={background}
          alt={"Momentum-AI teachers"}
        />
        <img
          className="home-categories-background-2"
          src={background}
          alt={"Momentum-AI teachers"}
        />
        <div className="home-categories-content">
          <div className={"container full-height"}>
            <Row className={"padding-two-top padding-one full-height"}>
              <div className="inline-half-row-responsive r">
                <Row className={""}>
                  {this.getData().map((category, index) => (
                    <ButtonView
                      key={category.id}
                      title={category.title}
                      type={BUTTON_TYPE.BUTTON}
                      onClick={() => this.setState({ activeIndex: index })}
                      className={`main-flex half-responsive ${
                        activeCategory.id === category.id
                          ? "raised primary"
                          : "flat background"
                      }`}
                    />
                  ))}
                </Row>
                <Row>
                  <MasterColumn>
                    <Link
                      to={`/school/?category=${activeCategory.id}`}
                      className={"row darker video-square box hidden-overflow"}
                    >
                      <img
                        className={`video-square`}
                        src={activeCategory.post.thumbnail_image}
                        alt={activeCategory.post.title}
                      />
                      <div className="home-categories-image-cover">
                        <Row className={"full-height full-width centered"}>
                          <Column className={"full-width centered"}>
                            <div className="home-categories-icon">
                              {Res.icon.play}
                            </div>
                            <h3>{`همه دوره های ${activeCategory.title}`}</h3>
                          </Column>
                        </Row>
                      </div>
                    </Link>
                    <Row>
                      <h4 className="header-style margin-two">
                        {activeCategory.post.title}
                      </h4>
                    </Row>
                    <p className="justify padding-two-sides">
                      {activeCategory.description}
                    </p>
                    <div className={"row"}>
                      <ButtonView
                        className={"flat link "}
                        icon={Res.icon.nextArrow}
                        link={`/blog/posts/${activeCategory.post.slug}/`}
                        title={"بیشتر بخوانید"}
                        type={BUTTON_TYPE.LINK}
                      />
                    </div>
                  </MasterColumn>
                </Row>
              </div>
              <div className="inline-half-row-responsive full-height padding-two-before-after">
                <Column className={"full-height centered"}>
                  <Row className={"full-height master-column centered"}></Row>
                </Column>
              </div>
            </Row>
          </div>
        </div>
      </div>
    );
  }
  getActive() {
    return this.getData()[this.state.activeIndex];
  }

  mapItemToView(item, index) {
    return <div>{item.title}</div>;
  }
}

export default connect(HomeCategoriesView);
