import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import { Container } from "@mui/material";

import LandingPage from "./pages/LandingPage";
import "./App.css";

function App() {
  return (
    <Router>
      <Container>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/:id" element={<LandingPage />} />
        </Routes>
        <Outlet />
      </Container>
    </Router>
  );
}

export default App;
