import ReactGA from "react-ga";
import Settings from "../Settings";
import Res from "../assets/Res";
import {get_lang_free_url} from "../History";

export default class Analytics {
	static lastPageViewed;
	static initialized = false;

	static init() {
		if (!Analytics.initialized) {
			this.initialized = true;
			if (!Settings.SAND_BOX) {
				ReactGA.initialize(Settings.ANALYTICS_TRACKING_ID);
			}
		}
	}


	static pageViewed(address) {
		address = get_lang_free_url(address);
		this.init();
		if (!Settings.SAND_BOX) {
			if (address !== this.lastPageViewed) {
				this.lastPageViewed = address;
				ReactGA.set({page: address});
				ReactGA.pageview(address);
			}
		}
	}

	static errorOccurred(data) {
		this.init();
		if (!Settings.SAND_BOX) {
			ReactGA.exception({
				description: data,
				fatal: true
			});
		}
	}

	static logEvent(category, action, value = undefined) {
		this.init();
		if (!Settings.SAND_BOX) {
			ReactGA.event({
				category, action, value,
				label: Res.getLabel(),
			});
		} else {
			console.log('log action', {category, action, value})
		}
	}
}
