import React, { useState, useContext, useEffect } from "react";
import {
	Col,
	Container,
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
import { CaptionDefault, CaptionSharp } from "../Typography/Caption";

import styled from "styled-components";
import AuthContext from "../../context/auth/authContext";

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
const MenteeView = ({ updateProfile, currentUser, signOut }) => {
	const [key, setKey] = useState("semua_tugas");

	const { name, level, creds } = currentUser;
	const [localQ, setLocalQ] = useState([]);

	const authContext = useContext(AuthContext);
	const { getQuestions, questions } = authContext;
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getQuestions(currentUser).then(() => {
			setLoading(false);
		});
	}, []);

	// useEffect(() => {
	// 	alert("wx");
	// 	console.log(questions);
	// }, [questions]);
	// useEffect(() => {}, [currentUser]);

	return (
		<Row>
			<Col>
				<StyledTabs activeKey={key} onSelect={(k) => setKey(k)}>
					<Tab eventKey="semua_tugas" title="Semua Tugas">
						{loading ? (
							<p>Mengambil semua tugas...</p>
						) : (
							questions.map((q) => <div>{q.question}</div>)
						)}
					</Tab>
					<Tab eventKey="tugas_dijawab" title="Tugas Dijawab"></Tab>
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
	// const { creds, name, id } = currentUser;
	const [rendered, setRendered] = useState(<></>);
	const history = useHistory();

	// useEffect(() => {
	// 	if (authLoading) {
	// 		setRendered(<p>Loading...</p>);
	// 	} else {
	// 		if (!currentUser) {
	// 			setRendered(<LoginView />);
	// 		}
	// 	}
	// }, [authLoading]);

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
