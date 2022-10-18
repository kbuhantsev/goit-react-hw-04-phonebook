import React from 'react';
import PropTypes from 'prop-types';
import { customAlphabet } from 'nanoid';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ButtonStyled, FormStyled } from './ContactForm.styled';
import AddIcon from '@mui/icons-material/Add';
import { TextField } from '@mui/material';

const phoneRegExp =
  /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/;
const nameReExp = /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;

const schema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Minimum 3 letters!')
    .matches(nameReExp, 'Name is not valid!')
    .required('This field is required!'),
  number: Yup.string()
    .matches(phoneRegExp, 'Phone number is not valid!')
    .max(13, 'Maximum 13 numbers!')
    .required('This field is required!'),
});

function ContactForm({ onSubmit }) {
  const handleSubmit = (values, { resetForm }) => {
    const { name, number } = values;
    const nanoid = customAlphabet('1234567890', 10);
    const id = 'id-' + nanoid(2);

    if (onSubmit({ id, name, number })) {
      resetForm();
    }
  };

  const formik = useFormik({
    initialValues: { name: '', number: '' },
    validationSchema: schema,
    onSubmit: handleSubmit,
  });

  return (
    <>
      <FormStyled onSubmit={formik.handleSubmit}>
        <TextField
          name="name"
          id="name"
          label="Name"
          variant="outlined"
          required
          size="small"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          name="number"
          id="number"
          label="Number"
          variant="outlined"
          required
          size="small"
          value={formik.values.number}
          onChange={formik.handleChange}
          error={formik.touched.number && Boolean(formik.errors.number)}
          helperText={formik.touched.number && formik.errors.number}
        />
        <ButtonStyled type="submit" variant="outlined" startIcon={<AddIcon />}>
          Add contact
        </ButtonStyled>
      </FormStyled>
    </>
  );
}

ContactForm.tropTypes = { onSubmit: PropTypes.func };

export default ContactForm;
