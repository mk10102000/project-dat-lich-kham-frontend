import React from 'react';
import { CiHospital1 } from 'react-icons/ci';
import { GiHospitalCross } from 'react-icons/gi';
import styles from './BookService.module.css';

function BarBook(props) {
  return (
    <ul className={styles.listBar}>
      <li className={styles.item}>
        <CiHospital1 />
        <p>Phòng khám Đà Nẵng</p>
      </li>
      <li className={styles.item}>
        <GiHospitalCross />
        <p>Dịch vụ: Khám Thường</p>
      </li>
    </ul>
  );
}

export default BarBook;
