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
	-webkit-box-shadow: -1px 2px 20px -3px ${(props) => props.shadowColor}3F;
	-moz-box-shadow: -1px 2px 20px -3px ${(props) => props.shadowColor}3F;
	box-shadow: -1px 2px 20px -3px ${(props) => props.shadowColor}3F;
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
const Question = ({ question, key }) => {
	return (
		<QuestionCard key={key} shadowColor={mapel[question.mapel].color}>
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
					{question.answers
						? `Lihat ${question.answers.length} jawaban`
						: "Belum ada jawaban"}
				</StyledCaptionSharp>
			</Card.Body>
			<StyledCardFooter className="text-muted">
				{timeDifference(Date.now(), new Date(question.time * 1000))}
				<div>
					{question.status === "open" ? (
						<Button variant="outline-secondary" onClick={() => {}}>
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

	const { name, level, creds } = currentUser;

	const authContext = useContext(AuthContext);
	const { getQuestions, questions } = authContext;
	const [loading, setLoading] = useState(true);
	const [ansQ, setAnsQ] = useState([]);

	useEffect(() => {
		getQuestions(currentUser);
		setLoading(false);
	}, []);

	useEffect(() => {
		setAnsQ(questions.filter((q) => q.answers && q.answers.length > 0));
	}, [questions]);

	return (
		<Row>
			<Col>
				<StyledTabs activeKey={key} onSelect={(k) => setKey(k)}>
					<Tab eventKey="semua_tugas" title="Semua Tugas">
						{loading ? (
							<p>Mengambil semua tugas...</p>
						) : (
							questions.map((q, ix) => <Question question={q} key={ix} />)
						)}
					</Tab>
					<Tab eventKey="tugas_dijawab" title="Tugas Dijawab">
						{loading ? (
							<p>Mengambil semua tugas...</p>
						) : (
							ansQ.map((q, ix) => <Question question={q} key={ix} />)
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
