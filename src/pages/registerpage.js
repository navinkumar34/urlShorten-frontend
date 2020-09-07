import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button, Spinner } from "reactstrap";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [useremail, setUseremail] = useState("");
  const [userpass, setUserpass] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const history = useHistory();

  const usertxtchange = (event) => {
    setUsername(event.target.value);
  };

  const useremailchange = (event) => {
    setUseremail(event.target.value);
  };

  const userpasschange = (event) => {
    setUserpass(event.target.value);
  };

  const registration = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    await fetch("https://url-shortn-service.herokuapp.com/api/user/signup", {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        name: username,
        email: useremail,
        password: userpass
      })
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          toast.error(data.error, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 10000
          });
        } else {
          toast.success(data.message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 10000
          });
        }
        setUseremail("");
        setUsername("");
        setUserpass("");
      })
      .catch((error) => {
        toast.error("Internal Server Error", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 10000
        });
      });
    setIsSubmitting(false);
    document.getElementById("register-form").reset();
  };

  const logindirect = () => {
    setUseremail("");
    setUsername("");
    setUserpass("");
    history.push("/");
  };

  return (
    <div className="registerDiv">
      <h4>Registration Form</h4>
      <br />
      <Form onSubmit={registration} id="register-form">
        <FormGroup>
          <Label for="userTxt" style={{ display: "block", textAlign: "left" }}>
            Username:
          </Label>
          <Input
            type="text"
            name="userTXT"
            placeholder="Enter your name here..."
            value={username}
            onChange={usertxtchange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="emailTxt" style={{ display: "block", textAlign: "left" }}>
            Email:
          </Label>
          <Input
            type="email"
            name="emailTXT"
            placeholder="Enter your email here..."
            value={useremail}
            onChange={useremailchange}
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
            value={userpass}
            onChange={userpasschange}
            required
          />
        </FormGroup>
        {isSubmitting ? (
          <Spinner color="primary" />
        ) : (
          <>
            <Button type="submit" value="submit">
              Register
            </Button>
            <br />
            <Button color="link" onClick={logindirect}>
              <u>Login</u>
            </Button>
          </>
        )}
      </Form>
    </div>
  );
};

export default RegisterPage;
