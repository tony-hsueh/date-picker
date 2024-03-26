import React from 'react'
import ReactDOM from 'react-dom/client'
import DatePicker from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DatePicker showOnlyCurMonth={true} />
    <DatePicker />
  </React.StrictMode>,
)
