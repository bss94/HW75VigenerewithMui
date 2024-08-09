import React, { ChangeEvent, useState } from 'react';
import { IFormState } from '../types.ts';
import { Box, Button, FormControl, Grid, IconButton, InputLabel, OutlinedInput, TextField } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import axiosApi from '../axiosApi.ts';

const initialState: IFormState = {
  encode: '',
  password: '',
  decode: '',
}

const CipherForm: React.FC = () => {

  const [formState, setFormState] = useState<IFormState>({
   ...initialState
  });

  const onHandleChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setFormState(prevState => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      };
    });
  };

  const onDecode = async () => {
    if (formState.decode.length > 0 && formState.password.length > 0) {
      const decodeMessage = {message: formState.decode, password: formState.password};
      const {data: decoded} = await axiosApi.post('/decode', decodeMessage);
      if (decoded) {
        setFormState(prevState => ({
          ...prevState,
          encode: decoded.decoded
        }));
      }
    }else{
      alert('decode or password is empty')
    }
  };

  const onEncode = async () => {
    if (formState.encode.length > 0 && formState.password.length > 0) {
      const encodeMessage = {message: formState.encode, password: formState.password};
      const {data: encoded} = await axiosApi.post('/encode', encodeMessage);
      if (encoded) {
        setFormState(prevState => ({
          ...prevState,
          decode: encoded.encoded
        }));
      }
    }else{
      alert('encode or password is empty')
    }
  };

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': {m: 2, width: '80ch'},
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="encode"
        label="Encode"
        multiline
        rows={4}
        placeholder="Enter message to decode"
        value={formState.encode}
        name={'encode'}
        onChange={onHandleChange}
      />
      <Grid container alignItems="center">
        <FormControl sx={{m: 2, width: '60ch'}}>
          <InputLabel htmlFor="password">Password</InputLabel>
          <OutlinedInput
            id="password"
            placeholder="Enter password to Vigenere code"
            label="Password"
            value={formState.password}
            name={'password'}
            onChange={onHandleChange}
          />
        </FormControl>
        <IconButton component={Button} onClick={onDecode}>
          <ArrowUpwardIcon/>
        </IconButton>
        <IconButton component={Button} onClick={onEncode}>
          <ArrowDownwardIcon/>
        </IconButton>
      </Grid>
      <TextField
        id="decode"
        label="Decode"
        multiline
        rows={4}
        placeholder="Enter message to encode"
        name="decode"
        value={formState.decode}
        onChange={onHandleChange}
      />
    </Box>
  );
};

export default CipherForm;