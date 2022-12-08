import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeadTitle from '../../../components/HeadTitle/HeadTitle';
import Table from 'react-bootstrap/Table';
import styles from '../Confirmation.module.css';
import { AiOutlineArrowRight, AiOutlineDelete } from 'react-icons/ai';
import { toastify } from '../../../utils/common';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { deleteService } from '../../../app/slices/bookServiceSlice';

export default function ConfirmationList() {
  const navigate = useNavigate();
  const handleOnConfirm = () => {
    // call api confirm here
    toastify('success', 'Đăng ký lịch khám thành công');
  };
  return (
    <div>
      <HeadTitle title="Xác nhận thông tin khám" />
      <div className={styles.boxTable}>
        <ConfirmaItem />
      </div>
      <div className="d-flex justify-content-between mb-4 mt-4">
        <button className="btn-button" onClick={() => navigate(-1)}>
          Quay lại
        </button>
        <button
          className="btn-button btn-button-primary"
          onClick={handleOnConfirm}
        >
          Xác nhận <AiOutlineArrowRight />
        </button>
      </div>
    </div>
  );
}

function ConfirmaItem() {
  const { services } = useSelector((state) => state.service.data);
  const dispatch = useDispatch();

  const handleOnDelete = (id) => {
    dispatch(deleteService(id));
  };
  return (
    <Table bordered>
      <thead>
        <tr className={styles.title}>
          <th>#</th>
          <th>Dịch vụ</th>
          <th>Giờ khám</th>
          <th>Tiền khám</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        {services.map((item, index) => (
          <tr>
            <td>{index + 1}</td>
            <td>Khám thường</td>
            <td>
              {moment(item.dateDate).format('MM/DD/YYYY')}{' '}
              {item.time.thoiGianBatDau}
            </td>
            <td>Thanh toán tại phòng khám</td>
            <td
              className={styles.deleteIcon}
              onClick={() => handleOnDelete(item.id)}
            >
              <AiOutlineDelete />
              Xóa
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
