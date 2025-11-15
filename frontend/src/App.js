import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Dashboard from "./Pages/Dashboard";
import Properties from "./Pages/Properties";

function App() {
  return (
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/properties" element={<Properties />} />
        </Routes>
      </Layout>
  );
}

export default App;



