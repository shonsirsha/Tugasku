import React, { useState, useEffect } from "react";
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
	font-size: 18px;
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
	margin-top: 0;
`;
const ProfileTypeContainer = styled.div`
	margin-bottom: 32px;
	-webkit-box-shadow: -1px 2px 20px -3px rgb(133 208 154 / 51%);
	-moz-box-shadow: -1px 2px 20px -3px rgb(133 208 154 / 51%);
	box-shadow: -1px 2px 20px -3px rgb(133 208 154 / 51%);
	padding: 8px;
	padding-left: 16px;
	border-radius: 10px;
	padding-right: 16px;
	display: flex;
	justify-content: space-between;
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
const SelectContainer = styled.div`
	margin-bottom: 16px;
`;
const MenteeSignUpForm = () => {
	const [mentee, setMentee] = useState({
		fullName: "",
		creds: "",
		level: "SD (Sekolah Dasar) / Sederajat",
	});
	const { creds, fullName, level } = mentee;
	const handleChange = (e) => {
		setMentee({ ...mentee, [e.target.name]: e.target.value });
	};

	return (
		<>
			<Row>
				<Col>
					<ProfileTypeContainer>
						<StyledHeadingSM>Siswa / Orang Tua Siswa</StyledHeadingSM>
						<StyledHeadingSM>👩‍🎓 &nbsp;👨‍🎓</StyledHeadingSM>
					</ProfileTypeContainer>
				</Col>
			</Row>
			<Row>
				<Col>
					<InputGroup className="mb-3">
						<InputGroup.Prepend>
							<InputGroup.Text id="basic-addon1">😊</InputGroup.Text>
						</InputGroup.Prepend>
						<FormControl
							placeholder="Nama Siswa (Harus Diisi)"
							name="fullName"
							onChange={handleChange}
						/>
					</InputGroup>
					<InputGroup className="mb-3">
						<InputGroup.Prepend>
							<InputGroup.Text id="basic-addon1">🏫</InputGroup.Text>
						</InputGroup.Prepend>
						<FormControl
							placeholder="Nama Sekolah"
							name="creds"
							onChange={handleChange}
						/>
					</InputGroup>
					<SelectContainer>
						<Form.Control
							size="sm"
							as="select"
							onChange={handleChange}
							name="level"
						>
							<option>SD (Sekolah Dasar) / Sederajat</option>
							<option>SMP (Sekolah Menengah Pertama) / Sederajat</option>
							<option>SMA (Sekolah Menengah Atas) / Sederajat</option>
						</Form.Control>
					</SelectContainer>
				</Col>
			</Row>
			<ResultContainer>
				<Row>
					<Col>
						<CaptionSharp className="mb-2">Pratinjau Profil</CaptionSharp>

						<ProfileCard>
							<Card.Body>
								<CaptionSharp>
									<b>{fullName ? fullName : "Nama Kamu Disini"}</b>
								</CaptionSharp>
								<CaptionSharp>{creds}</CaptionSharp>
								{level.length > 0 && (
									<StyledBadge variant="success">{level}</StyledBadge>
								)}
							</Card.Body>
						</ProfileCard>
						{fullName.length >= 3 && (
							<CaptionSharp className="mb-2">Profilmu sudah oke?</CaptionSharp>
						)}
					</Col>
				</Row>
				{fullName.length >= 3 && (
					<Button variant="outline-success">Lanjutkan</Button>
				)}
			</ResultContainer>
		</>
	);
};
const MentorSignUpForm = () => {
	return (
		<>
			<Row>
				<Col>
					<ProfileTypeContainer>
						<StyledHeadingSM>Mentor</StyledHeadingSM>
						<StyledHeadingSM>👩‍🏫 &nbsp;👨‍🏫 &nbsp;</StyledHeadingSM>
					</ProfileTypeContainer>
				</Col>
			</Row>
			<Row>
				<Col>
					<InputGroup className="mb-3">
						<InputGroup.Prepend>
							<InputGroup.Text id="basic-addon1">😊</InputGroup.Text>
						</InputGroup.Prepend>
						<FormControl placeholder="Nama Lengkap (Harus Diisi)" />
					</InputGroup>
					<InputGroup className="mb-1">
						<InputGroup.Prepend>
							<InputGroup.Text id="basic-addon1">❓</InputGroup.Text>
						</InputGroup.Prepend>
						<FormControl placeholder="Kredensial Anda" />
					</InputGroup>
					<Form.Text className="text-muted mb-3">
						Contoh: Mahasiswa di Universitas X
					</Form.Text>
					<Form.Group controlId="formBasicCheckbox">
						<Form.Check type="checkbox" label="Matematika" />
						<Form.Check type="checkbox" label="IPA" />
						<Form.Check type="checkbox" label="IPS" />
						<Form.Check type="checkbox" label="PPKN" />
						<Form.Check type="checkbox" label="Bahasa Inggris" />
						<Form.Check type="checkbox" label="Seni Budaya" />
						<Form.Check type="checkbox" label="TIK" />
					</Form.Group>
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
								<CaptionSharp>Software Engineer at Snapchat</CaptionSharp>

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
const Welcomer = ({ setWantToRender }) => {
	return (
		<>
			<Row>
				<Col>
					<StyledHeadingSM>Selamat Datang di Tugasku!</StyledHeadingSM>
				</Col>
			</Row>
			<Row>
				<Col>
					<CaptionDefault>Kamu yang Mana?</CaptionDefault>
				</Col>
			</Row>
			<StyledRow>
				<Col>
					<MenteeCard
						onClick={() => {
							setWantToRender("mentee");
						}}
					>
						<Card.Body>
							<Card.Title>Siswa / Orang Tua Siswa </Card.Title>
							<CardSubtitle className="mb-2">
								Silakan klik atau ketuk (tap) disini jika kamu ingin mendaftar
								sebagai siswa / orang tua siswa
							</CardSubtitle>
							<EmojiContainer>👩‍🎓 &nbsp;👨‍🎓</EmojiContainer>
						</Card.Body>
					</MenteeCard>
				</Col>
			</StyledRow>
			<StyledRow>
				<Col>
					<MentorCard
						onClick={() => {
							setWantToRender("mentor");
						}}
					>
						<Card.Body>
							<Card.Title>Mentor</Card.Title>
							<CardSubtitle className="mb-2">
								Silakan klik atau ketuk (tap) disini jika kamu ingin mendaftar
								sebagai mentor
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
	const [wantToRender, setWantToRender] = useState(null);
	const [el, setEl] = useState(<></>);
	useEffect(() => {
		if (wantToRender) {
			if (wantToRender === "mentee") {
				setEl(<MenteeSignUpForm />);
			} else {
				setEl(<MentorSignUpForm />);
			}
		}
	}, [wantToRender]);
	return (
		<>
			{wantToRender ? el : <Welcomer setWantToRender={setWantToRender} />}
			{/* <MentorSignUpForm /> */}
		</>
	);
};

export default SignUp;
