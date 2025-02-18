import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';
import Home from './components/home.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Home/>
  </StrictMode>,
);
