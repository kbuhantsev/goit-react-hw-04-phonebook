import React from 'react';
import ReactDOM from 'react-dom/client';
import ToggleColorMode from 'components/ToggleColorMode';
import './index.css';
import 'react-toastify/dist/ReactToastify.min.css';
import { StyledEngineProvider } from '@mui/material/styles';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <ToggleColorMode />
    </StyledEngineProvider>
  </React.StrictMode>
);
