import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import Upload from './components/Upload';

function App() {
  const [count, setCount] = useState(0)

  const [newUserInfo, setNewUserInfo] = useState({
    profileImages: []
  });

  const updateUploadedFiles = (files: any) =>
  setNewUserInfo({ ...newUserInfo, profileImages: files });

const handleSubmit = (event: any) => {
  event.preventDefault();
  //logic to create new user...
};

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        <p className="App-body">
          <Upload label="Profile Image(s)" updateFilesCb={updateUploadedFiles}/>
        </p>
      </header>
    </div>
  )
}

export default App
