import {
	USER_AUTH,
	SET_LOADING,
	STOP_LOADING,
	SIGN_IN_FAIL,
	GET_ALL_QUESTIONS,
	SIGNED_OUT,
	REMOVE_ERROR,
} from "./types";

export default (state, action) => {
	switch (action.type) {
		case USER_AUTH:
			return {
				...state,
				currentUser: action.payload.currentUser,
			};
		case SIGNED_OUT:
			return {
				...state,
				currentUser: null,
				questions: [],
			};
		case SIGN_IN_FAIL:
			return {
				...state,
				authErrorMsg: action.payload,
			};
		case GET_ALL_QUESTIONS:
			return {
				...state,
				questions: action.payload.questions,
			};
		case REMOVE_ERROR:
			return {
				...state,
				authErrorMsg: "",
			};

		case SET_LOADING:
			return {
				...state,
				authLoading: true,
			};

		case STOP_LOADING:
			return {
				...state,
				authLoading: false,
			};
	}
};
