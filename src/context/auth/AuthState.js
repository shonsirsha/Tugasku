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
				alert("Wtf");
			} else {
				alert("Signed up!");
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
			console.log(error);
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
