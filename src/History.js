import {createBrowserHistory} from 'history';
import Res from "./assets/Res";

const History = createBrowserHistory();


History.get_change_lang_url = () => {
	let other_lang;
	if (Res.lang === 'fa') {
		other_lang = '/en';
	} else {
		other_lang = '/fa';
	}
	let url = History.location.pathname + History.location.search;
	if (url.startsWith(`/${Res.lang}`)) {
		return other_lang + url.substring(3);
	} else {
		return other_lang + url;
	}
};
History.pushModal = (pathname, size, state) => {
	History.push(History.location.pathname + History.location.search, {modal_location: {pathname, size, state}});
};
History.modalBack = () => {
	if (History.location.state && History.location.state.modal_location) {
		History.goBack();
	}
};
History.pushLargeModal = (pathname, state) => {
	History.pushModal(pathname, 'large', state);
};
History.pushFreeModal = (pathname, state) => {
	History.pushModal(pathname, 'free', state);
};
History.pushSmallModal = (pathname, state) => {
	History.pushModal(pathname, 'small', state);
};

History.pushMediumModal = (pathname, state) => {
	History.pushModal(pathname, 'medium', state);
};
History.push_url = (url) => {
	History.push(get_lang_url(url));
};
History.replace_url = (url) => {
	History.replace(get_lang_url(url));
};

History.reloadTo = (url) => {
	window.location = get_lang_url(url);
};

History.getUrlStack = () => {
	let location = get_lang_free_url(History.location.pathname);
	if (location.startsWith('/')) {
		location = location.substring(1);
	}
	if (location.endsWith('/')) {
		location = location.substring(0, location.length - 1);
	}
	return location.split('/');
};
export default History;

export function get_lang_url(url) {
	return url;
	// if (url.startsWith('/fa') || url.startsWith('/en')) {
	// 	return url;
	// }
	// return url.startsWith('/') ? `/${R.lang}${url}` : url;
}

export function get_lang_free_url(url) {
	if (url.startsWith('/fa') || url.startsWith('/en')) {
		return url.substring(3).toLowerCase();
	} else {
		return url.toLowerCase();
	}
}
