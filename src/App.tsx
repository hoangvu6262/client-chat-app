import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import ChatRoom from "./layouts/ChatRoomLayout";

import SignIn from "./pages/auth/SignIn/SignIn";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="sign-in" element={<SignIn />} />
          </Route>
          <Route path="/chat" element={<ChatRoom />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
