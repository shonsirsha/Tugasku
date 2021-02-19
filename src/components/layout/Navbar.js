import React from "react";
import styled from "styled-components";
import Modal from "./Modal";
import { Link } from "react-router-dom";
const StyledNav = styled.div`
	padding: 16px 24px;
`;

const StyledButtonContainer = styled.div`
	margin-top: 24px;
`;

const SignUpOrLoginForm = () => {
	return (
		<div class="form-group">
			<label class="form-label" for="input-example-1">
				Email
			</label>
			<input class="form-input" type="text" placeholder="contoh@mail.com" />
			<div class="my-1">
				<label class="form-label" for="input-example-1">
					Kata Sandi
				</label>
				<input class="form-input" type="password" placeholder="Kata Sandi" />
			</div>
			<StyledButtonContainer>
				<button class="btn btn-primary">Daftar / Masuk</button>
			</StyledButtonContainer>
		</div>
	);
};

const Navbar = ({ modalLoginSignupOpen, setModalLoginSignUpOpen }) => {
	return (
		<StyledNav className="bg-secondary">
			<header className="navbar">
				<section className="navbar-section">
					<img src="https://picturepan2.github.io/spectre/img/spectre-logo.svg" />

					<Link to="/" className="btn btn-link">
						Tugasku
					</Link>
				</section>
				<section className="navbar-section">
					<a
						onClick={() => {
							setModalLoginSignUpOpen(true);
						}}
						className="btn btn-link"
					>
						Daftar / Masuk
					</a>
				</section>
			</header>
			<Modal
				modalTitle={"Daftar / Masuk"}
				opened={modalLoginSignupOpen}
				setOpen={setModalLoginSignUpOpen}
				content={<SignUpOrLoginForm />}
			/>
		</StyledNav>
	);
};

export default Navbar;
