import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import {createStore, combineReducers, applyMiddleware} from 'redux';
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

const store = createStore(rootReducer, applyMiddleware(logging));

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
