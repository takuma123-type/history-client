import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./components/pages/Index";
import SignUp from "./components/pages/SignUp";
import SignIn from "./components/pages/SignIn";
import CreateHistory from "./components/pages/CreateHistory";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/create-history" element={<CreateHistory />} />
        </Routes>
      </Router>
  );
}

export default App;