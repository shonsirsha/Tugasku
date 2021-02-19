import React, { useState } from "react";
import styled from "styled-components";
import Modal from "./Modal";

const StyledNav = styled.div`
	padding: 16px 24px;
`;
const Navbar = () => {
	const [modalLoginSignupOpen, setModalLoginSignUpOpen] = useState(false);
	return (
		<StyledNav className="bg-secondary">
			<header className="navbar">
				<section className="navbar-section">
					<img src="https://picturepan2.github.io/spectre/img/spectre-logo.svg" />

					<a href="#" className="btn btn-link">
						Tugasku
					</a>
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
			/>
		</StyledNav>
	);
};

export default Navbar;
