import { ChangeEvent, useState } from 'react';
import { IDecodeResponse, IEncodeResponse, IFormState } from '../types';
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  OutlinedInput,
  TextField
} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import axiosApi from '../axiosApi';
import { toast } from 'react-toastify';

const initialState: IFormState = {
  encode: '',
  password: '',
  decode: '',
};

const CipherForm = () => {

  const [formState, setFormState] = useState<IFormState>({
    ...initialState
  });
  const [loading, setLoading] = useState<boolean>(false);

  const onHandleChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setFormState(prevState => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      };
    });
  };

  const onDecode = async () => {

    try {
      if (formState.decode.length > 0 && formState.password.length > 0) {
        setLoading(true);
        const decodeMessage = {message: formState.decode, password: formState.password};
        const {data: decoded} = await axiosApi.post<IDecodeResponse>('/decode', decodeMessage);
        if (decoded) {
          setFormState(prevState => ({
            ...prevState,
            encode: decoded.decoded
          }));
        }
        setLoading(false);
        toast.success(`Message decoded : ${decoded.decoded} `);
      } else {
        toast.error('Decode or password is empty!');
      }
    } catch (error) {
      toast.error(`Something wrong`);
    }
  };

  const onEncode = async () => {
    try {
      if (formState.encode.length > 0 && formState.password.length > 0) {
        setLoading(true);
        const encodeMessage = {message: formState.encode, password: formState.password};
        const {data: encoded} = await axiosApi.post<IEncodeResponse>('/encode', encodeMessage);
        if (encoded) {
          setFormState(prevState => ({
            ...prevState,
            decode: encoded.encoded
          }));
        }
        setLoading(false);
        toast.success(`Message decoded : ${encoded.encoded} `);
      } else {
        toast.error('Encode or password is empty!');
      }
    } catch (error) {
      toast.error(`Something wrong`);
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
        <Grid item alignItems="center" justifyContent="center">
          {loading
            ? <CircularProgress/>
            : <>
              <IconButton component={Button} onClick={onDecode}>
                <ArrowUpwardIcon/>
              </IconButton>
              <IconButton component={Button} onClick={onEncode}>
                <ArrowDownwardIcon/>
              </IconButton>
            </>
          }


        </Grid>

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