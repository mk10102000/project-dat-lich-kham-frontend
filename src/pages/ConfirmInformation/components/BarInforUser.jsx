import React from 'react';
import { BiUserCircle } from 'react-icons/bi';
import { AiOutlinePhone } from 'react-icons/ai';
import { FaMapMarkerAlt } from 'react-icons/fa';
import styles from '../../BookService/components/BookService.module.css';

function BarInforUser(props) {
  return (
    <ul className={styles.listBar}>
      <li className={styles.item}>
        <BiUserCircle />
        <p>Nguyen Khanh Minh</p>
      </li>
      <li className={styles.item}>
        <AiOutlinePhone />
        <p>0948994054</p>
      </li>
      <li className={styles.item}>
        <FaMapMarkerAlt />
        <p>23 Dinh Tien Hoang - Hai Chau - Da Nang</p>
      </li>
    </ul>
  );
}

export default BarInforUser;
