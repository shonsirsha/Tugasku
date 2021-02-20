import React, { useReducer, useEffect } from "react";
import AuthContext from "./authContext";
import AuthReducer from "./authReducer";
import { db, auth, firebase } from "../../firebase";
import {
	USER_AUTH,
	SET_LOADING,
	STOP_LOADING,
	SIGN_IN_FAIL,
	GET_ALL_QUESTIONS,
	SIGNED_OUT,
	REMOVE_ERROR,
} from "./types";
const AuthState = (props) => {
	const initialState = {
		currentUser: null,
		authLoading: true,
		questions: [],
		authErrorMsg: "",
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
					stopLoading();

					dispatch({ type: SIGN_IN_FAIL, payload: "Format E-mail salah" });
					break;
				case "auth/operation-not-allowed":
					stopLoading();
					console.log(`Error during sign up.`);
					break;
				case "auth/weak-password":
					stopLoading();
					dispatch({
						type: SIGN_IN_FAIL,
						payload: "Password terlalu lemah",
					});

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
			if (error.code === "auth/wrong-password") {
				dispatch({
					type: SIGN_IN_FAIL,
					payload: "Password salah",
				});
			}
			stopLoading();
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
		const { creds, level, id, name, userType, mapel } = userObject;
		try {
			if (userType === 10) {
				await db.collection("users").doc(id).update({
					creds,
					level,
					name,
					userType,
				});
			} else {
				await db.collection("users").doc(id).update({
					creds,
					level,
					name,
					userType,
					mapel,
				});
			}

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
	const getQuestions = async (currentUser) => {
		const { id, userType } = currentUser;
		if (userType === 10) {
			// mentee
			try {
				const allTugas = db.collection("tugas").where("menteeId", "==", id);

				allTugas.onSnapshot(
					(querySnapshot) => {
						let qArray = [];

						querySnapshot.forEach((x) => {
							let allAnswersFromAQuestion = x.data().answers;

							let v = [];

							allAnswersFromAQuestion.map((answerObj, ix) => {
								db.collection("users")
									.where("id", "==", answerObj.mentorId)
									.onSnapshot((userSnapshot) => {
										userSnapshot.forEach((user) => {
											// mentor
											let newAnsObj = {};
											newAnsObj = {
												...answerObj,
												mentorName: user.data().name,
												mentorCreds: user.data().creds,
											};
											v.push(newAnsObj);
										});
										qArray.push({
											...x.data(),
											tugasId: x.id,
											answers: v,
										});
										if (ix === allAnswersFromAQuestion.length - 1) {
											dispatch({
												type: GET_ALL_QUESTIONS,
												payload: { questions: qArray },
											});
										}
									});
							});
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
		} else {
			// mentor
			try {
				let preferredMapel = currentUser.mapel;

				const allTugas = db
					.collection("tugas")
					.where("mapel", "in", preferredMapel);
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
	const answerQuestion = async (ansObj) => {
		const { tugasId, answer, mentorId, time } = ansObj;
		let ans = { answer, mentorId, time };
		try {
			await db
				.collection("tugas")
				.doc(tugasId)
				.update({
					answers: firebase.firestore.FieldValue.arrayUnion(ans),
				});
		} catch (e) {
			console.log("error closing question");
			console.log(e);
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
	const createQuestion = async (questionObj) => {
		try {
			const { questionId } = questionObj;
			const userRef = db.collection("tugas").doc(questionId);
			await userRef.set(questionObj);
		} catch (e) {
			console.log("error creating question");
			console.log(e);
		}
	};
	const signOut = async () => {
		dispatch({
			type: REMOVE_ERROR,
			payload: "Password terlalu lemah",
		});

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
				authErrorMsg: state.authErrorMsg,
				handleSignUp,
				handleSignIn,
				handleSignupToDb,
				updateProfile,
				signOut,
				getQuestions,
				closeQuestion,
				createQuestion,
				answerQuestion,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthState;
