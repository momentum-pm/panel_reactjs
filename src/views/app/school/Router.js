import { Route, Switch, withRouter } from "react-router";
import CoursePage from "./views/CoursePage";
import React, { Suspense } from "react";
import LoadingView from "../../base/refactored/loadingView/LoadingView";
import CourseCreateFormPage from "./views/author/CourseCreateFormPage";
import AuthorCoursesPage from "./views/author/AuthorCoursesPage";
import AuthorCoursePage from "./views/author/AuthorCoursePage";
import SchoolHomePage from "./views/SchoolHomePage";
import ExercisesPage from "./views/ExercisesPage";

class Router extends React.Component {
  render() {
    let path = this.props.match.path;
    return (
      <Suspense fallback={<LoadingView />}>
          <Switch>
         
          <Route
              path={path + "authors/:authorId/courses/create/"}
              render={() => <CourseCreateFormPage />}
            />    
     
            <Route
              path={path + "authors/:authorId/courses/:courseId/"}
              render={() => <AuthorCoursePage />}
            />
            <Route
              path={path + "authors/:authorId/courses/"}
              render={() => <AuthorCoursesPage />}
            />
              <Route
              path={path + "exercises/"}
              render={() => <ExercisesPage />}
            />
            <Route path={path} render={() => <SchoolHomePage />} />
          </Switch>
      </Suspense>
    );
  }
}

export default withRouter(Router);
