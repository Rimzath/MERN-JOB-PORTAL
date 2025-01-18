import { Box, MenuItem, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { jobTypeLoadAction } from '../../redux/actions/jobTypeAction';
import { editSingleJobAction, jobLoadSingleAction } from '../../redux/actions/jobAction';
import { useNavigate, useParams } from 'react-router-dom';
import { EDIT_JOB_RESET } from '../../redux/constants/jobconstant';

const validationSchema = yup.object({
    title: yup
        .string('Enter a job title')
        .required('Title is required'),
    description: yup
        .string('Enter a description')
        .min(6, 'Description should be of minimum 6 characters length')
        .required('Description is required'),
    salary: yup
        .number('Enter a salary')
        .required('Salary is required'),
    location: yup
        .string('Enter a location')
        .required('Location is required'),
    available: yup
        .boolean('Add availability')
        .required('Availability is required'),
    jobType: yup
        .string('Select a Category')
        .required('Category is required'),
});

const DashEditJob = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    // Job type loading
    useEffect(() => {
        dispatch(jobTypeLoadAction());
        if (id) {
            dispatch(jobLoadSingleAction(id));
        }
    }, [id]);

    const { jobType } = useSelector(state => state.jobTypeAll);
    const { singleJob, loading } = useSelector(state => state.singleJob);
    const { success } = useSelector(state => state.updateJob);

    const formik = useFormik({
        initialValues: {
            _id: singleJob?._id,
            title: singleJob?.title,
            description: singleJob?.description,
            salary: singleJob?.salary,
            location: singleJob?.location,
            available: singleJob?.available,
            jobType: singleJob?.jobType?._id,
        },
        validationSchema: validationSchema,
        enableReinitialize: true,
        onSubmit: (values, actions) => {
            dispatch(editSingleJobAction(values));
            actions.resetForm();
        },
    });

    // Redirect after successful update
    useEffect(() => {
        if (success) {
            setTimeout(() => {
                dispatch({ type: EDIT_JOB_RESET });
                navigate('/admin/jobs');
            }, 800);
        }
    }, [success]);

    return (
        <Box sx={{ backgroundColor: '#E3F2FD', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', pt: 4 }}>
            <Box
                onSubmit={formik.handleSubmit}
                component="form"
                sx={{
                    backgroundColor: 'white',
                    padding: 3,
                    borderRadius: 2,
                    boxShadow: 3,
                    width: '100%',
                    maxWidth: 500,
                }}
            >
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                    <Typography variant="h5" component="h2" sx={{ pb: 3, color: '#1565C0' }}>
                        Edit Job
                    </Typography>

                    <TextField
                        sx={{ mb: 3 }}
                        fullWidth
                        id="title"
                        label="Title"
                        name="title"
                        InputLabelProps={{ shrink: true }}
                        placeholder="Job Title"
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.title && Boolean(formik.errors.title)}
                        helperText={formik.touched.title && formik.errors.title}
                        variant="outlined"
                    />

                    <TextField
                        sx={{ mb: 3 }}
                        fullWidth
                        id="description"
                        name="description"
                        label="Description"
                        type="text"
                        InputLabelProps={{ shrink: true }}
                        placeholder="Job Description"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.description && Boolean(formik.errors.description)}
                        helperText={formik.touched.description && formik.errors.description}
                        variant="outlined"
                    />

                    <TextField
                        sx={{ mb: 3 }}
                        fullWidth
                        id="salary"
                        name="salary"
                        label="Salary"
                        type="text"
                        InputLabelProps={{ shrink: true }}
                        placeholder="Salary"
                        value={formik.values.salary}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.salary && Boolean(formik.errors.salary)}
                        helperText={formik.touched.salary && formik.errors.salary}
                        variant="outlined"
                    />

                    <TextField
                        sx={{ mb: 3 }}
                        fullWidth
                        id="location"
                        name="location"
                        label="Location"
                        type="text"
                        InputLabelProps={{ shrink: true }}
                        placeholder="Location"
                        value={formik.values.location}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.location && Boolean(formik.errors.location)}
                        helperText={formik.touched.location && formik.errors.location}
                        variant="outlined"
                    />

                    <TextField
                        sx={{ mb: 3 }}
                        fullWidth
                        id="available"
                        name="available"
                        label="Available"
                        type="text"
                        InputLabelProps={{ shrink: true }}
                        placeholder="Availability"
                        value={formik.values.available}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.available && Boolean(formik.errors.available)}
                        helperText={formik.touched.available && formik.errors.available}
                        variant="outlined"
                    />

                    <TextField
                        sx={{ mb: 3 }}
                        fullWidth
                        className="px-2 my-2"
                        variant="outlined"
                        name="jobType"
                        id="jobType"
                        select
                        label="Category"
                        value={formik.values.jobType}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.jobType && Boolean(formik.errors.jobType)}
                        helperText={formik.touched.jobType && formik.errors.jobType}
                    >
                        <MenuItem key="" value="">
                            Select a category
                        </MenuItem>

                        {jobType && jobType.map((cat) => (
                            <MenuItem key={cat._id} value={cat._id}>
                                {cat.jobTypeName}
                            </MenuItem>
                        ))}
                    </TextField>

                    <Button
                        fullWidth
                        variant="contained"
                        type="submit"
                        sx={{
                            backgroundColor: '#1565C0',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: '#0D47A1',
                            },
                        }}
                    >
                        Edit Job
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default DashEditJob;
