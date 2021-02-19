import React from "react";
import { HeadingMD, HeadingSM } from "../Typography/Headings";
import { CaptionDefault, CaptionSharp } from "../Typography/Caption";
import { Link } from "react-router-dom";

import styled from "styled-components";
import {
	Col,
	Row,
	Button,
	Form,
	FormControl,
	Card,
	Badge,
	InputGroup,
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
	color: black;
`;

const MentorCard = styled(Card)`
	background: #eaeaea;
	border: none;
	color: black;
`;
const CardSubtitle = styled.p`
	font-size: 13px;
	font-weight: 300;
`;
const EmojiContainer = styled.div`
	display: flex;
	margin-top: 16px;
`;
const ResultContainer = styled.div`
	margin-top: 32px;
`;
const ProfileTypeContainer = styled.div`
	margin-bottom: 16px;
`;
const ProfileCard = styled(Card)`
	padding: 4px;
	margin-bottom: 16px;
	.card-body {
		padding: 8px;
	}
`;
const StyledBadge = styled(Badge)`
	margin-top: 16px;
`;
const MenteeSignUpForm = () => {
	return (
		<>
			<Row>
				<Col>
					<ProfileTypeContainer>
						<StyledHeadingSM>
							👩‍🎓 &nbsp;👨‍🎓 Siswa / Orang Tua Siswa
						</StyledHeadingSM>
					</ProfileTypeContainer>
				</Col>
			</Row>
			<Row>
				<Col>
					<InputGroup className="mb-3">
						<InputGroup.Prepend>
							<InputGroup.Text id="basic-addon1">😊</InputGroup.Text>
						</InputGroup.Prepend>
						<FormControl placeholder="Nama Siswa (Harus Diisi)" />
					</InputGroup>
					<InputGroup className="mb-3">
						<InputGroup.Prepend>
							<InputGroup.Text id="basic-addon1">🏫</InputGroup.Text>
						</InputGroup.Prepend>
						<FormControl placeholder="Nama Sekolah" />
					</InputGroup>
					<Form.Control size="sm" as="select">
						<option>SD (Sekolah Dasar) / Setingkat</option>
						<option>SMP (Sekolah Menengah Pertama) / Setingkat</option>
						<option>SMA (Sekolah Menengah Atas) / Setingkat</option>
					</Form.Control>
				</Col>
			</Row>
			<ResultContainer>
				<Row>
					<Col>
						<CaptionSharp className="mb-2">Pratinjau Profil</CaptionSharp>

						<ProfileCard>
							<Card.Body>
								<CaptionSharp>
									<b>Sean Saoírse Leo Liesanggoro</b>
								</CaptionSharp>
								<CaptionSharp>Bina Bangsa School Semarang</CaptionSharp>

								<StyledBadge variant="success">SMA / Setingkat</StyledBadge>
							</Card.Body>
						</ProfileCard>
						<CaptionSharp className="mb-2">Profilmu sudah oke?</CaptionSharp>
					</Col>
				</Row>
				<Button variant="outline-success">Lanjutkan</Button>
			</ResultContainer>
		</>
	);
};
const Welcomer = () => {
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
const SignUp = () => {
	return (
		<>
			{/* <Welcomer /> */}
			<MenteeSignUpForm />
		</>
	);
};

export default SignUp;
