import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FrontPage from "./components/FrontPage";
import Sidebar from "./components/Sidebar";
import BeatTapes from "./components/BeatTapes";
import { Register } from "./components/Register";
import { Login } from "./components/Login";

function App() {
  return (
    <div className="App flex bg-black overflow-hidden">
      <Router>
        <Sidebar />
        <Routes>
          <Route path="/" element={<FrontPage />} />
          <Route path="/beatTapes" element={<BeatTapes />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
