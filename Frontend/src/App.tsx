import Layout from "./layout/Layout";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import Add_Hotel from "./pages/Add_Hotel";
import { useAppContext } from "./context/app.context";

function App() {
  const {isLoggin} = useAppContext()
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
        {
          isLoggin && <>
          <Route path="/add-hotel" element={
            <Layout>
              <Add_Hotel/>
            </Layout>
          }></Route>
          </>
        }
         <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
