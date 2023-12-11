import RemoteStoreView from "../../../base/RemoteStoreView";
import {Route, Switch, withRouter} from "react-router";
import {connect} from "../../../../stores/base/StoreManager";
import Wallet from "./stores/Wallet";
import LoadingView from "../../../base/refactored/loadingView/LoadingView";
import React, {Suspense} from "react";
import InvoicePaymentPage from "./views/InvoicePaymentPage";
import ChargePage from "./views/ChargePage";
import AccountingPage from "./views/accountingPage/AccountingPage";
import WelcomeGiftPage from "./views/WelcomeGiftPage";

class Router extends RemoteStoreView{
	static getRemoteStore(){
		return Wallet.map();
	}

	getOkView() {
		let path = this.props.match.path;
		return (
			<Suspense fallback={<LoadingView/>}>
				<Switch>
					<Route path={path + 'invoices/:invoiceId/'} render={() => <InvoicePaymentPage/>}/>
					<Route path={path + 'charges/:chargeId/'} render={() => <ChargePage/>}/>
					<Route path={path + 'welcome-page/'} render={() => <WelcomeGiftPage/>}/>
					
					<Route path={path} render={() => <AccountingPage/>}/>

				</Switch>
			</Suspense>
		)
	}
}
export default withRouter(connect(Router));
