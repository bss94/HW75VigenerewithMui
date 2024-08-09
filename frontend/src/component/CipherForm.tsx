import React, { ChangeEvent, useState } from 'react';
import { IFormState } from '../types.ts';
import { Box, Button, FormControl, Grid, IconButton, InputLabel, OutlinedInput, TextField } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

interface Props {
  onDecode: (message: string, password: string) => string;
  onEncode: (message: string, password: string) => string;
}

const CipherForm: React.FC<Props> = ({
  onDecode, onEncode
}) => {
  const [formState, setFormState] = useState<IFormState>({
    encode: '',
    password: '',
    decode: '',
  });
  const onHandleChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setFormState(prevState => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      };
    });
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