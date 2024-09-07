import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './module/App.tsx'
import "./react-i18next/i18n";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
)
