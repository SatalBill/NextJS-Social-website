import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
	CircularProgress,
	Card,
	TextField,
	Typography,
	Dialog,
	DialogActions,
	DialogContent,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { LandingWrapper } from '../components/landing/wrapper';
import { forgotPassword } from '../redux/actions/auth';
import Config from '../config';
// import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		'& > *': {
			width: '100%',
			margin: '20px 0px',
		},
	},

	signInBtn: {
		background: 'linear-gradient(186.43deg, #15AEBF 13.46%, #14D9D9 76.64%)',
		boxShadow: '0px 3px 6px rgba(18, 166, 166, 0.25)',
		borderRadius: '47px',
		width: '355px',
		height: '69px',
		fontStyle: 'normal',
		fontWeight: 500,
		fontSize: '24px',
		lineHeight: '28px',
		letterSpacing: '0.09em',
		color: '#FFFFFF',
		textTransform: 'none',
	},
	signInBtnIcon: {
		background: 'linear-gradient(210.1deg, #15AEBF 13.46%, #14D9D9 76.64%);',
		boxShadow: '0px 3px 6px rgba(18, 166, 166, 0.25)',
		width: 'initial',
		height: 'initial',
		fontStyle: 'normal',
		fontWeight: 500,
		fontSize: '24px',
		lineHeight: '28px',
		letterSpacing: '0.09em',
		transform: 'rotate(75deg)',
		padding: '1rem',
		color: '#FFFFFF',
		textTransform: 'none',
	},
	forwardIcon: {
		transform: 'rotate(-75deg)',
	},
	signUpBtn: {
		background:
			'transparent linear-gradient(112deg, var(--unnamed-color-ff8300) 0%, #FF3100 100%) 0% 0% no-repeat padding-box',
		background:
			'transparent linear-gradient(112deg, #FF8300 0%, #FF3100 100%) 0% 0% no-repeat padding-box',
		borderRadius: '40px',
		width: '100%',
		paddingTop: '12px',
		paddingBottom: '12px',
	},
	signUpText: {
		font: 'normal normal bold 31px/40px Roboto',
		letterSpacing: '0px',
		color: '#262839 !important',
		opacity: 1,
	},
	signUpTextWelcome: {
		font: 'normal normal normal 17px/23px Roboto',
		letterSpacing: '0px',
		color: '#707070 !important',
		opacity: 1,
	},
	signInBtnIcon: {
		background: 'linear-gradient(210.1deg, #F11010 13.46%, #F15151 76.64%);',
		boxShadow: '0px 3px 6px rgba(255, 0, 0, 0.161)',
		width: 'initial',
		height: 'initial',
		fontStyle: 'normal',
		fontWeight: 500,
		fontSize: '24px',
		lineHeight: '28px',
		letterSpacing: '0.09em',
		transform: 'rotate(75deg)',
		padding: '1rem',
		color: '#FFFFFF',
		textTransform: 'none',
	},
	forwardIcon: {
		transform: 'rotate(-75deg)',
	},
	signupGrid: {
		maxHeight: '361px',
		// overflowY: "scroll"
	},
	signInText: {
		color: '#707070',
	},
	signInText: {
		color: '#707070',
		textDecoration: 'none',
		'&:hover': {
			color: '#707070',
		},
	},
}));

const ForgetPassword = ({ forgotPassword, user, token, loading, error }) => {
	let history = useRouter();
	const classes = useStyles();

	// const dispatch = useDispatch();
	// const loginState = useSelector((state) => state.auth);
	const { register, errors, handleSubmit } = useForm();
	const onSubmit = (data) => {
		forgotPassword(data.email);
		// dispatch(actions.forgotPassword(data.email));
		// dispatch(loginWithEmailAndPassword({ ...data, url: "login" }));
	};

	const [values, setValues] = React.useState({
		email: '',
		password: '',
		showPassword: false,
	});
	const [open, setOpen] = useState(false);

	const handleClickShowPassword = () => {
		setValues({ ...values, showPassword: !values.showPassword });
	};

	const handleClose = () => {
		setOpen(false);
		history.push('/login');
	};

	// useEffect(() => {
	// 	if (loginState.retPassword) {
	// 		setOpen(true);
	// 	}
	// }, [loginState]);
	console.log('******');
	return (
		<LandingWrapper>
			<div className="signup flex justify-center w-full h-full-screen">
				{!open && (
					<div
						className="p-8 position-relative y-center"
						style={{ maxHeight: '400px' }}
					>
						<Grid container justify="flex-start">
							<Typography
								className={classes.signInText}
								component="p"
								variant="caption"
							>
								{' '}
								<span
									className={classes.signInTextLink + ' c-pointer'}
									onClick={(e) => history.back()}
								>
									{'<'} Home
								</span>
							</Typography>
						</Grid>
						<Card className="signup-card ">
							<Grid container>
								<Grid item lg={5} md={5} sm={5} xs={12}>
									<div className="p-0 flex justify-center items-center h-full">
										<img
											src="./assets/others/forgetPassword.svg"
											alt=""
											style={{ width: '100%' }}
										/>
									</div>
								</Grid>
								<Grid
									className={classes.signupGrid + ' bg-light-gray'}
									item
									lg={7}
									md={7}
									sm={7}
									xs={12}
								>
									<div className="pt-8 pl-9 pr-9  h-full  position-relative">
										<Grid container justify="flex-start">
											<Typography
												className={classes.signUpText}
												component="h2"
												variant="h4"
											>
												RESET PASSWORD
											</Typography>
										</Grid>
										<Grid container justify="flex-start">
											<Typography
												className={classes.signUpTextWelcome}
												component="h1"
												variant="h3"
											>
												Please enter your email address and we'll send you a
												link to reset your password.
											</Typography>
										</Grid>
										<form onSubmit={handleSubmit(onSubmit)}>
											<div className={classes.root}>
												<TextField
													className={classes.inputField}
													inputRef={register({
														required: 'Email is required',
														pattern: {
															value:
																/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
															message: 'Invalid Email',
														},
													})}
													label="Email"
													name="email"
													helperText={errors.email && errors.email.message}
													error={!!errors.email}
													type="text"
												/>

												<Grid justify="center" className="mt-1 mb-1" container>
													<Grid item xs={8}>
														<Button
															variant="contained"
															color="primary"
															disabled={loading}
															className={classes.signUpBtn}
															type="submit"
														>
															{!loading ? (
																'Submit'
															) : (
																<CircularProgress
																	size={24}
																	style={{
																		color: '#fff',
																	}}
																	className={classes.buttonProgress}
																/>
															)}
														</Button>
													</Grid>
												</Grid>
												{/* <Button
                      style={{ margin: "0px" }}
                      className="text-primary"
                      onClick={() => history.push("/forgot-password")}
                    >
                      Forgot password?
                    </Button> */}
											</div>
										</form>
										<Grid container justify="center">
											<Typography
												className={classes.signInText}
												component="p"
												variant="caption"
											>
												{' '}
												<Link
													className={classes.signInTextLink}
													href="/register"
												>
													Back to sigin
												</Link>
											</Typography>
										</Grid>
									</div>
								</Grid>
							</Grid>
						</Card>
					</div>
				)}
				<Dialog open={open} onClose={handleClose}>
					<DialogContent>
						<Typography component="p" variant="caption">
							We have sent a link to your email, please click and follow the
							instructions to reset password
						</Typography>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose}>Ok</Button>
					</DialogActions>
				</Dialog>
			</div>
		</LandingWrapper>
	);
};

const mapStateToProps = (state) => ({
	user: state.auth.user,
	token: state.auth.token,
	loading: state.auth.loading,
	error: state.auth.error,
});

const mapDispatchToProps = (dispatch) =>
	bindActionCreators({ forgotPassword }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ForgetPassword);
