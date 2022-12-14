import { yupResolver } from '@hookform/resolvers/yup';
import { parse } from 'date-fns';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import {
  Col,
  Container,
  Form,
  Row,
  Card,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import * as yup from 'yup';
import { datLichApi } from '../../../api/datLich';
import { userApi } from '../../../api/userApi';
import { updateProfileUser } from '../../../app/slices/authSlice';
import { Chip } from '../../../components/Chip/Chip';
import InputControl from '../../../form-control/InputControl';
import SelectControl from '../../../form-control/SelectControl';
import { formatDate, phoneRegExp, toastify } from '../../../utils/common';
import styles from '../ProfileUser.module.css';

export function CardTicker({ item, isCheck, onClick }) {
  const {
    ngaySinh,
    gioiTinh,
    tinhTrangDangKy,
    hoTen,
    SDT,
    maND,
    maThoiGian,
    thoiGianDky,
    thoiGianBatDau,
  } = item;

  return (
    <Card text={'dark'} style={{ width: '100%' }} className="mb-4">
      <div style={{ borderBottom: '1px solid rgb(215 204 204)' }}>
        <Card.Header
          style={{
            fontSize: '16px',
            fontWeight: '600',
            marginBottom: '5px',
          }}
        >
          Thông tin lịch khám
        </Card.Header>
      </div>
      <Card.Body>
        <div>
          <Card.Text style={{ marginBottom: '10px', fontSize: '14px' }}>
            <span style={{ fontWeight: 600, paddingRight: '8px' }}>
              Họ tên:
            </span>
            <span style={{ color: 'var(--color-primary)', fontWeight: '600' }}>
              {hoTen}
            </span>
          </Card.Text>
          <Card.Text style={{ marginBottom: '10px', fontSize: '14px' }}>
            <span style={{ fontWeight: 600, paddingRight: '8px' }}>
              Giới tính:
            </span>
            <span style={{ color: 'var(--color-primary)', fontWeight: '600' }}>
              {gioiTinh}
            </span>
          </Card.Text>
          <Card.Text style={{ marginBottom: '10px', fontSize: '14px' }}>
            <span style={{ fontWeight: 600, paddingRight: '8px' }}>
              Ngày sinh:
            </span>
            <span style={{ color: 'var(--color-primary)', fontWeight: '600' }}>
              {moment(ngaySinh).format('YYYY-MM-DD')}
            </span>
          </Card.Text>
          <Card.Text style={{ marginBottom: '10px', fontSize: '14px' }}>
            <span style={{ fontWeight: 600, paddingRight: '8px' }}>
              Số điện thoại:
            </span>
            <span style={{ color: 'var(--color-primary)', fontWeight: '600' }}>
              {SDT}
            </span>
          </Card.Text>
          <Card.Text style={{ marginBottom: '10px', fontSize: '14px' }}>
            <span style={{ fontWeight: 600, paddingRight: '8px' }}>
              Ngày đặt khám:
            </span>
            <span style={{ color: 'var(--color-primary)', fontWeight: '600' }}>
              {formatDate(thoiGianDky)}
            </span>
          </Card.Text>
          <Card.Text style={{ marginBottom: '10px', fontSize: '14px' }}>
            <span style={{ fontWeight: 600, paddingRight: '8px' }}>
              Thời gian khám:
            </span>
            <span style={{ color: 'var(--color-primary)', fontWeight: '600' }}>
              {thoiGianBatDau}
            </span>
          </Card.Text>
          <Card.Text style={{ marginBottom: '10px', fontSize: '14px' }}>
            <span style={{ fontWeight: 600, paddingRight: '8px' }}>
              Tình trạng:
            </span>
            {tinhTrangDangKy === 'Success' ? (
              <Chip status={'Đã xác nhận'} variant={'#03a9f4'} />
            ) : (
              <Chip status={'Đang chờ'} variant={'#ffc107'} />
            )}
          </Card.Text>
        </div>

        {isCheck && (
          <>
            <div className="d-flex justify-content-between mt-4">
              {tinhTrangDangKy === 'Pending' && (
                <button
                  className="btn-button btn-button-primary p-p-5 mx-1"
                  onClick={() => onClick(maND, maThoiGian, thoiGianDky)}
                >
                  Xác nhận
                </button>
              )}
              <button
                className="btn-button"
                style={{ backgroundColor: '#ff1744', color: '#fff', flex: 1 }}
              >
                Từ chối
              </button>
            </div>
          </>
        )}
      </Card.Body>
    </Card>
  );
}

export function ProfileInforUser() {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialValues = {
    hoTen: '',
    SDT: '',
    email: '',
    gioiTinh: '',
    ngheNghiep: '',
    ngaySinh: '',
  };
  const schema = yup.object().shape({
    hoTen: yup.string().required('Họ tên không được bỏ trống'),
    SDT: yup
      .string()
      .required('SDT không được bỏ trống.')
      .matches(phoneRegExp, 'SDT không đúng định dạng')
      .max(10, 'Số điện thoại không hợp lệ'),
    email: yup
      .string()
      .email('Email không hợp lệ')
      .required('Email không được bỏ trống.'),
    gioiTinh: yup.string().required('Giới tính không được bỏ trông'),
    ngheNghiep: yup.string().required('Nghề nghiệp không được bỏ trống'),
    ngaySinh: yup
      .date()
      .transform(function (value, originalValue) {
        if (this.isType(value)) {
          return value;
        }
        const result = parse(originalValue, 'dd.MM.yyyy', new Date());
        return result;
      })
      .typeError('Vui lòng chọn ngày sinh')
      .required()
      .min('1969-11-13', 'Date is too early'),
  });
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    reset(currentUser);
  }, []);

  const handleOnSubmit = (data) => {
    dispatch(
      updateProfileUser({
        maND: currentUser.maND,
        formData: {
          ...data,
          ngaySinh: moment(data.ngaySinh).format('YYYY-MM-DD'),
        },
      })
    )
      .unwrap()
      .then((res) => {
        toastify('success', res.message);
      });
  };

  return (
    <div>
      <h5 className="text-center mb-5 fw-bold">NHẬP THÔNG TIN BỆNH NHÂN</h5>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <Container>
          <Row>
            <Col xs={6} className="mb-5 mx-0">
              <label
                htmlFor="hoTen"
                className="form-label fw-bold"
                style={{ fontSize: '1.6rem' }}
              >
                Họ và tên<span className="text-danger">*</span>
              </label>
              <InputControl
                name="hoTen"
                control={control}
                type="text"
                placeholder="Nhập họ tên"
              />
            </Col>
            <Col xs={6} className="mb-5 mx-0">
              <label
                htmlFor="ngaySinh"
                className="form-label fw-bold"
                style={{ fontSize: '1.6rem' }}
              >
                Ngày tháng năm sinh<span className="text-danger">*</span>
              </label>
              <InputControl
                name="ngaySinh"
                control={control}
                placeholder="Chọn ngày sinh"
                type="date"
              />
            </Col>
            <Col xs={6} className="mb-5 mx-0">
              <label
                htmlFor="SDT"
                className="form-label fw-bold"
                style={{ fontSize: '1.6rem' }}
              >
                Số điện thoại<span className="text-danger">*</span>
              </label>
              <InputControl
                name="SDT"
                control={control}
                type="text"
                placeholder="Nhập số điện thoại"
              />
            </Col>
            <Col xs={6} className="mb-5 mx-0">
              <label
                htmlFor="SDT"
                className="form-label fw-bold"
                style={{ fontSize: '1.6rem' }}
              >
                Giới tính<span className="text-danger">*</span>
              </label>
              <SelectControl
                name="gioiTinh"
                control={control}
                values={[
                  {
                    value: 'Nam',
                    label: 'Nam',
                  },
                  {
                    value: 'Nữ',
                    label: 'Nữ',
                  },
                ]}
                placeholder="Chọn giới tính"
              />
            </Col>
            <Col xs={6} className="mb-5 mx-0">
              <label
                htmlFor="ngheNghiep"
                className="form-label fw-bold"
                style={{ fontSize: '1.6rem' }}
              >
                Nghề nghiệp<span className="text-danger">*</span>
              </label>
              <InputControl
                name="ngheNghiep"
                control={control}
                placeholder="Nhập nghề nghiệp"
                type="text"
              />
            </Col>
            <Col xs={6} className="mb-5 mx-0">
              <label
                htmlFor="email"
                className="form-label fw-bold"
                style={{ fontSize: '1.6rem' }}
              >
                Địa chỉ email<span className="text-danger">*</span>
              </label>
              <InputControl
                name="email"
                control={control}
                placeholder="Nhập địa chỉ email"
                type="text"
              />
            </Col>
          </Row>
        </Container>
        <button className="btn-button btn-button-primary mx-3" type="submit">
          Lưu
        </button>
        <button
          className="btn-button"
          type="button"
          onClick={() => navigate(-1)}
        >
          Hủy
        </button>
      </form>
    </div>
  );
}

export function ProfileInforDoctor() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.currentUser);
  const [isEdit, setIsEdit] = useState(false);
  const initialValues = {};
  const schema = yup.object().shape({
    chuyenNganh: yup.string().required('Chuyên ngành không được bỏ trống'),
    truongTotNghiep: yup
      .string()
      .required('Trường tốt nghiệp không được bỏ trống'),
    kinhNghiem: yup.string().required('Kinh nghiệm không được bỏ trống'),
    lyLichCongTac: yup.string().required('Kinh nghiệm không được bỏ trống'),
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const fetchData = async () => {
    const res = await userApi.getProfileDoctor(user.maND);
    if (res.data[0]) {
      setIsEdit(true);
      reset(res.data[0]);
    }
  };
  useEffect(() => {
    fetchData();
  }, [user]);

  const handleOnSubmit = async (values) => {
    if (isEdit) {
      const res = await userApi.editProfileDoctor(user.maND, values);
      toastify('success', res.message);
    } else {
      const res = await userApi.addProfileDoctor(user.maND, values);
      toastify('success', res.message);
    }
  };
  return (
    <div>
      <h5 className="text-center mb-5 fw-bold">Cập nhật thông tin bác sĩ</h5>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <Container>
          <Row>
            <Col xs={6} className="mb-5 mx-0">
              <label
                htmlFor="chuyenNganh"
                className="form-label fw-bold"
                style={{ fontSize: '1.6rem' }}
              >
                Chuyên ngành<span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className={`${styles.form} ${`form-control p-4 h4 m-0`} ${
                  errors.chuyenNganh && styles.inputError
                }`}
                id="hoTen"
                {...register('chuyenNganh')}
                placeholder="Ví dụ Chuyên ngành Răng hàm mặt"
              />
              {errors.chuyenNganh && (
                <Form.Text
                  className="text-danger"
                  style={{
                    fontSize: '1.6rem',
                    paddingTop: '0.5rem',
                    display: 'block',
                  }}
                >
                  {errors.chuyenNganh.message}
                </Form.Text>
              )}
            </Col>
            <Col xs={6} className="mb-5 mx-0">
              <label
                htmlFor="truongTotNghiep"
                className="form-label fw-bold"
                style={{ fontSize: '1.6rem' }}
              >
                Trường tốt nghiệp<span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className={`${styles.form} ${`form-control p-4 h4 m-0`} ${
                  errors.truongTotNghiep && styles.inputError
                }`}
                id="truongTotNghiep"
                {...register('truongTotNghiep')}
                placeholder="Trường tốt nghiệp"
              />
              {errors.truongTotNghiep && (
                <Form.Text
                  className="text-danger"
                  style={{
                    fontSize: '1.6rem',
                    paddingTop: '0.5rem',
                    display: 'block',
                  }}
                >
                  {errors.truongTotNghiep.message}
                </Form.Text>
              )}
            </Col>
            <Col xs={6} className="mb-5 mx-0">
              <label
                htmlFor="kinhNghiem"
                className="form-label fw-bold"
                style={{ fontSize: '1.6rem' }}
              >
                Số năm kinh nghiệm<span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className={`${styles.form} ${`form-control p-4 h4 m-0`} ${
                  errors.kinhNghiem && styles.inputError
                }`}
                id="SDT"
                {...register('kinhNghiem')}
                placeholder="Nhập năm kinh nghiệm"
              />
              {errors.kinhNghiem && (
                <Form.Text
                  className="text-danger"
                  style={{
                    fontSize: '1.6rem',
                    paddingTop: '0.5rem',
                    display: 'block',
                  }}
                >
                  {errors.kinhNghiem.message}
                </Form.Text>
              )}
            </Col>
            <Col xs={6} className="mb-5 mx-0">
              <label
                htmlFor="lyLichCongTac"
                className="form-label fw-bold"
                style={{ fontSize: '1.6rem' }}
              >
                Lý lịch công tác<span className="text-danger">*</span>
              </label>
              <textarea
                rows="3"
                cols="38"
                type="text"
                style={{ fontSize: '1.6rem' }}
                className={`${`p-4 h4 m-0`} ${
                  errors.lyLichCongTac && styles.inputError
                }`}
                id="lyLichCongTac"
                {...register('lyLichCongTac')}
                placeholder="Nhập lý lịch công tác"
              />
              {errors.lyLichCongTac && (
                <Form.Text
                  className="text-danger"
                  style={{
                    fontSize: '1.6rem',
                    paddingTop: '0.5rem',
                    display: 'block',
                  }}
                >
                  {errors.lyLichCongTac.message}
                </Form.Text>
              )}
            </Col>
          </Row>
        </Container>
        {isEdit ? (
          <button className="btn-button btn-button-primary mx-3" type="submit">
            Chỉnh sửa
          </button>
        ) : (
          <>
            <button
              className="btn-button btn-button-primary mx-3"
              type="submit"
            >
              Lưu
            </button>
          </>
        )}
        <button
          className="btn-button"
          type="button"
          onClick={() => navigate(-1)}
        >
          Hủy
        </button>
      </form>
    </div>
  );
}

export function ProfileHistory() {
  return (
    <div>
      <h5 className="text-center mb-5 fw-bold">Lịch sử khám bệnh</h5>
      <h6 className="text-danger text-center mb-2">
        Hiện chưa có thông tin lịch sử khám
      </h6>
      <div>
        <img
          width="100%"
          src="https://medpro.vn/static/media/phieukham_notfound.e2166690.svg"
          alt=""
        />
      </div>
    </div>
  );
}

export function ProfileInforTicker() {
  const navigate = useNavigate();
  const { maND } = useSelector((state) => state.auth.currentUser);
  const [listTicker, setListTicker] = useState([]);
  const fetchData = async () => {
    try {
      const res = await datLichApi.getDatLichUser(maND);
      setListTicker(res);
    } catch (error) {}
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <h5 className="text-center mb-5 fw-bold">Phiếu đăng ký khám bệnh</h5>
      <h6 className="text-danger text-center mb-2">
        {listTicker.total < 0 && 'Hiện chưa có thông tin phiếu khám bệnh'}
      </h6>
      <div>
        {listTicker.total > 0 ? (
          <Container>
            <Row>
              {listTicker.data.map((item) => (
                <Col xs={4}>
                  <CardTicker
                    item={item}
                    key={`${item.thoiGianDky}${item.thoiGianBatDau} `}
                  />
                </Col>
              ))}
            </Row>
          </Container>
        ) : (
          <>
            <div style={{ display: 'flex' }}>
              <button
                className="btn-button btn-button-primary"
                style={{ margin: '2rem auto' }}
                onClick={() => navigate('/dich-vu')}
              >
                Đăng ký khám ngay
              </button>
            </div>
            <div>
              <img
                width="100%"
                src="https://medpro.vn/static/media/phieukham_notfound.e2166690.svg"
                alt=""
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
