

export class AbstractAppRouter{
    
}
import React, {lazy, Suspense} from 'react';
import "./AppRouter.scss"

import RemoteStoreView from '../base/RemoteStoreView';
import {connect} from '../../stores/base/StoreManager';
import App from "../../stores/app/App";
import {get_lang_free_url} from "../../History";
import Row from "../base/Row";
import LoadingView from "../base/refactored/loadingView/LoadingView";
import {Route, Switch, withRouter} from "react-router";
import ShortRedirectPage from "./shortener/ShortRedirectPage";





class AppRouter extends RemoteStoreView {
    
    static {
        const DashboardRouter = lazy(() => import("./dashboard/DashboardRouter"));
        const ProfilesRouter = lazy(() => import("./profiles/Router"));
        const BlogRouter = lazy(() => import("./blog/BlogRouter"));
        const HomeRouter = lazy(() => import("./home/Router"));
        const AuthRouter = lazy(() => import('../auth/AuthRouter'));
        const SchoolRouter = lazy(() => import("./school/Router"));
    }
	static getRemoteStore(props) {
		return App.map();
	}

	componentDidMount() {
		this.getStore().init();
	}

	getOkView() {
		let path = this.props.match.path;
		let pathname = this.props.location.pathname;
		if (!pathname.endsWith('/')) {
			pathname += '/';
		}
		pathname = get_lang_free_url(pathname);
		let inHome = (pathname === '/');
		return (
			<div className={`app ${inHome ? 'in-home' : ''}`}>
				<Row className={`app-body app-body-with-nav`}>
					<div
						className={`app-content-container`}>
						<div className={'app-content'}>
							<Suspense fallback={<LoadingView className={'app-router-loading'}/>}>
								<Switch>
									<Route path={path + 'dashboard/'} render={() => <DashboardRouter/>}/>
									<Route path={path + '@:username/'} render={() => <ProfilesRouter/>}/>
									<Route path={path + 'blog/'} render={() => <BlogRouter/>}/>
									<Route path={path + 'school/'} render={() => <SchoolRouter/>}/>
									<Route path={path + 'tv/'} render={() => <SchoolRouter/>}/>
									<Route path={path + 'u/:code'} render={() => <ShortRedirectPage/>}/>
									<Route path={path} render={() => <HomeRouter/>}/>
								</Switch>
							</Suspense>
						</div>
					</div>
				</Row>
			</div>
		);
	}


}


export default withRouter(connect(AppRouter));
