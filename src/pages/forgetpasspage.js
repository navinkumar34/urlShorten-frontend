import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button, Spinner } from "reactstrap";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const ForgetPassPage = () => {
  const history = useHistory();
  const [useremail, setUseremail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const forgetpasslink = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    await fetch(
      "https://url-shortn-service.herokuapp.com/api/user/forget-password",
      {
        headers: {
          "Content-Type": "application/json"
        },
        method: "PUT",
        mode: "cors",
        body: JSON.stringify({ email: useremail })
      }
    )
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
      })
      .catch((error) => {
        toast.error("Internal Server Error", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 10000
        });
      });
    setIsSubmitting(false);
    document.getElementById("forgetpass-form").reset();
  };

  const useremailchange = (event) => {
    setUseremail(event.target.value);
  };

  const logindirect = () => {
    setUseremail("");
    history.push("/");
  };

  const registerdirect = () => {
    setIsSubmitting("");
    setUseremail("");
    history.push("/register");
  };

  return (
    <div className="fpassDiv">
      <h4>Get Password Reset Link</h4>
      <br />
      <Form onSubmit={forgetpasslink} id="forgetpass-form">
        <FormGroup>
          <Label for="emailTxt" style={{ display: "block", textAlign: "left" }}>
            Email:
          </Label>
          <Input
            type="email"
            name="emailTXT"
            placeholder="Enter email address here..."
            value={useremail}
            onChange={useremailchange}
            required
          />
        </FormGroup>
        {isSubmitting ? (
          <Spinner color="primary" />
        ) : (
          <>
            <Button type="submit" value="submit">
              Get Reset Link
            </Button>
            <br />
            <Button color="link" onClick={logindirect}>
              <u>Login</u>
            </Button>
            <br />
            <Button color="link" onClick={registerdirect}>
              <u>New User / Register</u>
            </Button>
          </>
        )}
      </Form>
    </div>
  );
};

export default ForgetPassPage;
