import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.module.css';
import LogInPage from './pages/LogInPage/LogInPage';
import CyberManChatPage from './pages/CyberManChatPage/CyberManChatPage';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CyberManChatPage />} />
        <Route path='/login' element={<LogInPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
