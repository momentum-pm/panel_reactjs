import React from "react";
import "./ToolbarView.scss";
import { connect } from "../../../../stores/base/StoreManager";
import GeneralSerachForm from "../../../../stores/app/toolbar/GeneralSearchForm";
import StoreView from "../../../base/StoreView";
import Body from "../../../base/Body";
import Box from "../../../base/refactored/box/Box";
import HeaderRow from "../../../base/refactored/headerRow/HeaderRow";
import ScrollableColumn from "../../../base/refactored/scrollable/ScrollableColumn";
import Scrollable from "../../../base/refactored/scrollable/Scrollable";
import Row from "../../../base/Row";
import LinkPostView from "../linkViews/LinkPostView";
import LinkCourseView from "../linkViews/LinkCourseView";
import LinkEpisodeView from "../linkViews/LinkEpisodeView";
import LinkSectionView from "../linkViews/LinkSectionView";
import LinkProfileView from "../linkViews/LinkProfileView";
class GeneralSearchResultView extends StoreView {
  static mapPropsToStores() {
    return { form: GeneralSerachForm.map() };
  }
  constructor(props){
    super(props);
  }
  getData() {
    return this.props.form.getData();
  }
  render() {
    if (this.getData()) {
      return (
        <div className="general-search-result" onClick={()=>this.props.form.resetForm()}>
          <div className="container">
            <Box className={"general-search-result-box"}>
              <ScrollableColumn>
                <HeaderRow>
                  <h2>نتایج جستجو</h2>
                </HeaderRow>
                <Scrollable>
                    {this.getData().posts?.length > 0 ? (
                      <div>
                        <Row className={"padding-one"}>
                          {this.getData().posts.map((post) => (
                            <LinkPostView post={post} />
                          ))}
                        </Row>
                      </div>
                    ) : null}
                    {this.getData().courses?.length > 0 ? (
                      <div>
                        <p className="margin-two">دوره ها</p>
                        <Row className={"padding-one"}>
                          {this.getData().courses.map((course) => (
                            <LinkCourseView course={course} />
                          ))}
                        </Row>
                      </div>
                    ) : null}
                    {this.getData().sections?.length > 0 ? (
                      <div>
                        <p className="margin-two">سرفصل ها</p>
                        <Row className={"padding-one"}>
                          {this.getData().sections.map((section) => (
                            <LinkSectionView section={section} />
                          ))}
                        </Row>
                      </div>
                    ) : null}
                    {this.getData().episodes?.length > 0 ? (
                      <div>
                        <p className="margin-two">ویدیو ها</p>
                        <Row className={"padding-one"}>
                          {this.getData().episodes.map((episode) => (
                            <LinkEpisodeView episode={episode} />
                          ))}
                        </Row>
                      </div>
                    ) : null}
                    {this.getData().profiles?.length > 0 ? (
                      <div>
                        <p className="margin-two">دبیر ها</p>
                        <Row className={"padding-one"}>
                          {this.getData().profiles.map((profile) => (
                            <LinkProfileView profile={profile} />
                          ))}
                        </Row>
                      </div>
                    ) : null}
                </Scrollable>
              </ScrollableColumn>
            </Box>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default connect(GeneralSearchResultView);
