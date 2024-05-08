import React from 'react'
import App from './App.jsx'
import './index.css'
import { createRoot } from "react-dom";

const rootContainer = document.getElementById('root');
const root = createRoot(rootContainer);

root.render(
  <React.StrictMode>
            <App />
  </React.StrictMode>,
)
