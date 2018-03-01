import * as actionTypes from '../actions/actionTypes';

const initialState = {
	results: []
}

const reducer = (state = initialState, action) => {
	switch(action.type) {
		case actionTypes.STORE_RESULT : 
			return {
				...state,
				results: state.results.concat({id: new Date(), 
											   value: action.result})
				//concat w przeciwienstwie do push zwraca nowa tablice !!!
			};
		case actionTypes.DELETE_RESULT :
			// 1 sposob, splice nie zwraca nowej tablicy wiec trzeba zrobic kopie
			// conts newArray = [...state.results];
			// newArray.splice(id, 1);

			// 2 sposob - filter zwraca nowa tablice
			const updatedArray = state.results.filter((el) => el.id !== action.resultId);
			return {
				...state,
				results: updatedArray
			}
	}
	return state;
}

export default reducer;