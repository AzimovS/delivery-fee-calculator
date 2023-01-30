import { styled } from '@mui/material';

export const StyledForm = styled('form')(() => ({
  display: 'flex',
  width: '100%',
  maxWidth: '720px',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: '0 auto',
  '& .submitButton': { margin: '8px 8px 0' },
}));
