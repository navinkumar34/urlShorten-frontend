import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button, Spinner } from "reactstrap";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const ResetPassPage = () => {
  const history = useHistory();
  const [npass, setNpass] = useState("");
  const [cpass, setCpass] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const npasschange = (event) => {
    setNpass(event.target.value);
  };

  const cpassChange = (event) => {
    setCpass(event.target.value);
  };

  const { token } = useParams();

  const resetpass = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    if (npass !== cpass) {
      toast.error("New Password and Confirm Password didn't match", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 10000
      });
      setIsSubmitting(false);
      return;
    }

    await fetch(
      "https://url-shortn-service.herokuapp.com/api/user/reset-password",
      {
        headers: {
          "Content-Type": "application/json"
        },
        method: "PUT",
        mode: "cors",
        body: JSON.stringify({ resetLink: token, newPass: npass })
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          toast.error(data.error, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 10000
          });
          setNpass("");
          setCpass("");
        } else {
          toast.success(data.message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 10000
          });
          setNpass("");
          setCpass("");
        }
      })
      .catch((error) => {
        toast.error("Internal Server Error", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 10000
        });
      });
    document.getElementById("resetpass-form").reset();
    setIsSubmitting(false);
  };

  const logindirect = () => {
    setCpass("");
    setNpass("");
    setIsSubmitting(false);
    history.push("/");
  };
  return (
    <div className="resetpassDiv">
      <h4>Reset Password</h4>
      <br />
      <Form onSubmit={resetpass} id="resetpass-form">
        <FormGroup>
          <Label for="pwd" style={{ display: "block", textAlign: "left" }}>
            New Password :
          </Label>
          <Input
            type="password"
            name="pwd"
            placeholder="Enter password here..."
            value={npass}
            onChange={npasschange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="cpwd" style={{ display: "block", textAlign: "left" }}>
            Confirm Password :
          </Label>
          <Input
            type="password"
            name="cpwd"
            placeholder="Enter password here..."
            value={cpass}
            onChange={cpassChange}
            required
          />
        </FormGroup>
        {isSubmitting ? (
          <Spinner color="primary" />
        ) : (
          <>
            <Button type="submit" value="submit">
              Submit
            </Button>
            <br />
            <Button color="link" onClick={logindirect}>
              <u>login</u>
            </Button>
          </>
        )}
      </Form>
    </div>
  );
};

export default ResetPassPage;
