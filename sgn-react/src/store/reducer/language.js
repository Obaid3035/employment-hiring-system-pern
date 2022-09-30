import * as actionTypes from '../action/actionTypes';

const initialState = {
	locale: {
		languageId: 'english',
		locale: 'en',
		name: 'English',
		icon: 'en',
	 },
	 languages: [
		{
			languageId: 'english',
			locale: 'en',
			name: 'English',
			icon: 'en',
		},
		{
			languageId: 'france',
			locale: 'fr',
			name: 'French',
			icon: 'fr',
		},
		{
			languageId: 'spanish',
			locale: 'es',
			name: 'spanish',
			icon: 'es',
		},
	],
}

const languageReducer = (state = initialState, action) => {
	switch (action.type) {

		case actionTypes.SET_LANGUAGE:
			console.log(action.payload)
			return { ...state, locale: action.payload };

		default:
			return state
	}
}

export default languageReducer;