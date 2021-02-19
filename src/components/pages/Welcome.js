import React from "react";
import { HeadingMD, HeadingSM } from "../Typography/Headings";
import { CaptionDefault } from "../Typography/Caption";
import styled from "styled-components";
import {
	Col,
	Container,
	Row,
	Button,
	Form,
	FormControl,
	Card,
} from "react-bootstrap";
const StyledHeadingSM = styled(HeadingSM)`
	font-size: 21px;
	font-weight: 600;
`;
const StyledRow = styled(Row)`
	margin-top: 16px;
`;
const MenteeCard = styled(Card)`
	background: #a0fbd9;
	border: none;
`;
const MentorCard = styled(Card)`
	background: #eaeaea;
	border: none;
`;
const CardSubtitle = styled.p`
	font-size: 13px;
	font-weight: 300;
`;
const EmojiContainer = styled.div`
	display: flex;
	margin-top: 16px;
`;
const SignUp = () => {
	return (
		<>
			<Row>
				<Col>
					<StyledHeadingSM>Selamat Datang di Tugasku!</StyledHeadingSM>
				</Col>
			</Row>
			<Row>
				<Col>
					<CaptionDefault>Siapakah Kamu?</CaptionDefault>
				</Col>
			</Row>
			<StyledRow>
				<Col>
					<MenteeCard>
						<Card.Body>
							<Card.Title>Siswa / Orang Tua Siswa </Card.Title>
							<CardSubtitle className="mb-2">
								Silakan klik atau ketuk (tap) disini jika ini kamu
							</CardSubtitle>
							<EmojiContainer>👩‍🎓 &nbsp;👨‍🎓</EmojiContainer>
						</Card.Body>
					</MenteeCard>
				</Col>
			</StyledRow>
			<StyledRow>
				<Col>
					<MentorCard>
						<Card.Body>
							<Card.Title>Mentor</Card.Title>
							<CardSubtitle className="mb-2">
								Silakan klik atau ketuk (tap) disini jika ini kamu
							</CardSubtitle>
							<EmojiContainer>👩‍🏫 &nbsp;💚</EmojiContainer>
						</Card.Body>
					</MentorCard>
				</Col>
			</StyledRow>
		</>
	);
};

export default SignUp;
