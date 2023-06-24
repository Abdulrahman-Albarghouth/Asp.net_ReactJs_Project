import React, { Suspense, useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Notification from "./components/Notification/Notification";
import { AuthContext } from "./context/AuthContext";

const Home = React.lazy(() => import("./pages/Home"));
const SignIn = React.lazy(() => import("./pages/SignIn"));
const SignOut = React.lazy(() => import("./pages/SignOut"));
const Profile = React.lazy(() => import("./pages/Profile"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const Wrapper = React.lazy(() => import("./components/Wrapper/Wrapper"));

function App() {

  const { token } = useContext(AuthContext);
  return (
    <>
       {token && (<Routes>
        <Route
          path="/"
          element={
            <Wrapper>
              <Suspense>
                <Home />
              </Suspense>
            </Wrapper>
          }
        />
        
        <Route
          path="/signout"
          element={
            <Wrapper>
              <Suspense>
                <SignOut />
              </Suspense>
            </Wrapper>
          }
        />
        <Route
          path="/profile"
          element={
            <Wrapper>
              <Suspense>
                <Profile />
              </Suspense>
            </Wrapper>
          }
        />
        <Route
          path="/signin"
          element={
            <Wrapper>
              <Suspense>
                <Home />
              </Suspense>
            </Wrapper>
          }
        />
        <Route
          path="*"
          element={
            <Wrapper>
              <Suspense>
                <NotFound />
              </Suspense>
            </Wrapper>
          }
        />
      </Routes>)}
      {!token && (<Routes>
      <Route
          path="*"
          element={
            <Wrapper>
              <Suspense>
                <SignIn />
              </Suspense>
            </Wrapper>
          }
        />
      </Routes>
      )}
      <Notification />
    </>
  );
}

export default App;
