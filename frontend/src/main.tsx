import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { CssBaseline } from '@mui/material';
import 'react-toastify/dist/ReactToastify.min.css';
import {ToastContainer} from "react-toastify";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CssBaseline />
    <ToastContainer position="bottom-left"/>
    <App />
  </StrictMode>,
)
