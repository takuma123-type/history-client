import React from "react";
import { Routes, Route } from "react-router-dom";
import Index from "./components/pages/Index";
import SignUp from "./components/pages/SignUp";
import SignIn from "./components/pages/SignIn";
import CreateHistory from "./components/pages/CreateHistory";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* 誰でもアクセス可能なルート */}
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />

      {/* 認証が必要なルート */}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Index />} />
        <Route path="/create-history" element={<CreateHistory />} />
      </Route>
    </Routes>
  );
}

export default App;
