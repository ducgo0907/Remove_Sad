import React from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';

const SuccessPage = () => {
  return (
    <Container>
      <Row>
        <Col>
          <Alert variant="success">
            <h4>Order Successful</h4>
            Your order has been processed successfully.
          </Alert>
        </Col>
      </Row>
    </Container>
  );
};

export default SuccessPage;
