import React, { useReducer, useEffect } from "react";
import AuthContext from "./authContext";
import AuthReducer from "./authReducer";
import app from "../../firebase";

const AuthState = (props) => {
	const db = app.firestore();
	const auth = app.auth();

	const initialState = {
		currentUser: null,
	};

	const [state, dispatch] = useReducer(AuthReducer, initialState);

	useEffect(() => {
		auth.onAuthStateChanged((user) => {
			if (user === null) {
				//if user isn't authed
			} else {
			}
		});
		//eslint-disable-next-line
	}, []);

	const handleSignUp = async (logOnDetail) => {
		// setAuthLoading();
		const { email, password } = logOnDetail;
		try {
			await app.auth().createUserWithEmailAndPassword(email, password);
			console.log("kasil");
		} catch (error) {
			switch (error.code) {
				case "auth/email-already-in-use":
					console.log(`Email address ${this.state.email} already in use.`);
					break;
				case "auth/invalid-email":
					console.log(`Email address ${this.state.email} is invalid.`);
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

	return (
		<AuthContext.Provider
			value={{
				currentUser: state.currentUser,
				handleSignUp,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthState;
