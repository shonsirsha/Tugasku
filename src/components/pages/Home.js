import React, { useState } from "react";
import {
	Col,
	Container,
	Row,
	Button,
	Form,
	FormControl,
} from "react-bootstrap";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { HeadingMD, HeadingXS } from "../Typography/Headings";
import styled from "styled-components";
const StyledHeadingMD = styled(HeadingMD)`
	font-size: 16px;
`;
const StyledContainer = styled(Container)`
	padding: 32px;
	padding-top: 48px;
	padding-bottom: 48px;
`;
const StyledRow = styled(Row)`
	margin-top: 16px;
	margin-bottom: 24px;
`;

const StyledFormControl = styled(FormControl)`
	border: none;
	border-bottom: 1.8px solid #00ab6b;
	border-radius: 0;
	margin-bottom: 16px;
	padding: 4px;
`;
const LoginView = () => {
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
						<StyledFormControl type="email" placeholder="E-mail" />
						<StyledFormControl type="password" placeholder="Password" />

						<Button variant="success" type="submit">
							Lanjutkan
						</Button>
					</Form>
				</Col>
			</Row>
		</>
	);
};
const Home = () => {
	return (
		<>
			<LoginView />
		</>
	);
};

export default Home;
