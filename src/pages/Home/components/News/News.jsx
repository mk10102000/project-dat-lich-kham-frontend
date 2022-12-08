import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './News.module.css';

function NewsCard() {
  return (
    <div>
      <img
        src="https://cms.medpro.com.vn/uploads/topic_7113536861cc4e1d8a2f867ab66986a2_5d07aa693b.jpg"
        alt=""
        className={styles.imageCard}
      />
      <h2 className={styles.title}>Thận trọng bệnh sưng đau họng!</h2>
      <div className={styles.boxDate}>
        <span className={styles.date}>20/04/2022, 05:39</span>
      </div>
    </div>
  );
}
function News(props) {
  return (
    <div style={{ marginBottom: '13rem' }}>
      <h2 className={styles.headTitle}>TIN TỨC & SỰ KIỆN</h2>
      <Container>
        <Row>
          <Col xs={5}>
            <div>
              <img
                src="https://cms.medpro.com.vn/uploads/topic_7113536861cc4e1d8a2f867ab66986a2_5d07aa693b.jpg"
                alt=""
                className={styles.image}
              />
              <h2 className={styles.title}>
                MEDPRO CHÍNH THỨC LÀ THÀNH VIÊN BAN CHẤP HÀNH CỦA HỘI TIN HỌC Y
                TẾ VIỆT NAM
              </h2>
              <div className={styles.boxDate}>
                <span className={styles.date}>20/04/2022, 05:39</span>
              </div>
              <Link to="/">
                <p className={styles.description}>
                  Hội Tin học Y Tế Việt Nam trực thuộc Bộ Y tế Việt Nam được
                  thành lập với mục đích góp phần xây dựng hệ thống y tế Việt
                  Nam hiện đại, chất lượng, công bằng, hiệu quả và hội nhập quốc
                  tế, ngoài ra còn hỗ trợ người dân dễ dàng tiếp cận thông tin y
                  tế để sử dụng các dịch vụ y tế có hiệu quả cao và được bảo vệ,
                  chăm sóc, nâng cao sức khỏe liên tục.
                </p>
              </Link>
            </div>
          </Col>

          <Col xs={7}>
            <Row>
              <Col xs={6} className="px-md-4 py-md-4">
                <NewsCard />
              </Col>
              <Col xs={6} className="px-md-4 py-md-4">
                <NewsCard />
              </Col>
              <Col xs={6} className="px-md-4">
                <NewsCard />
              </Col>
              <Col xs={6} className="px-md-4">
                <NewsCard />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>

      <div className={styles.boxButton}>
        <button className={styles.buttonSee}>Xem thêm</button>
      </div>
    </div>
  );
}

export default News;
