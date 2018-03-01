import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';

const initialState = {
	results: []
}


const deleteResult = (state, action) => {
	const updatedArray = state.results.filter((el) => el.id !== action.resultId);
	return updateObject(state, {results: updatedArray});
}

const reducer = (state = initialState, action) => {
	switch(action.type) {
		case actionTypes.STORE_RESULT : 
			return updateObject(state, {results: state.results.concat({id: new Date(), value: action.result})});
				//concat w przeciwienstwie do push zwraca nowa tablice !!!
		case actionTypes.DELETE_RESULT : 
			// 1 sposob, splice nie zwraca nowej tablicy wiec trzeba zrobic kopie
			// conts newArray = [...state.results];
			// newArray.splice(id, 1);

			// 2 sposob - filter zwraca nowa tablice
			return deleteResult(state, action);
	}
	return state;
}

export default reducer;