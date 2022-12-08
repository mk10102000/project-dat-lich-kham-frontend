import React, { useMemo, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import styles from '../ChooseDayExamination.module.css';
const timeMorning = [
  {
    key: 100,
    time: '07:00 - 08:00',
  },
  {
    key: 101,
    time: '08:00 - 09:00',
  },
  {
    key: 102,
    time: '09:00 - 10:00',
  },
  {
    key: 103,
    time: '10:00 - 11:00',
  },
];
const timeAfternoon = [
  {
    key: 104,
    time: '13:00 - 14:00',
  },
  {
    key: 105,
    time: '14:00 - 15:00',
  },
  {
    key: 106,
    time: '15:00 - 16:00',
  },
];
function ChooseTime({
  onClickTime,
  time,
  date,
  buoiSang,
  buoiChieu,
  onSubmit,
}) {
  const buoiSangMemo = useMemo(() => buoiSang, [buoiSang]);
  const buoiChieuMemo = useMemo(() => buoiChieu, [buoiChieu]);
  const navigate = useNavigate();
  const handleClickTime = (item) => {
    onClickTime(item);
  };

  const handleSubmit = () => {
    onSubmit();
  };

  return (
    <div>
      <div>
        <h2 className={styles.title}>Buổi sáng</h2>
        <Container>
          <Row>
            {buoiSangMemo?.map((item) => (
              <Col xs={3} key={item.maTG}>
                <div
                  className={`${styles.timeItem} ${
                    item.maTG === time.maTG && styles.timeActive
                  }`}
                  onClick={() => handleClickTime(item)}
                >
                  <span>
                    {item.thoiGianBatDau} - {item.thoiGianKetThuc}
                  </span>
                </div>

                <span className={styles.emptySlot}>Còn trống 4 suất</span>
              </Col>
            ))}
            <h2 className={styles.title}>Buổi Chiều</h2>

            {buoiChieuMemo?.map((item) => (
              <Col xs={3} key={item.maTG}>
                <div
                  className={`${styles.timeItem} ${
                    item.maTG === time.maTG && styles.timeActive
                  }`}
                  onClick={() => handleClickTime(item)}
                >
                  <span>
                    {item.thoiGianBatDau} - {item.thoiGianKetThuc}
                  </span>
                </div>
                <span className={styles.emptySlot}>Còn trống 4 suất</span>
              </Col>
            ))}
          </Row>
        </Container>
        <div className="d-flex justify-content-between">
          <p className={styles.warning}>
            Tất cả thời gian theo múi giờ Việt Nam GMT +7
          </p>
          {time && date && (
            <button className={styles.buttonContuine} onClick={handleSubmit}>
              Tiếp tục
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChooseTime;
