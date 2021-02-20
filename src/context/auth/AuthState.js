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
	GET_ALL_QUESTIONS,
	SIGNED_OUT,
} from "./types";
const AuthState = (props) => {
	const initialState = {
		currentUser: null,
		authLoading: true,
		questions: [],
	};

	const [state, dispatch] = useReducer(AuthReducer, initialState);

	useEffect(() => {
		auth.onAuthStateChanged(async (user) => {
			if (user === null) {
				stopLoading();
				//if user isn't authed
			} else {
				handleSignupToDb(user);
			}
		});
		//eslint-disable-next-line
	}, []);

	const handleSignUp = async (logOnDetail) => {
		startLoading();
		const { email, password } = logOnDetail;
		try {
			await auth.createUserWithEmailAndPassword(email, password);
			console.log("new user created");
		} catch (error) {
			switch (error.code) {
				case "auth/email-already-in-use":
					await handleSignIn(logOnDetail);
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

	const handleSignIn = async (logOnDetail) => {
		const { email, password } = logOnDetail;
		try {
			await auth.signInWithEmailAndPassword(email, password);
			console.log("login to existing user");
		} catch (error) {
			console.log("error logging in to an existing user..");
			console.log(error);
		}
	};

	const handleSignupToDb = async (user) => {
		try {
			const userRef = db.collection("users").doc(user.uid);
			const doc = await userRef.get();
			if (!doc.exists) {
				const data = {
					id: user.uid,
					email: user.email,
					name: "",
					creds: -1,
					level: 0,
					userType: -1,
				};

				await userRef.set(data);
				dispatch({
					type: USER_AUTH,
					payload: { currentUser: data },
				});
			} else {
				dispatch({
					type: USER_AUTH,
					payload: { currentUser: doc.data() },
				});
			}
		} catch (err) {
			console.log("WW");
		}
		stopLoading();
	};
	const updateProfile = async (userObject) => {
		startLoading();
		const { creds, level, id, name, userType } = userObject;
		try {
			await db.collection("users").doc(id).update({
				creds,
				level,
				name,
				userType,
			});
			dispatch({
				type: USER_AUTH,
				payload: { currentUser: userObject },
			});
		} catch (err) {
			console.log(err);
			console.log("error updating profile...");
		}
		stopLoading();
	};
	const getQuestions = (currentUser) => {
		const { id, userType } = currentUser;
		if (userType === 10) {
			// mentee
			try {
				const allTugas = db.collection("tugas").where("menteeId", "==", id);

				allTugas.onSnapshot(
					(querySnapshot) => {
						let qArray = [];

						querySnapshot.forEach((x) => {
							qArray.push({ ...x.data(), tugasId: x.id });
						});
						dispatch({
							type: GET_ALL_QUESTIONS,
							payload: { questions: qArray },
						});
					},
					(err) => {
						console.log(`Encountered error: ${err}`);
					}
				);
			} catch (err) {
				console.log(err);
				console.log("error getting all questions");
			}
		}
	};
	const closeQuestion = async (tugasId) => {
		try {
			await db.collection("tugas").doc(tugasId).update({
				status: "closed",
			});
		} catch (e) {
			console.log("error closing question");
			console.log(e);
		}
	};
	const signOut = async () => {
		startLoading();
		try {
			await auth.signOut();

			dispatch({
				type: SIGNED_OUT,
			});
		} catch (err) {
			console.log("auth logout error");
		}
		stopLoading();
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
				questions: state.questions,
				handleSignUp,
				handleSignIn,
				handleSignupToDb,
				updateProfile,
				signOut,
				getQuestions,
				closeQuestion,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthState;
