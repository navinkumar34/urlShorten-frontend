import React, { useState } from "react";
import { Button, Spinner } from "reactstrap";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const ActivateUserPage = () => {
  const history = useHistory();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { token } = useParams();

  const activateaccount = async () => {
    setIsSubmitting(true);
    await fetch(
      "https://url-shortn-service.herokuapp.com/api/user/activateuser",
      {
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST",
        mode: "cors",
        body: JSON.stringify({ token: token })
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          toast.error(data.error, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 10000
          });
        } else if (data.message) {
          toast.success(data.message, {
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
    setIsSubmitting(false);
  };

  const logindirect = () => {
    setIsSubmitting(false);
    history.push("/");
  };
  return (
    <div className="activateDiv">
      {isSubmitting ? (
        <Spinner color="primary" />
      ) : (
        <>
          <Button color="primary" onClick={activateaccount}>
            Click to Activate Your Account
          </Button>
          <br />
          <Button color="link" onClick={logindirect}>
            <u>Login</u>
          </Button>
        </>
      )}
    </div>
  );
};

export default ActivateUserPage;
