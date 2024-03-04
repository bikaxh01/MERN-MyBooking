import Layout from "./layout/Layout";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";

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
          path="/register"
          element={
            <Layout>
            <Register/>
          </Layout>
          }
        />
        <Route
          path="/sign-in"
          element={
            <Layout>
            <SignIn/>
          </Layout>
          }
        />
         <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
