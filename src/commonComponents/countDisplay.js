import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { countperday, countpermonth } from "../helpers/counter";

const Counter = () => {
  const [recordcount, setRecordcount] = useState(100);

  useEffect(() => {
    fetch("https://url-shortn-service.herokuapp.com/api/shortenurl/count", {
      headers: {
        "Content-Type": "application/json"
      },
      method: "GET",
      mode: "cors"
    })
      .then((response) => response.json())
      .then((data) => {
        setRecordcount(data.count);
      })
      .catch(() => {});
  });

  return (
    <div className="registerDiv">
      <h2>Storted Urls Stats</h2>
      <Container>
        <Row>
          <Col>
            <h3>
              {countperday(recordcount)}
              {`/Day`}
            </h3>
          </Col>
          <Col>
            <h3>
              {countpermonth(recordcount)}
              {`/Month`}
            </h3>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Counter;
