import RemoteStoreView from "../../base/RemoteStoreView";
import {withRouter} from "react-router";
import {connect} from "../../../stores/base/StoreManager";
import Short from "./Short";

class ShortRedirectPage extends RemoteStoreView {
	static getRemoteStore(props) {
		let code = props.match.params.code;
		return Short.map(code, {code})
	}
}

export default withRouter(connect((ShortRedirectPage)));
