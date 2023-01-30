import React from 'react';
import { format } from 'date-fns';
import { Form, Formik } from 'formik';
import { StyledForm } from './DeliveryFeeCalculatorForm.styles';
import { Box, TextField } from '@mui/material';
import { Delivery } from '../../types';

type Props = {};

const initialValues: Delivery = {
  cartValue: 0,
  deliveryDistance: 0,
  numberOfItems: 0,
  time: '',
};

const DeliveryFeeCalculatorForm: React.FC<Props> = () => {
  return (
    // <></>
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
      }}
      onSubmit={async (values) => {
        await new Promise((r) => setTimeout(r, 500));
        alert(JSON.stringify(values, null, 2));
      }}
    >
      <StyledForm>
        <Box mt={2}>
        <TextField 
         />
        </Box>
        <button type="submit">Submit</button>
      </StyledForm>
    </Formik>
  );
};

export default DeliveryFeeCalculatorForm;
