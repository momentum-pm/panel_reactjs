import RemoteStoreView from "../../../../base/RemoteStoreView";
import Wallet from "../stores/Wallet";


class WalletLoaderContainer extends RemoteStoreView {
	static getRemoteStore() {
return Wallet.get()
	}
}
