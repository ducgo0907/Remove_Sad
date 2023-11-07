import React from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';

const FailPage = () => {
  return (
    <Container>
      <Row>
        <Col>
          <Alert variant="danger">
            <h4>Order Failed</h4>
            Your order could not be processed.
          </Alert>
        </Col>
      </Row>
    </Container>
  );
};

export default FailPage;
