import RemoteStoreView from "../../../../../base/RemoteStoreView";
import { withRouter } from "react-router";
import { connect } from "../../../../../../stores/base/StoreManager";
import React from "react";
import Row from "../../../../../base/Row";
import SlaveColumn from "../../../../../base/SlaveColumn";
import UserProfileVisit from "../../../stores/UserProfileVisit";
import EducationsView from "./educations/EducationsView";
import ExperiencesView from "./experiences/ExperiencesView";
import CertificatesView from "./certificates/CertificatesView";
import SamplesView from "../samples/SamplesView";
import Body from "../../../../../base/Body";
import Box from "../../../../../base/refactored/box/Box";
import AbstractUserInfoView from "./AbstractUserInfoView";
import RichText from "../../../../../base/richText/RichText";
import "../../../../blog/Blog.scss";
import MasterColumn from "../../../../../base/MasterColumn";
import Column from "../../../../../base/Column";
import Thumbnail from "../../../../../base/refactored/thumbnail/Thumbnail";
import user from "../../../../../../assets/images/user.svg";
import ButtonView from "../../../../../base/forms/button/ButtonView";
import { BUTTON_TYPE } from "../../../../../../stores/base/form/buttons/Button";
import Res from "../../../../../../assets/Res";
import { normalizeNumber } from "../../../../../../utils/StringUtils";
import AccountLinksView from "../accountLinks/AccountLinksView";
import AddressView from "../AddressView";
import HeaderRow from "../../../../../base/refactored/headerRow/HeaderRow";
import KnowledgeSetView from "../knowledgeSet/KnowledgeSetView";
import IconTitleValueView from "../../../../../base/iconTitleValueView/IconTitleValueView";
import { getDateDistanceStringYear } from "../../../../../../utils/DateUtils";
import LinkCourseView from "../../../../common/linkViews/LinkCourseView";
export class UserProfileVisitPage extends RemoteStoreView {
  static getRemoteStore(props) {
    return UserProfileVisit.map(props.profileId, {
      profileId: props.profileId,
      username: props.username,
    });
  }

  getOkView() {
    let profileId = this.props.profileId;
    let profile = this.getData();
    return (
      <div>
        <div className="container">
          <Row className={"padding-one-desktop"}>
            <SlaveColumn className={"dominant"}>
              <Box>
                <Column className={"master-column padding-two centered"}>
                  <Thumbnail
                    src={profile.picture}
                    alt={profile.title}
                    placeholder={user}
                    className={"center background xxlarge round"}
                  />
                  <h2 className={" margin-two center"}>{profile.title}</h2>
                  <p className={"center"}>{profile.about}</p>
                  <RichText className={"margin-two blog-header-text center"}>
                    {profile.cover_text}
                  </RichText>
                  <Row className={"centered"}>
                    {profile.email ? (
                      <ButtonView
                        type={BUTTON_TYPE.EXTERNAL_LINK}
                        icon={Res.icon.email}
                        title={Res.string.profiles.email_title}
                        about={profile.email}
                        link={`mailto:${profile.email}`}
                        className={"flat primary"}
                      />
                    ) : null}
                    {profile.phone_number ? (
                      <ButtonView
                        type={BUTTON_TYPE.EXTERNAL_LINK}
                        icon={Res.icon.call}
                        title={Res.string.profiles.phone_number_title}
                        about={normalizeNumber(profile.phone_number)}
                        link={`tel:${profile.phone_number}`}
                        className={"flat primary"}
                      />
                    ) : null}
                    <AccountLinksView profile={profile} />

                    <AddressView address={profile.address} />
                  </Row>
                </Column>
              </Box>
              <CertificatesView
                profileId={profileId}
                count={this.getData().certificate_count}
              />
              <SamplesView
                profileId={profileId}
                count={this.getData().sample_count}
              />
            </SlaveColumn>
            <MasterColumn className={""}>
              {profile.courses.length > 0 ? (
                <Body>
                  <HeaderRow className={"padding-two-before-after"}>
                    <h2>مدرس دوره های</h2>
                  </HeaderRow>
                  <ol className={`row no-style`}>
                    {profile.courses.map((item) => (
                      <LinkCourseView course={item} key={item.id} />
                    ))}
                  </ol>
                </Body>
              ) : null}
              <EducationsView
                profileId={profileId}
                count={this.getData().education_count}
              />
              <ExperiencesView
                profileId={profileId}
                count={this.getData().experience_count}
              />
            </MasterColumn>
          </Row>
        </div>
      </div>
    );
  }
  getSkills(className) {
    return (
      <div className={className}>
        <Body>
          <HeaderRow>
            <h2>Backend Development</h2>
          </HeaderRow>
          <KnowledgeSetView
            knowledge_set={[
              {
                level: 4,
                skill: {
                  title_en: "RESTFul Api",
                  title_fa: "RESTFul Api",
                },
              },
              {
                level: 3,
                skill: { title_en: "Django", title_fa: "Django" },
              },
              {
                level: 2,
                skill: {
                  title_en: "Go Lang (gRPC)",
                  title_fa: "Go Lang (gRPC)",
                },
              },
              {
                level: 1,
                skill: {
                  title_en: "ASP.NET core",
                  title_fa: "ASP.NET core",
                },
              },
            ]}
          />
          <HeaderRow>
            <h2>Frontend Development</h2>
          </HeaderRow>

          <KnowledgeSetView
            knowledge_set={[
              {
                level: 4,
                skill: { title_en: "ReactJs", title_fa: "ReactJs" },
              },
              {
                level: 3,
                skill: {
                  title_en: "AngularJs",
                  title_fa: "AngularJs",
                },
              },
              {
                level: 3,
                skill: { title_en: "NextJs", title_fa: "NextJs" },
              },
            ]}
          />
          <HeaderRow>
            <h2>Programming Language</h2>
          </HeaderRow>

          <KnowledgeSetView
            knowledge_set={[
              {
                level: 4,
                skill: { title_en: "Java", title_fa: "AngularJs" },
              },
              {
                level: 3,
                skill: { title_en: "Python", title_fa: "ReactJs" },
              },
            ]}
          />
          <HeaderRow>
            <h2>Project Management</h2>
          </HeaderRow>

          <KnowledgeSetView
            knowledge_set={[
              {
                level: 4,
                skill: {
                  title_en: "Trello",
                  title_fa: "Google Analytics",
                },
              },
              {
                level: 3,
                skill: {
                  title_en: "Ajure",
                  title_fa: "Search Console",
                },
              },
              {
                level: 2,
                skill: {
                  title_en: "Jira",
                  title_fa: "Adobe Photoshop",
                },
              },
            ]}
          />
          <HeaderRow>
            <h2>Utilities</h2>
          </HeaderRow>

          <KnowledgeSetView
            knowledge_set={[
              {
                level: 3,
                skill: {
                  title_en: "Google Analytics",
                  title_fa: "Google Analytics",
                },
              },
              {
                level: 3,
                skill: {
                  title_en: "Search Console",
                  title_fa: "Search Console",
                },
              },
              {
                level: 2,
                skill: {
                  title_en: "Adobe Photoshop",
                  title_fa: "Adobe Photoshop",
                },
              },
              {
                level: 1,
                skill: {
                  title_en: "Adobe Illustrator",
                  title_fa: "Adobe Illustrator",
                },
              },
            ]}
          />
          <HeaderRow>
            <h2>Other Skills</h2>
          </HeaderRow>

          <KnowledgeSetView
            knowledge_set={[
              {
                level: 4,
                skill: {
                  title_en: "Teaching",
                  title_fa: "Google Analytics",
                },
              },
              {
                level: 4,
                skill: {
                  title_en: "Presentation",
                  title_fa: "Google Analytics",
                },
              },
              {
                level: 3,
                skill: {
                  title_en: "Team management",
                  title_fa: "Search Console",
                },
              },
              {
                level: 2,
                skill: {
                  title_en: "Negotiation",
                  title_fa: "Search Console",
                },
              },
            ]}
          />
          <HeaderRow>
            <h2>Languages</h2>
          </HeaderRow>

          <KnowledgeSetView
            knowledge_set={[
              {
                level: 4,
                skill: {
                  title_en: "Farsi",
                  title_fa: "Google Analytics",
                },
              },
              {
                level: 2,
                skill: {
                  title_en: "English",
                  title_fa: "Search Console",
                },
              },
            ]}
          />
        </Body>
      </div>
    );
  }
}

export default withRouter(connect(UserProfileVisitPage));
