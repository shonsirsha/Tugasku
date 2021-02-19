import { useState } from "react";
import Home from "./components/pages/Home";
import SignUpVolunteer from "./components/pages/SignUpVolunteer";
import Navbar from "./components/layout/Navbar";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
	const [modalLoginSignupOpen, setModalLoginSignUpOpen] = useState(false);

	return (
		<Router>
			<Navbar
				setModalLoginSignUpOpen={setModalLoginSignUpOpen}
				modalLoginSignupOpen={modalLoginSignupOpen}
			/>
			<Switch>
				<Route
					exact
					path="/"
					component={() => (
						<Home setModalLoginSignUpOpen={setModalLoginSignUpOpen} />
					)}
				/>
				<Route exact path="/sign-up-volunteer" component={SignUpVolunteer} />
			</Switch>
		</Router>
	);
}

export default App;
