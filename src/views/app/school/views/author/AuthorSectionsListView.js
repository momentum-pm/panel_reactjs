import React from "react";
import { withRouter } from "react-router";
import { connect } from "../../../../../stores/base/StoreManager";
import Body from "../../../../base/Body";
import Row from "../../../../base/Row";
import MasterColumn from "../../../../base/MasterColumn";
import Res from "../../../../../assets/Res";
import ButtonView from "../../../../base/forms/button/ButtonView";
import Box from "../../../../base/refactored/box/Box";
import StepView from "../../../../base/forms/fields/stepView/StepView";
import NoLoadRemoteStoreView from "../../../../base/NoLoadRemoteStoreView";
import AuthorCourse from "../../stores/author/AuthorCourse";
import AuthorEpisodeView from "./AuthorEpisodeView";

class AuthorSectionsListView extends NoLoadRemoteStoreView {
  static getRemoteStore(props) {
    let { authorId, courseId } = props.match.params;
    return AuthorCourse.map(courseId, { authorId, courseId });
  }

  getOkView() {
    return (
        <Body>
          {this.getHeaderView()}
          {this.getBodyView()}
        </Body>
    );
  }
  getBodyView() {
    let sections = this.getData().sections;
    if (sections.length > 0) {
      return (
        <ol className={`row no-style`}>
          {sections.map((section) => this.renderSection(section))}
        </ol>
      );
    } else {
      return null;
    }
  }

  getHeaderView() {
    return (
      <Row className={"centered"}>
        <MasterColumn>
          <h4 className={"title"}>{Res.string.school.sections}</h4>
        </MasterColumn>
        <ButtonView id={this.getState().addSectionButton.id} />
        <ButtonView id={this.getState().addChildrenButton.id} />
      </Row>
    );
  }

  renderSection(section) {
    return (
      <li className="bordered-box low-margin" key={section.id}>
        <Row className={"centered"}>
          <MasterColumn>
            <StepView  className="medium" index={section.order} label={section.title} />
          </MasterColumn>
          <Row className={"reverse"}>
            {section.buttons.map((button) => (
              <ButtonView id={button.id} key={button.id} />
            ))}
          </Row>
        </Row>
        {section.open ? (
          <div className="padding-one">
            <ol className="">
              {section.subsections?.map((section) =>
                this.renderSection(section)
              )}
            </ol>
            <ol className="">
              {section.episodes.map((episode) => (
                <AuthorEpisodeView episode={episode} />
              ))}
            </ol>
          </div>
        ) : null}
      </li>
    );
  }
}

export default withRouter(connect(AuthorSectionsListView));
