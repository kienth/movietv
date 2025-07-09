import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<LandingPage />} />
      </Routes>
      <Outlet />
    </Router>
  );
}

export default App;
