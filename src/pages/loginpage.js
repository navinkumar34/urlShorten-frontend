import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button, Spinner } from "reactstrap";
import { useHistory } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { loggedIn } from "../commonstates/cstates";
import Counter from "../commonComponents/countDisplay";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const LoginPage = () => {
  const history = useHistory();
  const [emailIn, setEmailIn] = useState("");
  const [passIn, setPassIn] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const setIsloggedIn = useSetRecoilState(loggedIn);
  let sessionstarted = false;

  const emailchange = (event) => {
    setEmailIn(event.target.value);
  };

  const passChange = (event) => {
    setPassIn(event.target.value);
  };

  const login = async (event) => {
    setIsSubmitting(true);
    event.preventDefault();
    await fetch("https://url-shortn-service.herokuapp.com/api/user/login", {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      mode: "cors",
      body: JSON.stringify({ email: emailIn, password: passIn })
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.token) {
          sessionstarted = data;
        } else {
          toast.error(data.error, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 10000
          });
        }
      })
      .catch((error) => {
        toast.error("Internal Server Error", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 10000
        });
      });

    if (sessionstarted) {
      setEmailIn("");
      setPassIn("");
      window.localStorage.setItem("name", sessionstarted.name);
      window.localStorage.setItem("token", sessionstarted.token);
      setIsloggedIn(true);
    }
    setIsSubmitting(false);
  };

  const registerdirect = () => {
    setIsSubmitting(false);
    setEmailIn("");
    setPassIn("");
    history.push("/register");
  };

  const forgetpassdirect = () => {
    setIsSubmitting(false);
    setEmailIn("");
    setPassIn("");
    history.push("/forget-password");
  };

  return (
    <>
      <Counter />
      <div className="loginDiv">
        <h4>Login Form</h4>
        <br />
        <Form id="formElem" onSubmit={login}>
          <FormGroup>
            <Label
              for="emailTxt"
              style={{ display: "block", textAlign: "left" }}
            >
              Email:
            </Label>
            <Input
              type="email"
              name="emailTXT"
              placeholder="Enter email address here..."
              value={emailIn}
              onChange={emailchange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="pwd" style={{ display: "block", textAlign: "left" }}>
              Password :
            </Label>
            <Input
              type="password"
              name="pwd"
              placeholder="Enter password here..."
              value={passIn}
              onChange={passChange}
              required
            />
          </FormGroup>
          {isSubmitting ? (
            <Spinner color="primary" />
          ) : (
            <>
              <Button type="submit" value="submit">
                Login
              </Button>
              <br />
              <Button color="link" onClick={forgetpassdirect}>
                <u>Forgot Password</u>
              </Button>
              <br />
              <Button color="link" onClick={registerdirect}>
                <u>New User / Register</u>
              </Button>
            </>
          )}
        </Form>
      </div>
    </>
  );
};

export default LoginPage;
