import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// The four stylesheets, imported once. The previous version repeated a Google
// Fonts @import across three separate <style> blocks inside the component.
import './styles/tokens.css'
import './styles/base.css'
import './styles/layout.css'
import './styles/components.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
