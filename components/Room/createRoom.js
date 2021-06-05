import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
	Grid,
	Typography,
	Button,
	DialogTitle,
	DialogContent,
	DialogActions,
	TextField,
	Divider,
} from '@material-ui/core';
import Dropzone from 'react-dropzone';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import useStyles from '../../styles/room';
import { imageViewURL } from '../../config';
import { createOrUpdateRoom } from '../../redux/actions/room';

const CreateRoom = ({
	handleClose,
	type,
	selectedRoom,
	createOrUpdateRoom,
	token,
}) => {
	const classes = useStyles();
	const [files, setFile] = useState([]);

	const validationSchema = () => {
		return Yup.object().shape({
			roomName: Yup.string().required('* Room Name is required'),
		});
	};

	const validate = (getValidationSchema) => {
		return (values) => {
			const validationSchema = getValidationSchema(values);
			try {
				validationSchema.validateSync(values, { abortEarly: false });
				return {};
			} catch (error) {
				return getErrorsFromValidationError(error);
			}
		};
	};

	const getErrorsFromValidationError = (validationError) => {
		const FIRST_ERROR = 0;
		return validationError.inner.reduce((errors, error) => {
			return {
				...errors,
				[error.path]: error.errors[FIRST_ERROR],
			};
		}, {});
	};

	const handleSelectFile = (acceptedFiles) => {
		setFile(
			acceptedFiles.map((file) =>
				Object.assign(file, {
					preview: URL.createObjectURL(file),
				})
			)
		);
	};

	const initialValues = {
		roomName: selectedRoom ? selectedRoom.roomName : '',
		roomDescription: selectedRoom ? selectedRoom.roomDescription : '',
	};

	const handleSubmit = (values) => {
		let payload = {
			roomName: values.roomName,
			roomDescription: values.roomDescription,
			files: files && files.length > 0 ? files[0] : null,
		};
		if (type === 'add') {
			createOrUpdateRoom({ ...payload }, token);
		}
		if (type === 'edit') {
			createOrUpdateRoom(
				{
					...payload,
					roomId: selectedRoom && selectedRoom.id,
				},
				token
			);
		}
	};

	return (
		<div>
			<DialogTitle className={classes.createModalHeader}>
				{type === 'add' ? 'CREATE' : 'EDIT'} ROOM
			</DialogTitle>
			<DialogContent>
				<Formik
					initialValues={initialValues}
					validate={validate(validationSchema)}
					onSubmit={handleSubmit}
					render={({ errors, handleChange, handleSubmit, values }) => (
						<Form onSubmit={handleSubmit}>
							<Grid container spacing={2}>
								<Grid item xs={12} md={4}>
									<Dropzone
										maxSize={512000}
										multiple={false}
										onDrop={(acceptedFiles) => handleSelectFile(acceptedFiles)}
										accept="image/jpeg, image/png"
									>
										{({ getRootProps, getInputProps }) => (
											<Grid container justify="center">
												{files.length && files.length > 0 ? (
													<section className={classes.uploadDragableUpload}>
														<input {...getInputProps()} />
														<div
															{...getRootProps()}
															className={classes.uploadPlaceholderCt}
														>
															{files.map((file, index) => {
																return (
																	<img
																		key={`upload-file-${index}`}
																		src={file.preview}
																		alt={file.name}
																		className={classes.uploadImg}
																	/>
																);
															})}
														</div>
													</section>
												) : selectedRoom && selectedRoom.room_image ? (
													<section className={classes.uploadDragableUpload}>
														<input {...getInputProps()} />
														<div
															{...getRootProps()}
															className={classes.uploadPlaceholderCt}
														>
															<img
																src={imageViewURL + selectedRoom.room_image}
																alt={selectedRoom.roomName}
																className={classes.uploadImg}
															/>
														</div>
													</section>
												) : (
													<section className={classes.uploadDragableUpload}>
														<input {...getInputProps()} />
														<div
															{...getRootProps()}
															className={classes.uploadPlaceholderCt}
														>
															<img
																src="/assets/others/upload.svg"
																alt={''}
																style={{ height: '50px' }}
															/>
															<Typography variant="body1" component="p">
																Upload Profile Photo
															</Typography>
														</div>
													</section>
												)}
											</Grid>
										)}
									</Dropzone>
								</Grid>
								<Grid item xs={12} md={8}>
									<TextField
										id="roomName"
										name="roomName"
										margin="normal"
										onChange={handleChange}
										value={values.roomName || ''}
										placeholder="Room Name"
										variant="outlined"
										helperText={
											errors.roomName && (
												<span className={classes.errorText}>
													{errors.roomName}
												</span>
											)
										}
										InputProps={{
											classes: {
												root: classes.inputFields,
												input: classes.inputFields,
											},
										}}
										style={{ width: '100%' }}
									/>

									<TextField
										id="roomDescription"
										name="roomDescription"
										margin="normal"
										onChange={handleChange}
										multiline={true}
										rows={7}
										value={values.roomDescription || ''}
										placeholder="Room Description"
										variant="outlined"
										helperText={
											errors.roomDescription && (
												<span className={classes.errorText}>
													{errors.roomDescription}
												</span>
											)
										}
										InputProps={{
											classes: {
												root: classes.inputFields,
												input: classes.inputFields,
											},
										}}
										style={{ width: '100%' }}
									/>
								</Grid>
							</Grid>
							<Divider className={classes.divider} />
							<DialogActions className={classes.actionButtons}>
								<Button
									type="submit"
									variant="contained"
									className={classes.okButton}
									size="large"
								>
									OK
								</Button>
								<Button
									onClick={handleClose}
									color="primary"
									variant="outlined"
									className={classes.cancelButton}
									size="large"
								>
									CANCEL
								</Button>
							</DialogActions>
						</Form>
					)}
				/>
			</DialogContent>
		</div>
	);
};

const mapStateToProps = (state) => ({
	token: state.auth.token,
});

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			createOrUpdateRoom,
		},
		dispatch
	);

export default connect(mapStateToProps, mapDispatchToProps)(CreateRoom);
