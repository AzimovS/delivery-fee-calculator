import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import { Box, Button, TextField, Typography } from '@mui/material';
import { Delivery } from '../../types';

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

const DeliveryFeeCalculatorForm: React.FC = () => {
  const [totalDeliveryFee, setTotalDeliveryFee] = useState<number>(0);

  const validate = (values: Delivery) => {
    const errors: Errors = {};

    if (!values.cartValue && values.cartValue !== 0) {
      errors.cartValue = 'required';
    } else if (values.cartValue < 0) {
      errors.cartValue = 'The cart value cannot be negative';
    }

    if (!values.deliveryDistance && values.deliveryDistance !== 0) {
      errors.deliveryDistance = 'required';
    } else if (!/^\d+$/.test(values.deliveryDistance.toString())) {
      errors.deliveryDistance = 'Must be an integer';
    } else if (values.deliveryDistance < 0) {
      errors.deliveryDistance = 'The distance cannot not be negative';
    }

    if (!values.numberOfItems) {
      errors.numberOfItems = 'required';
    } else if (!/^\d+$/.test(values.numberOfItems.toString())) {
      errors.numberOfItems = 'Must be an integer';
    } else if (values.numberOfItems < 0) {
      errors.numberOfItems = 'The number of items cannot not be negative';
    }

    if (!values.time) {
      errors.time = 'required';
    }
    return errors;
  };

  const calculateDeliveryFee = (values: Delivery) => {
    if (values.cartValue >= 100) {
      return 0;
    }
    const orderSurcharge = Math.max(10 - values.cartValue, 0);
    const distanceFee =
      values.deliveryDistance <= 1000
        ? 2
        : 2 + Math.floor((values.deliveryDistance - 501) / 500);
    let perItemFee = 0;
    if (values.numberOfItems > 4) {
      perItemFee = (values.numberOfItems - 4) * 0.5;
      if (values.numberOfItems > 12) {
        perItemFee += 1.2;
      }
    }
    const day = new Date(values.time).getDay();
    const hours = new Date(values.time).getHours();
    let res = 0;
    if (day === 5 && hours >= 15 && hours < 19) {
      res = 1.2 * (orderSurcharge + distanceFee + perItemFee);
    } else {
      res = orderSurcharge + distanceFee + perItemFee;
    }
    return Math.min(res, 15);
  };

  const handleSubmit = (values: Delivery) => {
    setTotalDeliveryFee(Math.round(calculateDeliveryFee(values) * 100) / 100);
  };

  return (
    <Formik<Delivery>
      initialValues={initialValues}
      validate={validate}
      onSubmit={handleSubmit}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({ values, errors, handleChange, handleBlur, handleSubmit }) => (
        <Form onSubmit={handleSubmit} noValidate>
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
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!errors['deliveryDistance']}
              helperText={
                !!errors['deliveryDistance'] && errors['deliveryDistance']
              }
              required
            />
            <TextField
              label='Amount of items'
              name='numberOfItems'
              type='number'
              value={values.numberOfItems}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!errors['numberOfItems']}
              helperText={!!errors['numberOfItems'] && errors['numberOfItems']}
              required
            />
            <TextField
              name='time'
              value={values.time}
              type='datetime-local'
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!errors['time']}
              helperText={!!errors['time'] && errors['time']}
              required
            />
            <Button type='submit' variant='contained'>
              Submit
            </Button>
            <Typography>Delivery price: {totalDeliveryFee}</Typography>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default DeliveryFeeCalculatorForm;
