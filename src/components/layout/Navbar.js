import React from "react";
import styled from "styled-components";
const StyledNav = styled.div`
	padding: 16px 24px;
`;
const Navbar = () => {
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
					<a href="#" className="btn btn-link">
						Daftar / Masuk
					</a>
				</section>
			</header>
		</StyledNav>
	);
};

export default Navbar;
