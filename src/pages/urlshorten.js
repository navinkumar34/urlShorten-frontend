import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button, Spinner } from "reactstrap";
import { useSetRecoilState } from "recoil";
import { loggedIn } from "../commonstates/cstates";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const UrlShortenPage = () => {
  const [urltxt, setUrltxt] = useState("");
  const [shorturltxt, setShorturltxt] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const setIsLoggedIn = useSetRecoilState(loggedIn);
  let sessionexpired = false;
  const history = useHistory();

  const urlinput = (event) => {
    setUrltxt(event.target.value);
  };

  const logoff = (event) => {
    event.preventDefault();
    window.localStorage.removeItem("name");
    window.localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  const getShortUrl = async (event) => {
    event.preventDefault();
    if (urltxt === "") {
      toast.error("Please enter Url", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 10000
      });
      return;
    }
    setIsSubmitting(true);
    await fetch("https://url-shortn-service.herokuapp.com/api/shortenurl", {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
        fullUrl: urltxt
      })
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.login) {
          setUrltxt("");
          toast.error(data.login, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 10000
          });
          sessionexpired = true;
        } else if (data.error) {
          setUrltxt("");
          toast.error(data.error, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 10000
          });
        } else {
          setShorturltxt("Short URL :" + data.shorturl);
        }
      })
      .catch((error) => {
        toast.error("Internal Server Error", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 10000
        });
      });
    if (sessionexpired) {
      window.localStorage.removeItem("name");
      window.localStorage.removeItem("token");
      setIsLoggedIn(false);
    }
    setIsSubmitting(false);
  };

  const dashboarddiect = () => {
    history.push("/dashboard");
  };
  return (
    <>
      <div style={{ display: "block", textAlign: "right" }}>
        <Button color="link" onClick={dashboarddiect}>
          {" "}
          <u>DashBoard</u>{" "}
        </Button>
        <Button color="link" onClick={logoff}>
          <u>
            logout{" "}
            {window.localStorage.getItem("name") !== ""
              ? window.localStorage.getItem("name")
              : ""}
          </u>
        </Button>
      </div>
      <div className="shortdiv">
        <Form>
          <FormGroup>
            <Label for="urltxt">Enter URL:</Label>
            <Input
              type="text"
              name="urltxt"
              placeholder="Enter url here..."
              value={urltxt}
              onChange={urlinput}
            />
          </FormGroup>
          {isSubmitting ? (
            <Spinner color="primary" />
          ) : (
            <>
              <Button onClick={getShortUrl}>Get Short URL</Button>
              <br />
              <br />
              <Label>{shorturltxt}</Label>
            </>
          )}
        </Form>
      </div>
    </>
  );
};

export default UrlShortenPage;
