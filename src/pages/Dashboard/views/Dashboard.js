import React from 'react';
// react-bootstrap components
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  OverlayTrigger,
  Row,
  Table,
  Tooltip,
} from 'react-bootstrap';
import ChartistGraph from 'react-chartist';

function Dashboard() {
  return (
    <div style={{ marginTop: '9rem' }}>
      <Container fluid>
        <Row>
          <Col lg="3" sm="6">
            <div
              style={{
                border: '1px solid #c1c1c1',
                borderRadius: '1rem',
                padding: '2rem',
                minHeight: '145px',
              }}
            >
              <Row>
                <h6
                  className="text-center my-2"
                  style={{
                    lineHeight: '2rem',
                    height: '42px',
                  }}
                >
                  Tổng số người dùng ứng dụng hệ thống
                </h6>
                <h2
                  className="text-center"
                  style={{ color: 'var(--color-primary)' }}
                >
                  200
                </h2>
              </Row>
            </div>
          </Col>
          <Col lg="3" sm="6">
            <div
              style={{
                border: '1px solid #c1c1c1',
                borderRadius: '1rem',
                padding: '2rem',
                minHeight: '145px',
              }}
            >
              <Row>
                <h6
                  className="text-center my-2"
                  style={{
                    lineHeight: '2rem',
                    height: '42px',
                  }}
                >
                  Tổng số lượt đăng ký khám
                </h6>
                <h2
                  className="text-center"
                  style={{ color: 'var(--color-primary)' }}
                >
                  15
                </h2>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Dashboard;
