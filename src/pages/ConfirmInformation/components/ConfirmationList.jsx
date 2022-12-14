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
import { datLichApi } from '../../../api/datLich';

export default function ConfirmationList() {
  const navigate = useNavigate();
  const { services } = useSelector((state) => state.service);
  const { maND } = useSelector((state) => state.auth.currentUser);
  console.log(services);
  const handleOnConfirm = async () => {
    // call api confirm
    try {
      const res = await datLichApi.dangKyDatLich({
        maND: maND,
        maThoiGian: services.time.maTG,
        tinhTrang: 'Pending',
        thoiGianDangKy: moment(services.dateData).format('YYYY-MM-DD'),
      });
      toastify('success', res.message);
    } catch (error) {}
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
  const { services } = useSelector((state) => state.service);
  const dispatch = useDispatch();

  const handleOnDelete = () => {
    dispatch(deleteService());
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
        <tr>
          <td>{1}</td>
          <td>Khám thường</td>
          <td>
            {services.date} {services.time.thoiGianBatDau}
          </td>
          <td>Thanh toán tại phòng khám</td>
          <td className={styles.deleteIcon} onClick={() => handleOnDelete()}>
            <AiOutlineDelete />
            Xóa
          </td>
        </tr>
      </tbody>
    </Table>
  );
}
