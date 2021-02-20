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
	InputGroup,
	Tabs,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";

import { HeadingMD, HeadingXS } from "../Typography/Headings";
import { CaptionSharp } from "../Typography/Caption";

import styled from "styled-components";
import AuthContext from "../../context/auth/authContext";
import mapel from "../mapeldict";
import { timeDifference } from "../../utils/timeDifference";
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
	font-size: 14px;
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
const LoginView = () => {
	const authContext = useContext(AuthContext);

	const { handleSignUp, authLoading } = authContext;

	const [logOnDetail, setLogOnDetail] = useState({
		email: "",
		password: "",
	});
	// const { email, password } = logOnDetail;
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

						<Button variant="success" type="submit">
							{authLoading ? "Loading.." : "Lanjutkan"}
						</Button>
					</Form>
				</Col>
			</Row>
		</>
	);
};
const Question = ({ question, ix, closeQuestion }) => {
	return (
		<QuestionCard key={ix} shadowcolor={mapel[question.mapel].color}>
			<Card.Body>
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
					{question.answers.length > 0
						? `Lihat ${question.answers.length} jawaban`
						: "Belum ada jawaban"}
				</StyledCaptionSharp>
			</Card.Body>
			<StyledCardFooter className="text-muted">
				{timeDifference(Date.now(), new Date(question.time))}
				<div>
					{question.status === "open" ? (
						<Button
							variant="outline-secondary"
							onClick={() => {
								closeQuestion(question.tugasId);
							}}
						>
							🔒
						</Button>
					) : (
						"Tugas telah dititup"
					)}
				</div>
			</StyledCardFooter>
		</QuestionCard>
	);
};
const MenteeView = ({ currentUser, signOut }) => {
	const [key, setKey] = useState("semua_tugas");
	const [showNewQModal, setShowNewQModal] = useState(false);
	const { name, level, creds } = currentUser;

	const authContext = useContext(AuthContext);
	const { getQuestions, questions, closeQuestion } = authContext;
	const [loading, setLoading] = useState(true);
	const [ansQ, setAnsQ] = useState([]);

	const [question, setQuestion] = useState({
		question: "",
		mapel: "",
	});

	useEffect(() => {
		getQuestions(currentUser);
		setLoading(false);
	}, []);

	useEffect(() => {
		setAnsQ(questions.filter((q) => q.answers && q.answers.length > 0));
	}, [questions]);

	return (
		<Row>
			<QuestionAnswerModal
				show={showNewQModal}
				onHide={() => setShowNewQModal(false)}
				title={"Tugas Baru"}
				type={"question"}
				stateSetter={setQuestion}
				states={question}
			/>
			<Col>
				<StyledTabs activeKey={key} onSelect={(k) => setKey(k)}>
					<Tab eventKey="semua_tugas" title="Semua Tugas">
						<p style={{ fontSize: "13px", marginBottom: "4px" }}>
							📝 &nbsp;<b>{currentUser.name.split(" ")[0]}</b>, semua tugasmu
							ada disini.
						</p>
						<p style={{ fontSize: "13px", marginBottom: "0" }}>
							🔒 <b>Tutup tugas</b>: tugas yang telah ditutup tidak akan muncul
							di halaman Mentor.
						</p>
						<Button
							className={"my-4"}
							variant="outline-secondary"
							onClick={() => {
								setShowNewQModal(true);
							}}
							style={{ width: "100%" }}
						>
							📝 &nbsp; Buat Tugas Baru
						</Button>
						{loading ? (
							<p>Mengambil semua tugas...</p>
						) : (
							questions
								.sort((a, b) => b.time - a.time)
								.map((q, ix) => (
									<Question
										closeQuestion={closeQuestion}
										question={q}
										ix={ix}
										key={ix}
									/>
								))
						)}
					</Tab>
					<Tab eventKey="tugas_dijawab" title="Tugas Dijawab">
						{loading ? (
							<p>Mengambil semua tugas...</p>
						) : ansQ.length > 0 ? (
							ansQ.map((q, ix) => (
								<Question
									closeQuestion={closeQuestion}
									question={q}
									ix={ix}
									key={ix}
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
								😬 &nbsp; Belum ada tugas yang dijawab...
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
								<StyledBadge variant="success">{level}</StyledBadge>
							</Card.Body>
						</ProfileCard>
						<Button variant="outline-danger mt-auto" onClick={signOut}>
							Keluar
						</Button>
					</Tab>
				</StyledTabs>
			</Col>
		</Row>
	);
};
const QuestionAnswerModal = (props) => {
	const { show, onHide, title, type, stateSetter, states } = props;
	const authContext = useContext(AuthContext);

	const { createQuestion, currentUser } = authContext;

	const handleChange = (e) => {
		stateSetter({ ...states, [e.target.name]: e.target.value });
	};
	const handleSubmit = async () => {
		const time = Date.now();
		await createQuestion({
			...states,
			menteeId: currentUser.id,
			status: "open",
			time,
			answers: [],
			questionId: `${states.mapel}-${time}`,
		});
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
				<Form.Group>
					<Form.Label>Pertanyaan</Form.Label>
					<Form.Control
						as="textarea"
						rows={3}
						onChange={handleChange}
						value={states.question}
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
			</Modal.Body>
			<Modal.Footer>
				{states.question.length > 0 && states.mapel.length > 0 && (
					<Button onClick={handleSubmit} variant="success">
						Kirim
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
						// setRendered(<Mentor />);
					}
				}
			}
		}
	}, [authLoading, currentUser]);

	return <>{rendered}</>;
};

export default Home;
