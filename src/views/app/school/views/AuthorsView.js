import { withRouter } from "react-router";
import { connect } from "../../../../stores/base/StoreManager";
import NoLoadRemoteStoreView from "../../../base/NoLoadRemoteStoreView";
import Box from "../../../base/refactored/box/Box";
import Course from "../stores/Course";
import Row from "../../../base/Row";
import CompactTeacherView from "./CompactTeacherView";
import Body from "../../../base/Body";
class AuthorsView extends NoLoadRemoteStoreView {
  static getRemoteStore(props) {
    let courseSlug = props.match.params.courseSlug;
    return Course.map(courseSlug, { courseSlug });
  }

  getOkView() {
    return (
      <Box className={""}>
        <div className="padding-two-desktop">
          <div className="row padding-two">
            <h2 className="header-style">اساتید دوره</h2>
          </div>
          <Row className={'padding-one'}>
            {this.getData().teachers.map((access) => (
              <div className="full-width" key={access.id}>
                <CompactTeacherView access={access} />
              </div>
            ))}
          </Row>
        </div>
      </Box>
    );
  }
}
export default withRouter(connect(AuthorsView));
