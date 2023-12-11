import React from "react";
import "./Landing.scss";
import Row from "../../base/Row";
import Column from "../../base/Column";
import ScrollableColumn from "../../base/refactored/scrollable/ScrollableColumn";
import StoreView from "../../base/StoreView";
import Toolbar from "../../../stores/app/toolbar/Toolbar";
import App from "../../../stores/app/App";
import { withRouter } from "react-router";
import { connect } from "../../../stores/base/StoreManager";
import HomeBlogView from "../home/views/homeBlogView/HomeBlogView";
import HomeCategoriesView from "../home/views/homeCategoriesView/HomeCategoriesView";
import LandingCoursesView from "../home/views/homeCoursesView/LandingCoursesView";
import LandingActionView from "./LandingActionView";
import FooterView from "../home/views/footerView/FooterView";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
class LandingPage extends StoreView {
  static mapPropsToStores() {
    return { toolbar: Toolbar.map(), app: App.map() };
  }

  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      automaticChange: true,
      scrolled: false,
      played: false,
    };
    this.videoRef = React.createRef();
    this.scrollableRef = React.createRef();
  }

  componentDidMount() {
    if (!this.state.played && this.videoRef.current) {
      // this.videoRef.current.play();
      this.setState({ played: true });
    }
  }
  setActive(index) {
    this.setState({
      automaticChange: false,
      activeIndex: index,
    });
  }

  getData() {
    return this.props.app.state.data;
  }

  scrolled() {
    let newScrolled = this.scrollableRef.current.scrollTop;
    if (newScrolled < 50 && this.state.scrolled) {
      this.setState({ scrolled: false });
      this.props.toolbar.setScrolled(false);
    }
    if (newScrolled > 100 && !this.state.scrolled) {
      this.setState({ scrolled: true });
      this.props.toolbar.setScrolled(true);
    }
  }
  render() {
    let isDesktop = window.innerWidth >= 768;

    return <Redirect to="/auth/login/" />;
  }
}

export default withRouter(connect(LandingPage));
