import React, { useState, useContext, useEffect } from "react";
import {
	Col,
	Container,
	Row,
	Button,
	Form,
	FormControl,
	Tab,
	Tabs,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { HeadingMD, HeadingXS } from "../Typography/Headings";
import styled from "styled-components";
import AuthContext from "../../context/auth/authContext";

const StyledHeadingMD = styled(HeadingMD)`
	font-size: 16px;
`;
const StyledContainer = styled(Container)`
	padding: 32px;
	padding-top: 48px;
	padding-bottom: 48px;
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

	const { handleSignUp } = authContext;

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
					<Form>
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

						<Button
							variant="success"
							onClick={() => {
								handleSignUp(logOnDetail);
							}}
						>
							Lanjutkan
						</Button>
					</Form>
				</Col>
			</Row>
		</>
	);
};
const MenteeView = () => {
	const [key, setKey] = useState("semua_tugas");

	return (
		<Row>
			<Col>
				<StyledTabs activeKey={key} onSelect={(k) => setKey(k)}>
					<Tab eventKey="semua_tugas" title="Semua Tugas">
						aasdsadsdasd{" "}
					</Tab>
					<Tab eventKey="tugas_dijawab" title="Tugas Dijawab">
						asdasd{" "}
					</Tab>
					<Tab eventKey="profile" title="Profil">
						asdasd{" "}
					</Tab>
				</StyledTabs>
			</Col>
		</Row>
	);
};
const Home = () => {
	const authContext = useContext(AuthContext);
	const { currentUser, authLoading } = authContext;
	// const { creds, name, id } = currentUser;
	const [rendered, setRendered] = useState(<></>);
	const history = useHistory();
	useEffect(() => {
		if (currentUser) {
			if (currentUser.creds === -1) {
				history.push("/welcome");
			}
		} else {
			setRendered(<LoginView />);
		}

		console.log(currentUser);
	}, [currentUser]);

	return <>{authLoading && <p>Loading...</p>}</>;
};

export default Home;
