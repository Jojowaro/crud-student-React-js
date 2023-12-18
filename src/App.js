import React from "react";
import Router from "./router/indexRouter";
import Navbar from "./components/navbar";

function App() {
  return (
    <div>
      <Navbar />
      <Router />
    </div>
  );
}

export default App;
