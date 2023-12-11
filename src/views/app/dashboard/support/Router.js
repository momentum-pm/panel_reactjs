import React from "react";
import "./Styles.scss";
import {Switch, withRouter} from "react-router";
import {Route} from "react-router-dom";
import TicketPage from "./views/ticketView/TicketPage";
import TicketsPage from "./views/TicketsPage";
import TicketCreateFormView from "./views/TicketCreateModal";

class Router extends React.Component {
	render() {
		let path = this.props.match.path;
		return (
			<Switch>
				<Route path={path + 'create/'} component={TicketCreateFormView}/>
				<Route path={path + 'tickets/:ticketId/'} component={TicketPage}/>
				<Route path={path} render={() => <TicketsPage/>}/>
			</Switch>
		);
	}
}

export default withRouter(Router);
