import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import thunk from 'redux-thunk';

import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';

import registerServiceWorker from './registerServiceWorker';
import counterReducer from './store/reducers/counter';
import resultReducer from './store/reducers/result';

const rootReducer = combineReducers({
	ctr: counterReducer,
	res: resultReducer
})

const logging = store => {
	return next => {
		return action => {
			console.log('[Middleware] action: ', action);
			let returnValue = next(action);
			console.log('[Middleware] store after: ',store.getState());
			return returnValue;
		}
	}
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(logging, thunk)));

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
