import { Routes, Route } from "react-router-dom";

import Home from "../pages/home";
import Add from "../pages/add";
import Edit from "../pages/edit";
import Show from "../pages/show";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/add" element={<Add />} />
      <Route path="/edit/:id" element={<Edit />} />
      <Route path="/show/:id" element={<Show />} />
    </Routes>
  );
}

export default Router;
