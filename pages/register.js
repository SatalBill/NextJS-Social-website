import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import {
	IconButton,
	Card,
	Grid,
	CircularProgress,
	TextField,
	Typography,
	InputAdornment,
	Button,
	Link,
} from '@material-ui/core';
import { useRouter } from 'next/router';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { useForm } from 'react-hook-form';
import { userRegister, resetUserFlags } from '../redux/actions/auth';
import Config from '../config';
import useStyles from '../styles/auth';

const Register = ({
	userRegister,
	isUserRegistered,
	resetUserFlags,
	loading,
	error,
}) => {
	const classes = useStyles();
	let history = useRouter();
	const { register, errors, handleSubmit, watch } = useForm();
	const password = useRef({});
	password.current = watch('password', '');
	const [values, setValues] = React.useState({
		name: '',
		email: '',
		password: '',
		Username: '',
		showPassword: false,
	});

	useEffect(() => {
		if (isUserRegistered) {
			resetUserFlags();
			history.push('/login');
		}
	}, [isUserRegistered]);

	useEffect(() => {
		if (error) {
			Config.toasterMessage(
				'error',
				error || 'Something went wrong! please try again'
			);
		}
	}, [error]);

	const handleClickShowPassword = () => {
		setValues({ ...values, showPassword: !values.showPassword });
	};

	const onSubmit = async (data) => {
		const payload = {
			username: data.username,
			email: data.email,
			password: data.password,
		};
		userRegister(payload);
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
								src="/assets/others/signupImage.svg"
								alt="signup image"
								style={{ width: '100%', height: '100%' }}
							/>
						</Grid>
						<Grid item xs={12} sm={6} style={{ padding: '0px 20px' }}>
							<Typography
								className={classes.signUpText}
								component="h1"
								variant="h6"
							>
								SIGN UP
							</Typography>
							<form onSubmit={handleSubmit(onSubmit)}>
								<div className={classes.root}>
									<TextField
										inputRef={register({
											required: 'username is required!',
										})}
										label="Username"
										name="username"
										error={!!errors.name}
										helperText={errors.name && errors.name.message}
										type="text"
										className={classes.inputField}
									/>
									{/* <TextField
                      inputRef={register({
                        required: "username is required!",
                      })}
                      label="Username"
                      name="Username"
                      error={!!errors.Username}
                      helperText={errors.Username && errors.Username.message}
                      type="text"
                    /> */}
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
											required: 'Password is Required',
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

									<TextField
										className={classes.inputField}
										type={values.showPassword ? 'text' : 'password'}
										label="Confirm Password"
										inputRef={register({
											validate: (value) =>
												value === password.current ||
												'The passwords do not match',
										})}
										name="confirmPassword"
										error={!!errors.confirmPassword}
										helperText={
											errors.confirmPassword && errors.confirmPassword.message
										}
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

									<Grid container justify="center">
										<Grid item xs={8}>
											<Button
												className={classes.signUpBtn}
												variant="contained"
												color="primary"
												disabled={loading}
												type="submit"
											>
												{!loading ? (
													'Continue'
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
								</div>
							</form>
							<Grid container justify="center">
								<Typography
									className={classes.signInText}
									component="p"
									variant="caption"
								>
									Already have account?{' '}
									<Link className={classes.signInTextLink} href="/login">
										Sign in
									</Link>
								</Typography>
							</Grid>
						</Grid>
					</Grid>
				</Card>
			</Grid>
		</Grid>
	);
};

const mapStateToProps = (state) => ({
	loading: state.auth.loading,
	isUserRegistered: state.auth.isUserRegistered,
	error: state.auth.error,
});

const mapDispatchToProps = (dispatch) =>
	bindActionCreators({ userRegister, resetUserFlags }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Register);
