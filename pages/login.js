import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import {
	IconButton,
	CircularProgress,
	Card,
	TextField,
	Typography,
	Link,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { userLogin } from '../redux/actions/auth';
import Config from '../config';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import useStyles from '../styles/auth';

export const LoginPage = ({ userLogin, user, token, loading, error }) => {
	let history = useRouter();
	const classes = useStyles();

	useEffect(() => {
		if (user && token) {
			history.push('/dashboard/home');
		}
	}, [user, token]);

	useEffect(() => {
		if (error) {
			Config.toasterMessage(
				'error',
				error || 'Something went wrong! please try again'
			);
		}
	}, [error]);

	const { register, errors, handleSubmit } = useForm();

	const onSubmit = async (data) => {
		userLogin(data);
	};

	const [values, setValues] = React.useState({
		email: '',
		password: '',
		showPassword: false,
	});

	const handleClickShowPassword = () => {
		setValues({ ...values, showPassword: !values.showPassword });
	};

	return (
		<Grid
			container
			justify="center"
			alignItems="center"
			className={classes.mainSection}
		>
			<Grid item xs={10} sm={10} md={8}>
				<Link className={classes.signInText} variant="caption" href="/">
					<ChevronLeftIcon />
					Home
				</Link>
				<Card className={classes.signUpCard}>
					<Grid
						container
						justify="center"
						alignItems="center"
						className="bg-light-gray"
					>
						<Grid item xs={12} sm={6}>
							<img
								src="/assets/others/loginImage.svg"
								alt="signup image"
								style={{ width: '100%', height: '100%' }}
							/>
						</Grid>
						<Grid item xs={12} sm={6} style={{ padding: '0px 20px' }}>
							{/* <div className="pt-5 pl-9 pr-9  h-full  position-relative"> */}
							<Grid container justify="flex-start">
								<Typography
									className={classes.signUpText}
									component="h2"
									variant="h4"
								>
									Sign In
								</Typography>
							</Grid>
							<Grid container justify="flex-start">
								<Typography
									className={classes.signUpTextWelcome}
									component="h1"
									variant="h3"
								>
									WELCOME BACK
								</Typography>
							</Grid>
							<form onSubmit={handleSubmit(onSubmit)}>
								<div className={classes.root}>
									<TextField
										className={classes.inputField}
										inputRef={register({
											required: 'Email is required',
											pattern: {
												value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
												message: 'Invalid Email',
											},
										})}
										label="Email"
										name="email"
										helperText={errors.email && errors.email.message}
										error={!!errors.email}
										type="text"
									/>

									<TextField
										className={classes.inputField}
										type={values.showPassword ? 'text' : 'password'}
										label="Password"
										inputRef={register({
											required: 'Password Required',
											minLength: {
												value: 5,
												message: 'Password Error',
											},
										})}
										name="password"
										error={!!errors.password}
										helperText={errors.password && errors.password.message}
										InputProps={{
											endAdornment: (
												<InputAdornment position="end">
													<IconButton
														onClick={handleClickShowPassword}
														edge="end"
													>
														{values.showPassword ? (
															<Visibility />
														) : (
															<VisibilityOff />
														)}
													</IconButton>
												</InputAdornment>
											),
										}}
									/>
									<Grid container justify="flex-end">
										<Typography
											className={classes.signInText}
											component="p"
											variant="caption"
										>
											<Link href="/forgot-password">Forgot password?</Link>
										</Typography>
									</Grid>

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
													'Sign in'
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
									Do not have an account?{' '}
									<Link className={classes.signInTextLink} href="/register">
										Sign up
									</Link>
								</Typography>
							</Grid>
							{/* </div> */}
						</Grid>
					</Grid>
				</Card>
			</Grid>
		</Grid>
	);
};

const mapStateToProps = (state) => ({
	user: state.auth.user,
	token: state.auth.token,
	loading: state.auth.loading,
	error: state.auth.error,
});

const mapDispatchToProps = (dispatch) =>
	bindActionCreators({ userLogin }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
