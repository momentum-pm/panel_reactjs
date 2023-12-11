import React, {lazy, Suspense} from "react";
import {Route, Switch, withRouter} from "react-router";
import LoadingView from "../../base/refactored/loadingView/LoadingView";
import "./Blog.scss";

const PostEditPage = lazy(() => import('./views/PostEditPage'));
const AuthorPostPage = lazy(() => import('./views/auhorPost/AuthorPostPage'));
const AuthorPostsPage = lazy(() => import('./views/auhorPost/AuthorPostsPage'));
const PostPage = lazy(() => import('./views/PostPage'));
const CategoryPostsPage = lazy(() => import('./views/CategoryPostsPage'));
const CategoriesPage = lazy(() => import('./views/CategoriesPage'));
const BlogHomePage = lazy(() => import('./views/BlogHomePage'));

class BlogRouter extends React.Component {
	render() {
		let path = this.props.match.path;
		return (
			<Suspense fallback={<LoadingView/>}>
				<Switch>
					<Route path={path + 'authors/:authorId/posts/:postId/edit/'} render={() => <PostEditPage/>}/>
					<Route path={path + 'authors/:authorId/posts/:postId/'} render={() => <AuthorPostPage/>}/>
					<Route path={path + 'authors/:authorId/posts/'} render={() => <AuthorPostsPage/>}/>
					<Route path={path + 'posts/:slug/'} render={() => <PostPage/>}/>
					<Route path={path + 'categories/:categoryId/'} render={() => <CategoryPostsPage/>}/>
					<Route path={path + 'categories/'} render={() => <CategoriesPage/>}/>
					<Route path={path} render={() => <BlogHomePage/>}/>
				</Switch>
			</Suspense>
		)
	}
}

export default withRouter(BlogRouter);
