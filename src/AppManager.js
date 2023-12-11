import React, { Component, Suspense } from "react";
import { Provider } from "react-redux";
import StoreManager from "./stores/base/StoreManager";
import History, { get_lang_free_url } from "./History";
import { Redirect, Route, Router, Switch } from "react-router";
import Res from "./assets/Res";
import LoadingView from "./views/base/refactored/loadingView/LoadingView";
import AppContainer from "./views/AppContainer";
import Settings from "./Settings";
import ErrorBoundary from "./views/base/errorBoundary/ErrorBoundry";
import * as ReactDOM from "react-dom";
import Analytics from "./utils/Analytics";
import MetaTags from "./stores/base/MetaTags";
import "./views/Font.scss";
import Storage, { Keys } from "./utils/Storage";
export default class AppManager extends Component {
  constructor(props) {
    super(props);

    this.onLocationChange = this.onLocationChange.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.state = {
      lastScrollPosition: 0,
      scrollingDown: false,
      scrollingUp: false,
      currentLocation: History.location.pathname,
      firstRender: true,
      mounted: false,
    };
    Analytics.pageViewed(History.location.pathname);
    try {
      let searchParams = new URLSearchParams(History.location.search);
      let ott = searchParams.get("ott");
      if (ott) {
        Storage.put(Keys.ott, ott);
      }
    } catch (e) {}
    History.listen(this.onLocationChange);
    window.addEventListener("scroll", this.onScroll);

    this.get_body = this.get_body.bind(this);
  }

  componentDidMount() {
    this.setState({ firstRender: false, mounted: true });
  }

  onLocationChange(location) {
    if (location.pathname !== this.state.currentLocation) {
      this.setState({ currentLocation: location.pathname });
      let langFreeUrl = get_lang_free_url(location.pathname);

      Analytics.pageViewed(langFreeUrl);
      if (
        this.state.mounted &&
        langFreeUrl.indexOf("dashboard") === -1 &&
        langFreeUrl.indexOf("school") === -1
      ) {
        try {
          let scrollables =
            ReactDOM.findDOMNode(this).getElementsByClassName("scrollable");
          for (let i = 0; i < scrollables.length; i++) {
            let scrollable = scrollables.item(i);
            scrollable.scrollTo(0, 0);
          }
        } catch (e) {}
      }
    }
  }

  onScroll() {
    let scroll = window.scrollY;
    if (scroll < 0) {
      scroll = 0;
    }
    let deltaScroll = scroll - this.state.lastScrollPosition;
    if (deltaScroll > 10 || deltaScroll < -10) {
      let scrollingDown = deltaScroll > 0;
      let scrollingUp = deltaScroll < 0;
      this.setState({ lastScrollPosition: scroll, scrollingUp, scrollingDown });
    }
    if (this.state.scrolled && scroll < 10) {
      this.setState({ scrolled: false });
    }
    if (!this.state.scrolled && scroll > 30) {
      this.setState({ scrolled: true });
    }
  }

  render() {
    return (
      <Provider store={StoreManager.getStore()}>
        <Router history={History}>
          <ErrorBoundary>{this.get_body()}</ErrorBoundary>
        </Router>
      </Provider>
    );
  }

  get_body() {
    if (
      this.state.firstRender &&
      History.location.state &&
      History.location.state.modal_location
    ) {
      return (
        <Redirect to={History.location.pathname + History.location.search} />
      );
    } else {
      return (
        <Suspense fallback={<LoadingView />}>
          <Switch>
            {/* <Route path="/en/" render={() => this.renderWithLang("en")} /> */}
            <Route
              path="/"
              render={() => this.renderWithLang(Settings.DEFAULT_LANG)}
            />
          </Switch>
        </Suspense>
      );
    }
  }

  renderWithLang(lang) {
    // if (lang === 'en') {
    // 	lang = 'fa';
    // 	this.setLang(lang);
    // 	let url = History.location.pathname + History.location.search;
    // 	url = get_lang_free_url(url);
    // 	return <Redirect to={url}/>
    // }
    let url = History.location.pathname + History.location.search;
    url = get_lang_free_url(url);

    this.setLang(lang);
    // this.setLang(lang);
    let mainClass = `main ${Res.lang} ${
      this.state.scrolled ? "scrolled" : ""
    } ${this.state.scrollingUp ? "scrolling-up" : ""} ${
      this.state.scrollingDown ? "scrolling-down" : ""
    }`;
    return (
      <main className={mainClass}>
        <AppContainer />
      </main>
    );
  }

  setLang(lang) {
    if (Res.lang !== lang) {
      Res.setResources(lang);
    }
  }
}
