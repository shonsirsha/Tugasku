import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Row, Button } from "react-bootstrap";
import Home from "./components/pages/Home";
import Welcome from "./components/pages/Welcome";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled from "styled-components";

const StyledContainer = styled(Container)`
	padding-top: 48px;
	padding-bottom: 48px;
	padding-left: 16px;
	padding-right: 16px;
`;
const App = () => {
	return (
		<StyledContainer>
			<Router>
				<Switch>
					<Route path="/" exact component={Home} />
					<Route path="/welcome" exact component={Welcome} />
				</Switch>
			</Router>
		</StyledContainer>
	);
};

export default App;
