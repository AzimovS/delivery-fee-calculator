import React from 'react';
import { format } from 'date-fns';
import { Form, Formik, FormikErrors, FormikTouched } from 'formik';
import { StyledForm } from './DeliveryFeeCalculatorForm.styles';
import { Box, Button, TextField, Typography } from '@mui/material';
import { Delivery } from '../../types';

type Props = {};

interface Errors {
  cartValue?: string;
  deliveryDistance?: string;
  numberOfItems?: string;
  time?: string;
}

const initialValues: Delivery = {
  cartValue: 0,
  deliveryDistance: 0,
  numberOfItems: 0,
  time: '',
};

const DeliveryFeeCalculatorForm: React.FC<Props> = () => {
  const validate = (values: Delivery) => {
    const errors: Errors = {};

    if (!values.cartValue && values.cartValue !== 0) {
      errors.cartValue = 'required';
    } else if (values.cartValue < 0) {
      errors.cartValue = 'The cart value cannot be negative';
    }

    if (!values.deliveryDistance && values.deliveryDistance !== 0) {
      errors.deliveryDistance = 'required';
    } else if (values.deliveryDistance < 0) {
      errors.deliveryDistance = 'The distance cannot not be negative';
    }

    if (!values.numberOfItems) {
      errors.numberOfItems = 'required';
    } else if (!/^\d+$/.test(values.numberOfItems.toString())) {
      errors.numberOfItems = 'Must be an integer';
    }
    return errors;
  };

  const handleSubmit = (values: Delivery) => {
    //s
  }

  return (
    <Formik<Delivery>
      initialValues={initialValues}
      validate={validate}
      onSubmit={handleSubmit}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({ values, errors, handleChange, handleBlur, handleSubmit }) => (
        <StyledForm onSubmit={handleSubmit} noValidate>
          <Box
            mt={2}
            display='flex'
            gap={'20px'}
            flexDirection={'column'}
            alignItems={'center'}
          >
            <TextField
              label='Cart value (€)'
              name='cartValue'
              type='number'
              value={values.cartValue}
              defaultValue={0}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!errors['cartValue']}
              helperText={!!errors['cartValue'] && errors['cartValue']}
              required
            />
            <TextField
              label='Delivery distance (m)'
              name='deliveryDistance'
              type='number'
              value={values.deliveryDistance}
              defaultValue={0}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!errors['deliveryDistance']}
              helperText={!!errors['deliveryDistance'] && errors['deliveryDistance']}
              required
            />
            <TextField
              label='Amount of items'
              name='numberOfItems'
              type='number'
              value={values.numberOfItems}
              defaultValue={0}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!errors['numberOfItems']}
              helperText={!!errors['numberOfItems'] && errors['numberOfItems']}
              required
            />
            <TextField
              label='Time'
              name='time'
              type='string'
              value={values.time}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!errors['time']}
              helperText={!!errors['time'] && errors['time']}
              required
            />
            <TextField
              name='time'
              value={values.time}
              type='datetime-local'
              InputLabelProps={{ shrink: true }}
              inputProps={{
                min: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
              }}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            <Button type='submit' variant='contained'>
              Submit
            </Button>
            <Typography>Delivery price: </Typography>
          </Box>
        </StyledForm>
      )}
    </Formik>
  );
};

export default DeliveryFeeCalculatorForm;
