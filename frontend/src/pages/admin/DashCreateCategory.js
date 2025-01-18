import { Box, Typography, TextField, Button } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { createJobTypeAction } from '../../redux/actions/jobTypeAction';

const validationSchema = yup.object({
    jobTypeName: yup
        .string('Enter a Category')
        .required('Category is required'),
});

const DashCreateCategory = () => {
    const { user } = useSelector((state) => state.userProfile);
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            user: user && user._id,
            jobTypeName: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values, actions) => {
            dispatch(createJobTypeAction(values));
            actions.resetForm();
        },
    });

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
                    maxWidth: 400,
                }}
            >
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                    <Typography variant="h5" component="h2" sx={{ pb: 3, color: '#1565C0' }}>
                        Create a Category
                    </Typography>
                    <TextField
                        sx={{ mb: 3 }}
                        fullWidth
                        id="jobTypeName"
                        label="Category"
                        name="jobTypeName"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        placeholder="Category name"
                        value={formik.values.jobTypeName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.jobTypeName && Boolean(formik.errors.jobTypeName)}
                        helperText={formik.touched.jobTypeName && formik.errors.jobTypeName}
                        variant="outlined"
                    />
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
                        Create Category
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default DashCreateCategory;
