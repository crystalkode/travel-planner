import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import {HomePage} from "./pages/HomePage";
import { TripsPage } from './pages/TripsPage';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/trips" element={<TripsPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
