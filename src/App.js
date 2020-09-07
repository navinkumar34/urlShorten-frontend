import React from "react";
import "./styles.css";
import Header from "./commonComponents/header";
import LoginPage from "./pages/loginpage";
import { Switch, Route, Redirect } from "react-router-dom";
import RegisterPage from "./pages/registerpage";
import ForgetPassPage from "./pages/forgetpasspage";
import ResetPassPage from "./pages/resetpasspage";
import UrlShortenPage from "./pages/urlshorten";
import ActivateUserPage from "./pages/activateuser";
import { loggedIn } from "./commonstates/cstates";
import { useRecoilValue } from "recoil";
import DashBoard from "./pages/dashboard";

export default function App() {
  const isloggedIn = useRecoilValue(loggedIn);
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/">
          {isloggedIn ? <Redirect to="/dashboard" /> : <LoginPage />}
        </Route>
        <Route exact path="/dashboard">
          {isloggedIn ? <DashBoard /> : <Redirect to="/" />}
        </Route>
        <Route exact path="/shorten-url">
          {isloggedIn ? <UrlShortenPage /> : <Redirect to="/" />}
        </Route>
        <Route exact path="/register">
          {isloggedIn ? <Redirect to="/dashboard" /> : <RegisterPage />}
        </Route>
        <Route exact path="/forget-password">
          {isloggedIn ? <Redirect to="/dashboard" /> : <ForgetPassPage />}
        </Route>
        <Route exact path="/reset-password/authenticate/:token">
          {isloggedIn ? <Redirect to="/dashboard" /> : <ResetPassPage />}
        </Route>
        <Route exact path="/activateuser/authenticate/:token">
          {isloggedIn ? <Redirect to="/dashboard" /> : <ActivateUserPage />}
        </Route>
        <Redirect from="*" to="/" />
      </Switch>
    </div>
  );
}
