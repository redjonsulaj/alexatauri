import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import Upload from './components/Upload';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Upload/>
      </header>
    </div>
  )
}

export default App
