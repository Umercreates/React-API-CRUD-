import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Box, Button, TextField, Typography } from '@mui/material';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  phone: Yup.string()
    .matches(/^[0-9]{11}$/, 'Phone number must be exactly 10 digits')
    .required('Phone number is required'),
  message: Yup.string().min(11, 'Message must be at least 10 characters').required('Message is required'),
});

export default function ApplicationForm() {
  return (
    <Formik
      initialValues={{ name: '', email: '', phone: '', message: '' }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        console.log('Form Values:', values); 
        resetForm(); 
      }}
    >
      {({ handleSubmit, touched, errors }) => (
        <Form onSubmit={handleSubmit}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            sx={{ width: '100%', maxWidth: 500, margin: '0 auto', p: 3, boxShadow: 3, borderRadius: 2, backgroundColor: '#f9f9f9' }}
          >
            <Typography variant="h4" component="h1" gutterBottom>
              Apply for Job
            </Typography>

            <Field
              as={TextField}
              label="Name"
              name="name"
              fullWidth
              margin="normal"
              error={touched.name && Boolean(errors.name)}
              helperText={<ErrorMessage name="name" />}
            />

            <Field
              as={TextField}
              label="Email"
              name="email"
              fullWidth
              margin="normal"
              error={touched.email && Boolean(errors.email)}
              helperText={<ErrorMessage name="email" />}
            />

            <Field
              as={TextField}
              label="Phone"
              name="phone"
              fullWidth
              margin="normal"
              error={touched.phone && Boolean(errors.phone)}
              helperText={<ErrorMessage name="phone" />}
            />

            <Field
              as={TextField}
              label="Message"
              name="message"
              fullWidth
              margin="normal"
              multiline
              rows={4}
              error={touched.message && Boolean(errors.message)}
              helperText={<ErrorMessage name="message" />}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Submit Application
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
}
