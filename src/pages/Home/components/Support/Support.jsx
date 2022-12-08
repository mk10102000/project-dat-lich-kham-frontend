import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import styles from './Support.module.css';

function SupportCard(props) {
  return (
    <div className={styles.box}>
      <div className={styles.boxCard}>
        <img
          src="https://medpro.vn/static/media/support.08dda31d.svg"
          alt=""
          className={styles.image}
        />
        <p className={styles.title}>Hỗ trợ đặt khám</p>
        <a href="tel:19002115" className={styles.detail}>
          1900-2115
        </a>
      </div>
    </div>
  );
}
function Support(props) {
  return (
    <div style={{ marginBottom: '7rem' }}>
      <h2 className={styles.headTitle}>TIN TỨC & SỰ KIỆN</h2>

      <Container>
        <Row>
          <Col xs={3} className="px-md-4">
            <SupportCard />
          </Col>
          <Col xs={3} className="px-md-4">
            <SupportCard />
          </Col>
          <Col xs={3} className="px-md-4">
            <SupportCard />
          </Col>
          <Col xs={3} className="px-md-4">
            <SupportCard />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Support;
