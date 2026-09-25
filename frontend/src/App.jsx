import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";


import MainPage from "./features/MainPage/Pages/MainPage";
import Login from "./features/Login/Pages/Login";
import ShowTopics from "./features/ShowTopics/Pages/ShowTopics";


function App() {


  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Navigate to="/" replace />} />
            <Route path="/main" element={<MainPage />} />
            <Route path="/show-topics" element={<ShowTopics />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
