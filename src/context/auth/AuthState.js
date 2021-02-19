import React, { useReducer, useEffect } from "react";
import AuthContext from "./authContext";
import AuthReducer from "./authReducer";
import { db, auth } from "../../firebase";
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
} from "./types";
const AuthState = (props) => {
	const initialState = {
		currentUser: null,
		authLoading: false,
	};

	const [state, dispatch] = useReducer(AuthReducer, initialState);

	useEffect(() => {
		auth.onAuthStateChanged(async (user) => {
			if (user === null) {
				//if user isn't authed
			} else {
				await handleSignupToDb(user);
			}
		});
		//eslint-disable-next-line
	}, []);

	const handleSignUp = async (logOnDetail) => {
		// setAuthLoading();
		const { email, password } = logOnDetail;
		try {
			await auth.createUserWithEmailAndPassword(email, password);
			console.log("new user created");
		} catch (error) {
			switch (error.code) {
				case "auth/email-already-in-use":
					console.log(`Email address already in use.`);
					break;
				case "auth/invalid-email":
					console.log(`Email address is invalid.`);
					break;
				case "auth/operation-not-allowed":
					console.log(`Error during sign up.`);
					break;
				case "auth/weak-password":
					console.log(
						"Password is not strong enough. Add additional characters including special characters and numbers."
					);
					break;
				default:
					console.log(error.message);
					break;
			}
		}
	};

	const handleSignupToDb = async (user) => {
		try {
			startLoading();
			const userRef = db.collection("users").doc(user.uid);
			const doc = await userRef.get();
			if (!doc.exists) {
				const data = {
					id: user.uid,
					email: user.email,
					name: "",
					creds: -1,
					level: 0,
				};

				await db.collection("users").doc(user.uid).set(data);
				stopLoading();
			} else {
				dispatch({
					type: USER_AUTH,
					payload: { currentUser: doc.data() },
				});
			}
		} catch (err) {
			console.log("WW");
		}
	};
	const startLoading = () => {
		dispatch({
			type: SET_LOADING,
		});
	};
	const stopLoading = () => {
		dispatch({
			type: STOP_LOADING,
		});
	};
	return (
		<AuthContext.Provider
			value={{
				currentUser: state.currentUser,
				authLoading: state.authLoading,
				handleSignUp,
				handleSignupToDb,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthState;
