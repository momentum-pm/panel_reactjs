import React, {lazy, Suspense} from "react";
import {Route, Switch, withRouter} from "react-router";
import LoadingView from "../../base/refactored/loadingView/LoadingView";
import PrivacyPolicyPage from "./views/privacyPolicy/PrivacyPolicyPage";
import TermsAndConditionsPage from "./views/termsAndConditions/TermsAndConditionsPage";
import AboutUsPage from "./views/aboutUs/AboutUsPage";

const LandingPage = lazy(()=>import("../newLanding/LandingPage"));

class Router extends React.Component {
	render() {
		let path = this.props.match.path;
		return (
			<Suspense fallback={<LoadingView/>}>
				<Switch>
					<Route path={path + 'privacy-policy/'} render={() => <PrivacyPolicyPage/>}/>
					<Route path={path + 'terms-and-conditions/'} render={() => <TermsAndConditionsPage/>}/>
					<Route path={path + 'about-us/'} render={() => <AboutUsPage/>}/>
					<Route path={path} render={() => <LandingPage/>}/>
				</Switch>
			</Suspense>
		)
	}
}

export default withRouter(Router);
