import React, { useState, useContext, useEffect } from "react";
import {
	Col,
	Row,
	Button,
	Form,
	FormControl,
	Tab,
	Card,
	Badge,
	Modal,
	Alert,
	Tabs,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";

import { HeadingMD, HeadingXS } from "../Typography/Headings";
import { CaptionSharp } from "../Typography/Caption";

import styled from "styled-components";
import AuthContext from "../../context/auth/authContext";
import mapel from "../mapeldict";
import { timeDifference } from "../../utils/timeDifference";
import { hasBeenAnsweredByMe } from "../../utils/hasBeenAnsweredByMe";

import Slider from "react-slick";

const StyledHeadingMD = styled(HeadingMD)`
	font-size: 16px;
`;
const StyledBadge = styled(Badge)`
	margin-top: 16px;
`;

const StyledRow = styled(Row)`
	margin-top: 0px;
	margin-bottom: 24px;
`;
const StyledFormControl = styled(FormControl)`
	border: none;
	border-bottom: 1.8px solid #00ab6b;
	border-radius: 0;
	margin-bottom: 16px;
	padding: 4px;
`;
const ProfileCard = styled(Card)`
	padding: 4px;
	margin-bottom: 16px;
	.card-body {
		padding: 8px;
	}
`;
const QuestionCard = styled(Card)`
	padding: 4px;
	margin-bottom: 16px;
	padding-bottom: 0px;
	border: none;
	border-radius: 4px;

	.card-body {
		padding: 10px;
	}
	-webkit-box-shadow: -1px 2px 20px -3px ${(props) => props.shadowcolor}3F;
	-moz-box-shadow: -1px 2px 20px -3px ${(props) => props.shadowcolor}3F;
	box-shadow: -1px 2px 20px -3px ${(props) => props.shadowcolor}3F;
`;
const StyledCaptionSharp = styled(CaptionSharp)`
	font-weight: 500;
	font-size: 13px;
`;
const StyledCardFooter = styled(Card.Footer)`
	background: white;
	font-size: 12px;
	padding: 10px;
	display: flex;
	align-items: center;
	justify-content: space-between;
`;
const StyledTabs = styled(Tabs)`
	.nav-item {
		text-align: center;
		color: #17b97d;
		font-weight: 600;
		border: none;
		padding: 0;
		font-size: 14px;
		padding: 6px;
		border-bottom: 0px solid;
		border-radius: 5px;
		margin-right: 16px;
	}

	.nav-item.active {
	}

	&.nav-tabs {
		border: none;
	}

	background: #eaeaea;
	padding: 16px;
	margin-bottom: 24px;
`;
const StyledSlider = styled(Slider)`
	.slick-prev,
	.slick-next {
		display: none !important;
	}
	.slick-slide {
		padding-left: 4px;
		padding-right: 8px;
	}
	.slick-dots {
		bottom: -80px;
		li {
			margin: 0;
		}
		li button:before {
			font-size: 12px;
			opacity: 1;
			color: #b7dccb;
		}
		li.slick-active button:before {
			color: #41d692;
		}
	}
`;
const LoginView = () => {
	const authContext = useContext(AuthContext);

	const { handleSignUp, authLoading, authErrorMsg } = authContext;

	const [logOnDetail, setLogOnDetail] = useState({
		email: "",
		password: "",
	});

	const handleChange = (e) => {
		setLogOnDetail({ ...logOnDetail, [e.target.name]: e.target.value });
	};

	return (
		<>
			<Row>
				<Col>
					<StyledHeadingMD>Daftar / Masuk</StyledHeadingMD>
				</Col>
			</Row>
			<StyledRow>
				<Col>
					<HeadingXS>Masukkan Email & Password Kamu</HeadingXS>
				</Col>
			</StyledRow>
			<Row>
				<Col>
					{authErrorMsg.length > 0 && (
						<Alert variant={"danger"}>{authErrorMsg}</Alert>
					)}

					<Form
						onSubmit={(e) => {
							e.preventDefault();
							handleSignUp(logOnDetail);
						}}
					>
						<StyledFormControl
							type="email"
							placeholder="E-mail"
							name="email"
							onChange={handleChange}
						/>
						<StyledFormControl
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
						/>
						<Form.Text className="text-muted mb-3">
							Password harus lebih dari 5 karakter
						</Form.Text>

						<Button variant="success" type="submit">
							{authLoading ? "Loading.." : "Lanjutkan"}
						</Button>
					</Form>
				</Col>
			</Row>
		</>
	);
};
const AnswerModal = (props) => {
	const { answermodaldetail } = props;
	const settings = {
		dots: true,
		infinite: false,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
	};

	return (
		<Modal {...props} size="lg" centered>
			<Modal.Header closeButton>
				<Modal.Title>Jawaban </Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<StyledSlider {...settings}>
					{answermodaldetail.answers &&
						answermodaldetail.answers
							.sort((a, b) => b.time - a.time)
							.map((x) => (
								<>
									<ProfileCard>
										<Card.Body>
											<CaptionSharp>
												<b>{x.answer}</b>
											</CaptionSharp>
											<hr style={{ marginTop: "8px", marginBottom: "4px" }} />
											<Badge variant="primary">MENTOR 🎖️</Badge>
											<CaptionSharp
												className="mt-1"
												style={{ fontSize: "13px" }}
											>
												<b>{x.mentorName}</b>
											</CaptionSharp>
											<CaptionSharp style={{ fontSize: "13px" }}>
												{x.mentorCreds}
											</CaptionSharp>
										</Card.Body>
									</ProfileCard>
								</>
							))}
				</StyledSlider>
				{answermodaldetail.answers && answermodaldetail.answers.length > 1 && (
					<CaptionSharp>Geser untuk melihat jawaban lainnya</CaptionSharp>
				)}
			</Modal.Body>
			<Modal.Footer style={{ minHeight: "65px" }}></Modal.Footer>
		</Modal>
	);
};
const Question = ({
	question,
	ix,
	closeQuestion,
	setAnswerModalDetail,
	currentUser,
	setAnswerDetail,
	answerDetail,
	setShowNewQModal,
	setModalType,
}) => {
	const { userType, id } = currentUser;
	const [answeredByMe, setAnsweredByMe] = useState(false);
	const handleClick = () => {
		// clicking on the card
		if (question.answers.length > 0 && userType === 10) {
			setAnswerModalDetail({ answers: question.answers, show: true });
		}
	};
	const handleButtonCard = () => {
		if (userType === 10) {
			closeQuestion(question.tugasId);
		} else {
			setModalType("answer");
			setShowNewQModal(true);
			setAnswerDetail({
				...answerDetail,
				tugasId: question.tugasId,
				mentorId: id,
			});
		}
	};

	useEffect(() => {
		setAnsweredByMe(hasBeenAnsweredByMe(question.answers, id));
	}, [question]);
	return (
		<QuestionCard key={ix} shadowcolor={mapel[question.mapel].color}>
			<Card.Body
				onClick={() => {
					handleClick();
				}}
			>
				<CaptionSharp>
					<b>{question.question}</b>
				</CaptionSharp>

				<StyledBadge
					style={{
						backgroundColor: `${mapel[question.mapel].color}`,
						color: "#fff",
					}}
				>
					{mapel[question.mapel].actualName}
				</StyledBadge>
				<StyledCaptionSharp className="mt-1">
					{/* {userType === 10 && `Lihat ${question.answers.length} jawaban`}
					{userType === 20 &&
						`Telah dijawab oleh ${question.answers.length} mentor`} */}
					{question.answers.length > 0
						? userType === 10
							? `Lihat ${question.answers.length} jawaban`
							: `Telah dijawab oleh ${question.answers.length} mentor`
						: "Belum ada jawaban"}
				</StyledCaptionSharp>
			</Card.Body>
			<StyledCardFooter className="text-muted">
				{timeDifference(Date.now(), new Date(question.time))}
				<div>
					{question.status === "open" ? (
						userType == 10 ? (
							<Button
								variant="outline-secondary"
								onClick={() => {
									closeQuestion(question.tugasId);
								}}
							>
								🔒
							</Button>
						) : (
							<>
								{answeredByMe ? (
									<StyledCaptionSharp className="mt-1 text-muted">
										✅
									</StyledCaptionSharp>
								) : (
									<Button
										size={"sm"}
										variant="outline-success"
										onClick={handleButtonCard}
									>
										Jawab
									</Button>
								)}
							</>
						)
					) : (
						<>
							{answeredByMe ? (
								<StyledCaptionSharp className="mt-1 text-muted">
									✅ &nbsp; & &nbsp;🔒
								</StyledCaptionSharp>
							) : (
								"Tugas telah ditutup"
							)}
						</>
					)}
				</div>
			</StyledCardFooter>
		</QuestionCard>
	);
};
const MenteeView = ({ currentUser, signOut }) => {
	const [key, setKey] = useState("semua_tugas");
	const [showNewQModal, setShowNewQModal] = useState(false);
	const [answerModalDetail, setAnswerModalDetail] = useState({
		show: false,
		answers: [],
	});

	const { name, level, creds, userType, id } = currentUser;

	const authContext = useContext(AuthContext);
	const { getQuestions, questions, closeQuestion } = authContext;
	const [loading, setLoading] = useState(true);
	const [ansQ, setAnsQ] = useState([]);

	const [noClosedQ, setNoClosedQ] = useState([]);

	const [question, setQuestion] = useState({
		question: "",
		mapel: "",
	});

	const [modalType, setModalType] = useState("question");

	const [answerDetail, setAnswerDetail] = useState({
		answer: "",
		mentorId: "",
		tugasId: "",
	});

	useEffect(() => {
		getQuestions(currentUser);
		setLoading(false);
	}, []);

	useEffect(() => {
		if (userType === 10) {
			setAnsQ(questions.filter((q) => q.answers && q.answers.length > 0));
		} else {
			setAnsQ(
				questions.filter((q) => q.answers && hasBeenAnsweredByMe(q.answers, id))
			);
			setNoClosedQ(
				questions.filter(
					(q) => q.answers && !hasBeenAnsweredByMe(q.answers, id)
				)
			);
		}
	}, [questions]);

	return (
		<Row>
			<QuestionAnswerModal
				show={showNewQModal}
				onHide={() => {
					setShowNewQModal(false);
					setAnswerDetail({
						answer: "",
						mentorId: "",
						tugasId: "",
					});
					setQuestion({
						question: "",
						mapel: "",
					});
				}}
				title={`${modalType === `question` ? `Tugas Baru` : `Jawab`}`}
				type={modalType}
				stateSetter={setQuestion}
				states={question}
				answerDetail={answerDetail}
				setAnswerDetail={setAnswerDetail}
			/>
			<AnswerModal
				show={answerModalDetail.show}
				onHide={() =>
					setAnswerModalDetail({ ...answerModalDetail, show: false })
				}
				answermodaldetail={answerModalDetail}
			/>
			<Col>
				<StyledTabs activeKey={key} onSelect={(k) => setKey(k)}>
					<Tab eventKey="semua_tugas" title="Semua Tugas">
						{userType === 10 ? (
							<p style={{ fontSize: "13px", marginBottom: "4px" }}>
								📝 &nbsp;<b>{currentUser.name.split(" ")[0]}</b>, semua tugasmu
								ada disini.
							</p>
						) : (
							<>
								<p style={{ fontSize: "13px", marginBottom: "4px" }}>
									📝 &nbsp;<b>{currentUser.name.split(" ")[0]}</b>, semua tugas
									yang sesuai dengan prefrensi mata pelajaranmu dan belum
									ditutup oleh mentee (penanya) ada disini
								</p>
							</>
						)}

						{userType === 10 && (
							<p style={{ fontSize: "13px", marginBottom: "0" }}>
								🔒 <b>Tutup tugas</b>: tugas yang telah ditutup tidak akan
								muncul di halaman Mentor.
							</p>
						)}

						{userType === 10 && (
							<Button
								className={"my-4"}
								variant="outline-secondary"
								onClick={() => {
									setModalType("question");
									setShowNewQModal(true);
								}}
								style={{ width: "100%" }}
							>
								📝 &nbsp; Buat Tugas Baru
							</Button>
						)}

						{!loading && userType === 20 && questions.length < 1 && (
							<p style={{ textAlign: "center", marginTop: "80px" }}>
								<b>Tidak ada tugas</b>
							</p>
						)}

						{loading ? (
							<p>Mengambil semua tugas...</p>
						) : (
							<div className={`${userType === 20 && `mt-2`}`}>
								<>
									{userType === 10 ? (
										<>
											{questions
												.sort((a, b) => b.time - a.time)
												.map((q, ix) => (
													<Question
														closeQuestion={closeQuestion}
														question={q}
														ix={ix}
														key={ix}
														currentUser={currentUser}
														setAnswerModalDetail={setAnswerModalDetail}
														answerModalDetail={answerModalDetail}
														setAnswerDetail={setAnswerDetail}
														answerDetail={answerDetail}
														setShowNewQModal={setShowNewQModal}
														setModalType={setModalType}
													/>
												))}
										</>
									) : (
										<>
											{noClosedQ.length > 0 ? (
												<>
													{noClosedQ
														.sort((a, b) => b.time - a.time)
														.map((q, ix) => (
															<Question
																closeQuestion={closeQuestion}
																question={q}
																ix={ix}
																key={ix}
																currentUser={currentUser}
																setAnswerModalDetail={setAnswerModalDetail}
																answerModalDetail={answerModalDetail}
																setAnswerDetail={setAnswerDetail}
																answerDetail={answerDetail}
																setShowNewQModal={setShowNewQModal}
																setModalType={setModalType}
															/>
														))}
												</>
											) : (
												<Badge
													variant={"success"}
													style={{
														marginLeft: "auto",
														display: "block",
														width: "fit-content",
														marginRight: "auto",
														marginTop: "80px",
													}}
												>
													Tidak ada tugas 😊 ✨
												</Badge>
											)}
										</>
									)}
								</>
								{}
							</div>
						)}
					</Tab>
					<Tab eventKey="tugas_dijawab" title="Tugas Dijawab">
						{userType === 20 && (
							<>
								<p style={{ fontSize: "13px", marginBottom: "4px" }}>
									✅ &nbsp; = Tugas yang sudah kamu jawab
								</p>
								<p style={{ fontSize: "13px", marginBottom: "16px" }}>
									🔒&nbsp;= Tugas sudah ditutup oleh penanya (mentee)
								</p>
							</>
						)}
						{loading ? (
							<p>Mengambil semua tugas...</p>
						) : ansQ.length > 0 ? (
							ansQ
								.sort((a, b) => b.time - a.time)
								.map((q, ix) => (
									<Question
										closeQuestion={closeQuestion}
										question={q}
										ix={ix}
										key={ix}
										currentUser={currentUser}
										setAnswerModalDetail={setAnswerModalDetail}
										answerModalDetail={answerModalDetail}
										setAnswerDetail={setAnswerDetail}
										answerDetail={answerDetail}
										setShowNewQModal={setShowNewQModal}
										setModalType={setModalType}
									/>
								))
						) : (
							<p
								style={{
									fontSize: "13px",
									marginBottom: "4px",
									textAlign: "center",
								}}
							>
								Belum ada tugas yang dijawab
							</p>
						)}
					</Tab>
					<Tab eventKey="profile" title="Profil">
						<ProfileCard>
							<Card.Body>
								<CaptionSharp>
									<b>{name ? name : "Nama Kamu Disini"}</b>
								</CaptionSharp>
								<CaptionSharp>{creds}</CaptionSharp>
								<div
									style={{
										display: `${userType === 20 ? `flex` : `block`}`,
										flexDirection: "column",
									}}
								>
									{userType === 10 ? (
										<StyledBadge variant="success" style={{ marginTop: "8px" }}>
											{level}
										</StyledBadge>
									) : (
										<StyledBadge
											variant="primary"
											style={{ marginTop: "16px", maxWidth: "90px" }}
										>
											MENTOR 🎖️
										</StyledBadge>
									)}
									<div>
										{userType === 20 &&
											currentUser.mapel.map((x) => (
												<StyledBadge
													variant="primary"
													style={{
														marginTop: "4px",
														marginRight: "4px",
														background: `${mapel[x].color}`,
													}}
												>
													{mapel[x].actualName}
												</StyledBadge>
											))}
									</div>
								</div>
							</Card.Body>
						</ProfileCard>
						<Button
							size="sm"
							variant="outline-danger mt-auto"
							onClick={signOut}
						>
							Keluar
						</Button>
					</Tab>
				</StyledTabs>
			</Col>
		</Row>
	);
};
const QuestionAnswerModal = (props) => {
	const {
		show,
		onHide,
		title,
		type,
		stateSetter,
		states,
		answerDetail,
		setAnswerDetail,
	} = props;
	const authContext = useContext(AuthContext);

	const { createQuestion, currentUser, answerQuestion } = authContext;
	const [loading, setLoading] = useState(false);

	const handleChange = (e) => {
		if (type === "question") {
			stateSetter({ ...states, [e.target.name]: e.target.value });
		} else {
			setAnswerDetail({ ...answerDetail, answer: e.target.value });
		}
	};
	const handleSubmit = async () => {
		setLoading(true);

		if (type === "question") {
			const time = Date.now();
			await createQuestion({
				...states,
				menteeId: currentUser.id,
				status: "open",
				time,
				answers: [],
				questionId: `${states.mapel}-${time}`,
			});
			stateSetter({ question: "", mapel: "" });
		} else {
			const time = Date.now();
			const ansObj = {
				time,
				answer: answerDetail.answer,
				tugasId: answerDetail.tugasId,
				mentorId: currentUser.id,
			};
			answerQuestion(ansObj);
		}
		setLoading(false);
		onHide();
	};
	return (
		<Modal
			show={show}
			onHide={onHide}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{type === "question" ? (
					<Form.Group>
						<Form.Label>Pertanyaan</Form.Label>
						<Form.Control
							as="textarea"
							rows={3}
							onChange={handleChange}
							name="question"
						/>
						<Form.Label className="mt-3">Mata Pelajaran:</Form.Label>
						<div>
							<Form.Check
								className="mb-1"
								label="Bahasa Indonesia"
								type={"radio"}
								name="mapel"
								value={"bindo"}
								checked={states.mapel === "bindo"}
								onChange={handleChange}
							/>
							<Form.Check
								className="mb-1"
								label="Bahasa Inggris / Asing"
								type={"radio"}
								name="mapel"
								value={"asing"}
								checked={states.mapel === "asing"}
								onChange={handleChange}
							/>
							<Form.Check
								className="mb-1"
								label="IPA"
								type={"radio"}
								name="mapel"
								value={"ipa"}
								checked={states.mapel === "ipa"}
								onChange={handleChange}
							/>
							<Form.Check
								className="mb-1"
								label="IPS"
								type={"radio"}
								name="mapel"
								value={"ips"}
								checked={states.mapel === "ips"}
								onChange={handleChange}
							/>
							<Form.Check
								className="mb-1"
								label="Matematika"
								type={"radio"}
								name="mapel"
								value={"mtk"}
								checked={states.mapel === "mtk"}
								onChange={handleChange}
							/>
							<Form.Check
								className="mb-1"
								label="PPKN"
								type={"radio"}
								name="mapel"
								value={"pkn"}
								checked={states.mapel === "pkn"}
								onChange={handleChange}
							/>

							<Form.Check
								className="mb-1"
								label="Seni Budaya"
								type={"radio"}
								name="mapel"
								value={"sbk"}
								checked={states.mapel === "sbk"}
								onChange={handleChange}
							/>

							<Form.Check
								className="mb-1"
								label="TIK"
								type={"radio"}
								name="mapel"
								value={"tik"}
								checked={states.mapel === "tik"}
								onChange={handleChange}
							/>
						</div>
					</Form.Group>
				) : (
					<>
						<Form.Group>
							<Form.Label>Jawaban</Form.Label>
							<Form.Control
								as="textarea"
								rows={3}
								onChange={handleChange}
								value={answerDetail.answer}
								name="answer"
							/>
						</Form.Group>
					</>
				)}
			</Modal.Body>
			<Modal.Footer>
				{(answerDetail.answer.length > 0 ||
					(states.question.length > 0 && states.mapel.length > 0)) && (
					<Button
						onClick={() => {
							handleSubmit();
						}}
						variant="success"
						disabled={loading}
					>
						{loading
							? `${type === "question" ? `Membuat...` : `Menjawab...`}`
							: `${type === "question" ? `Buat` : `Jawab`}`}
					</Button>
				)}
			</Modal.Footer>
		</Modal>
	);
};

const Home = () => {
	const authContext = useContext(AuthContext);
	const { currentUser, authLoading, updateProfile, signOut } = authContext;
	const [rendered, setRendered] = useState(<></>);
	const history = useHistory();

	useEffect(() => {
		if (authLoading) {
			setRendered(<p>Loading...</p>);
		} else {
			if (!currentUser) {
				setRendered(<LoginView />);
			} else {
				if (currentUser.creds === -1) {
					history.push("/welcome");
				} else {
					if (currentUser.userType === 10) {
						setRendered(
							<MenteeView
								updateProfile={updateProfile}
								currentUser={currentUser}
								signOut={signOut}
							/>
						);
					} else {
						setRendered(
							<MenteeView
								updateProfile={updateProfile}
								currentUser={currentUser}
								signOut={signOut}
							/>
						);
					}
				}
			}
		}
	}, [authLoading, currentUser]);

	return <>{rendered}</>;
};

export default Home;
