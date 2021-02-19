import React, { useState } from "react";
import styled from "styled-components";
const StyledContainer = styled.div`
	padding: 32px;
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 100vh;
`;
const StyledParagraph = styled.p`
	margin-bottom: 8px;
	font-size: 29px;
	font-weight: 600;
`;
const StyledCaption = styled.p`
	margin-bottom: 8px;
	font-size: 18px;
	font-weight: 400;
	color: #5f5f5f;
`;
const CuteCard = styled.div`
	padding: 32px;
	margin-top: auto;
	margin-bottom: auto;
	align-items: justify;
	max-width: 100%;
	border-radius: 10px;
	-webkit-box-shadow: -8px 2px 18px 0px rgba(205, 205, 252, 1);
	-moz-box-shadow: -8px 2px 18px 0px rgba(205, 205, 252, 1);
	box-shadow: -8px 2px 18px 0px rgba(205, 205, 252, 1);
`;
const SignUpButton = styled.button`
	border-radius: 8px;
	margin-top: 16px;
`;
const Home = ({ setModalLoginSignUpOpen }) => {
	return (
		<>
			<StyledContainer>
				<CuteCard className="bg-secondary">
					<StyledParagraph className="text-primary">
						Selamat datang di Tugasku
					</StyledParagraph>
					<StyledCaption>Ingin bertanya?</StyledCaption>
					<StyledCaption>Ingin membantu?</StyledCaption>
					<SignUpButton
						className="btn btn-primary"
						onClick={() => {
							setModalLoginSignUpOpen(true);
						}}
					>
						Daftar Sekarang!
					</SignUpButton>
				</CuteCard>
			</StyledContainer>
		</>
	);
};

export default Home;
