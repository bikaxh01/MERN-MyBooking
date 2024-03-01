import React from "react";
import Layout from "./layout/Layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <p>Hello World</p>
            </Layout>
          }
        />
        <Route
          path="/search"
          element={
            <Layout>
              <p>Hello Search Page</p>
            </Layout>
          }
        />
        <Route
          path="/"
          element={
            <Layout>
              <p>Hello World</p>
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
