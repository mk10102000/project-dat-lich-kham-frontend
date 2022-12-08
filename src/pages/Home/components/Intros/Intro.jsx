import React from 'react';
import styles from './Intro.module.css';
import { Col, Container, Row } from 'react-bootstrap';
import IntroCard from './IntroCard';
import { images } from '../../../../constants/constants';
function Intro(props) {
  return (
    <div style={{ marginBottom: '15rem' }}>
      <div className={styles.box}>
        <Container>
          <Row>
            <Col xs={4}>
              <div className={styles.boxLeft}>
                <p>GIỚI THIỆU</p>
                <h2>MEDPRO</h2>
                <p>Đặt lịch khám bệnh</p>
              </div>
            </Col>

            <Col xs={8}>
              <div className={styles.boxRight}>
                <strong>MEDPRO </strong>
                là giải pháp đặt lịch khám bệnh, chăm sóc sức khỏe trực tuyến
                cho cả gia đình. Người dùng chủ động trong việc khám chữa bệnh,
                được lựa chọn dịch vụ, chuyên khoa, bác sĩ tại phòng khám Đa
                khoa Hải Châu - Đà Nẵng
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <Container>
        <Row>
          <Col>
            <IntroCard
              image={images.NEW1}
              description="Bệnh nhân chủ động chọn thông tin đặt khám (ngày khám và giờ khám)"
            />
          </Col>
          <Col>
            <IntroCard
              image={images.NEW2}
              description="Người dùng chọn và thực hiện thanh toán trên phần mềm"
            />
          </Col>
          <Col>
            <IntroCard
              image={images.NEW3}
              description="Bệnh nhân sẽ nhận phiếu khám trực tuyến ngay trên phần mềm"
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Intro;