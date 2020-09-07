import React, { useState, useEffect } from "react";
import { Table, Button } from "reactstrap";
import { useSetRecoilState } from "recoil";
import { loggedIn } from "../commonstates/cstates";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const DashBoard = () => {
  const [surls, setSurls] = useState([]);
  const setIsLoggedIn = useSetRecoilState(loggedIn);
  const History = useHistory();

  useEffect(() => {
    fetch("https://url-shortn-service.herokuapp.com/api/shortenurl/all", {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      mode: "cors",
      body: JSON.stringify({ token: window.localStorage.getItem("token") })
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.shortUrls) {
          setSurls(data.shortUrls);
        } else {
          setSurls([]);
          toast.error("Internal Server Error", {
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
  }, []);

  const shortUrldiect = () => {
    History.push("/shorten-url");
  };

  const logoff = (event) => {
    event.preventDefault();
    window.localStorage.removeItem("name");
    window.localStorage.removeItem("token");
    setIsLoggedIn(false);
  };
  return (
    <div>
      <div style={{ display: "block", textAlign: "right" }}>
        <Button color="link" onClick={shortUrldiect}>
          {" "}
          <u>Short Your Url</u>{" "}
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
      <br />
      <Table className="table table-striped table-responsive">
        <thead>
          <tr>
            <th>Full URL</th>
            <th>Short URL</th>
            <th>Clicks</th>
          </tr>
        </thead>
        <tbody>
          {surls.map((each, eachIndex) => {
            return (
              <tr key={eachIndex}>
                <td>
                  <a
                    href={each.fullUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {each.fullUrl.substr(0, 30)}....
                  </a>
                </td>
                <td>
                  <a
                    href={each.shortUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {each.shortUrl}
                  </a>
                </td>
                <td>{each.clicks}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default DashBoard;
