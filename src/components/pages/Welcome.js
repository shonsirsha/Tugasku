import React, { useState, useEffect, useContext } from "react";
import { HeadingMD, HeadingSM } from "../Typography/Headings";
import { CaptionDefault, CaptionSharp } from "../Typography/Caption";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
import { useHistory } from "react-router-dom";

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
	const authContext = useContext(AuthContext);
	const { updateProfile, currentUser } = authContext;
	const { creds, fullName, level } = mentee;
	const handleChange = (e) => {
		setMentee({ ...mentee, [e.target.name]: e.target.value });
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		await updateProfile({
			id: currentUser.id,
			name: fullName,
			creds,
			level,
			userType: 10,
		});
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
			<Form onSubmit={handleSubmit}>
				<Row>
					<Col>
						<InputGroup className="mb-3">
							<InputGroup.Prepend>
								<InputGroup.Text>😊</InputGroup.Text>
							</InputGroup.Prepend>
							<FormControl
								placeholder="Nama Siswa (Harus Diisi)"
								name="fullName"
								onChange={handleChange}
							/>
						</InputGroup>
						<InputGroup className="mb-3">
							<InputGroup.Prepend>
								<InputGroup.Text>🏫</InputGroup.Text>
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
							{fullName.length >= 1 && (
								<CaptionSharp className="mb-2">
									Profilmu sudah oke?
								</CaptionSharp>
							)}
						</Col>
					</Row>
					{fullName.length >= 3 && (
						<Button variant="outline-success" type="submit">
							Lanjutkan
						</Button>
					)}
				</ResultContainer>
			</Form>
		</>
	);
};
const MentorSignUpForm = () => {
	const [mentor, setMentor] = useState({
		fullName: "",
		creds: "",
		mapel: [],
	});
	const authContext = useContext(AuthContext);
	const { updateProfile, currentUser } = authContext;
	const { mapel, creds, fullName } = mentor;
	const handleChange = (e) => {
		setMentor({ ...mentor, [e.target.name]: e.target.value });
	};
	const handleCheckbox = (e) => {
		let s = mapel;
		// setMentor({...mentor, mapel: e.target.value})
		if (e.target.checked) {
			s.push(e.target.value);
		} else {
			const ix = s.indexOf(e.target.value);
			s.splice(ix, 1);
		}
		setMentor({ ...mentor, mapel: s });
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		await updateProfile({
			id: currentUser.id,
			name: fullName,
			creds,
			level: -1,
			userType: 20,
			mapel,
		});
	};
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
			<Form onSubmit={handleSubmit}>
				<Row>
					<Col>
						<InputGroup className="mb-3">
							<InputGroup.Prepend>
								<InputGroup.Text>😊</InputGroup.Text>
							</InputGroup.Prepend>
							<FormControl
								placeholder="Nama Lengkap (Harus Diisi)"
								onChange={handleChange}
								name="fullName"
							/>
						</InputGroup>
						<InputGroup className="mb-1">
							<InputGroup.Prepend>
								<InputGroup.Text>❓</InputGroup.Text>
							</InputGroup.Prepend>
							<FormControl
								placeholder="Kredensial Anda"
								name="creds"
								onChange={handleChange}
							/>
						</InputGroup>
						<Form.Text className="text-muted mb-3">
							Contoh: Mahasiswa di Universitas X
						</Form.Text>
						<StyledHeadingSM>Mata Pelajaran:</StyledHeadingSM>

						<Form.Group
							onChange={handleCheckbox}
							className="mt-2"
							controlId="formBasicCheckbox"
						>
							<Form.Check type="checkbox" label="Matematika" value="mtk" />
							<Form.Check type="checkbox" label="IPA" value="ipa" />
							<Form.Check type="checkbox" label="IPS" value="ips" />
							<Form.Check type="checkbox" label="PPKN" value="pkn" />
							<Form.Check
								type="checkbox"
								label="Bahasa Indonesia"
								value="bindo"
							/>
							<Form.Check
								type="checkbox"
								label="Bahasa Inggris / Bahasa Asing"
								value="asing"
							/>
							<Form.Check type="checkbox" label="Seni Budaya" value="sbk" />
							<Form.Check type="checkbox" label="TIK" value="tik" />
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
										{fullName.length > 0 ? (
											<b>{fullName}</b>
										) : (
											"Nama Kamu Disini"
										)}
									</CaptionSharp>
									<CaptionSharp>{creds}</CaptionSharp>

									<StyledBadge variant="primary">MENTOR 🎖️</StyledBadge>
								</Card.Body>
							</ProfileCard>
							{fullName.length > 0 && mapel.length > 0 && (
								<CaptionSharp className="mb-2">
									Profilmu sudah oke?
								</CaptionSharp>
							)}
						</Col>
					</Row>
					{fullName.length > 0 && mapel.length > 0 && (
						<Button type="submit" variant="outline-success">
							Lanjutkan
						</Button>
					)}
				</ResultContainer>
			</Form>
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
	const authContext = useContext(AuthContext);
	const history = useHistory();

	const { currentUser } = authContext;

	useEffect(() => {
		if (currentUser === null || currentUser.creds !== -1) {
			history.push("/");
		} else {
			if (wantToRender) {
				if (wantToRender === "mentee") {
					setEl(<MenteeSignUpForm />);
				} else {
					setEl(<MentorSignUpForm />);
				}
			}
		}
	}, [currentUser, wantToRender]);
	return (
		<>
			{wantToRender ? el : <Welcomer setWantToRender={setWantToRender} />}
			{/* <MentorSignUpForm /> */}
		</>
	);
};

export default SignUp;
