const redux = require('redux');
const createStore = redux.createStore;

const initialState = {
	counter: 0,
	other: 0
}

//Reducer
const rootReducer = (state = initialState, action) => {
	//zawsze trzeba stane manipulowac w sposob niemutowalny
	let updatedState = Object.assign({}, state);
	switch(action.type) {
		case 'INC_COUNTER':
			updatedState.counter += 1;
			return updatedState;
			break;
		case 'ADD_COUNTER':
			updatedState.counter += action.value;
			return updatedState;
			break;
	}
	return updatedState; //reducer zwraca zupdatowany state
};

//Store, tu trzeba dolaczyc reducer (ktory moze byc kombinacja kilku reducerow)
const store = createStore(rootReducer);
console.log(store.getState());

//Subsctription, funkcja uruchamiana za kazdym razem gdy akcja jest wykonywana
store.subscribe(() => {
	console.log('[Subscription', store.getState());
})

//Dispatching Action, TRZEBA!!! podac typ akcji (wielkimi literami wg konwencji)
store.dispatch({type: 'INC_COUNTER'});
store.dispatch({type: 'ADD_COUNTER', value: 10});
console.log(store.getState());

