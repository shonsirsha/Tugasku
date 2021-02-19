import {
	CHECK_AUTH,
	USER_AUTH,
	USER_NOT_AUTH,
	SET_LOADING,
	STOP_LOADING,
	SET_AUTH_LOADING,
	SIGN_UP_FAIL,
	SIGN_IN_FAIL,
	USER_EXISTS,
	USER_DOESNT_EXIST,
	RESET_EMAIL_EXISTS,
	RESET_ALERT,
	SIGNED_OUT,
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
