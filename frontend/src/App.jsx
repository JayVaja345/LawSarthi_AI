// frontend/src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Layout/Navbar";
import Home from "./pages/Home";
import LegalQuery from "./pages/LegalQuery";
import Footer from "./components/Layout/Footer";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/query" element={<LegalQuery />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
