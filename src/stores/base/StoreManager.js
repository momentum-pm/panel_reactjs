import {createStore} from "redux";
import {connect as redux_connect} from "react-redux";

export default class StoreManager {
	static store = this.initStore();


	static reducer(state = {}, action) {
		if (action.type === 'save') {
			let name = action.name;
			let id = action.id;
			let newStoreState = action.state;


			let newState = {};
			let keys = Object.keys(state);
			keys.forEach((key) => {
				if (key !== name) {
					newState[key] = state[key];
				}
			});
			newState[name] = {};
			if (state[name]) {
				let nameKeys = Object.keys(state[name]);
				nameKeys.forEach(key => {
					if (key !== id) {
						newState[name][key] = state[name][key];
					}
				});
			}
			newState[name][id] = {...newStoreState};
			return newState;
		} else {
			return state;
		}
	}

	static save(name, id, state) {
		// setTimeout(() => this.store.dispatch({type: 'save', name, id, state}), 1);
		this.store.dispatch({type: 'save', name, id, state});
	}

	static getState(name, id, state) {
		let storeState = this.store.getState();
		if (storeState[name] && storeState[name][id]) {
			return storeState[name][id];
		} else {
			return {...state};
		}
	}

	static getStore() {
		return this.store;
	}

	static initStore() {
		if (!this.store) {
			return createStore((state, action) => this.reducer(state, action));
		} else {
			return this.store;
		}
	}
}


export function connect(componentClass) {
	const mapStateToProps = (state, ownedProps) => {
		return componentClass.mapPropsToStores(ownedProps);
	};
	const mapDispatchToProps = () => {
		return {};
	};
	return redux_connect(mapStateToProps, mapDispatchToProps, null, {forwardRef: true})(componentClass);
}
