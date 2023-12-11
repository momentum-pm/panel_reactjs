import RemoteStore from "../../../../../stores/base/RemoteStore";
import { STORE_TYPE } from "../../../../../stores/base/Store";
import App from "../../../../../stores/app/App";
import { getDatetimeDistanceObject, isPast } from "../../../../../utils/DateUtils";

export default class WelcomeGift extends RemoteStore {
  static storeName = "WelcomeGift";
  static type = STORE_TYPE.SINGLETON;

  getUrl() {
    return `accounting/profiles/${App.getId()}/wallet/get-welcome-gift/`;
  }
  success(data, status) {
    super.success(data, status);
    if (data.expire_date){
      if (!isPast(data.expire_date)){
        this.state.timer = getDatetimeDistanceObject(data.expire_date);
        setInterval(() => {
          if (this.state.timer && this.state.data && this.state.data.expire_date) {
            this.state.timer = getDatetimeDistanceObject(
              this.state.data.expire_date
            );
            this.save();
          }
        }, 1000);  
      }else{
        this.state.isExpired = true;
      }
      
    }
    this.save();
  }
}
