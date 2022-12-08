import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { TextField } from '../../../components/Input/TextField';
import Select from 'react-select';
import { phoneRegExp, toastify } from '../../../utils/common';
import styles from '../ProfileUser.module.css';
import { parse } from 'date-fns';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { optionsGender } from '../../../constants/constants';
import { userApi } from '../../../api/userApi';

export function ProfileInforUser() {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const navigate = useNavigate();
  const initialValues = {};
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
    sex: yup.string().required('Giới tính không được bỏ trông'),
    ngheNghiep: yup.string().required('Nghề nghiệp không được bỏ trống'),
    birthDate: yup
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
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    reset(currentUser);
  }, []);

  return (
    <div>
      <h5 className="text-center mb-5 fw-bold">NHẬP THÔNG TIN NGƯỜI DÙNG</h5>
      <form onSubmit={handleSubmit((values) => console.log(values))}>
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
              <input
                type="text"
                className={`${styles.form} ${`form-control p-4 h4 m-0`} ${
                  errors.hoTen && styles.inputError
                }`}
                id="hoTen"
                {...register('hoTen')}
                placeholder="Ví dụ Phạm Minh Khánh"
              />
              {errors.hoTen && (
                <Form.Text
                  className="text-danger"
                  style={{
                    fontSize: '1.6rem',
                    paddingTop: '0.5rem',
                    display: 'block',
                  }}
                >
                  {errors.hoTen.message}
                </Form.Text>
              )}
            </Col>
            <Col xs={6} className="mb-5 mx-0">
              <label
                htmlFor="birthDate"
                className="form-label fw-bold"
                style={{ fontSize: '1.6rem' }}
              >
                Ngày tháng năm sinh<span className="text-danger">*</span>
              </label>
              <input
                type="date"
                className={`${styles.form} ${`form-control p-4 h4 m-0`} ${
                  errors.birthDate && styles.inputError
                }`}
                id="birthDate"
                {...register('birthDate')}
              />
              {errors.birthDate && (
                <Form.Text
                  className="text-danger"
                  style={{
                    fontSize: '1.6rem',
                    paddingTop: '0.5rem',
                    display: 'block',
                  }}
                >
                  {errors.birthDate.message}
                </Form.Text>
              )}
            </Col>
            <Col xs={6} className="mb-5 mx-0">
              <label
                htmlFor="SDT"
                className="form-label fw-bold"
                style={{ fontSize: '1.6rem' }}
              >
                Số điện thoại<span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className={`${styles.form} ${`form-control p-4 h4 m-0`} ${
                  errors.SDT && styles.inputError
                }`}
                id="SDT"
                {...register('SDT')}
                placeholder="Nhập số điện thoại"
              />
              {errors.SDT && (
                <Form.Text
                  className="text-danger"
                  style={{
                    fontSize: '1.6rem',
                    paddingTop: '0.5rem',
                    display: 'block',
                  }}
                >
                  {errors.SDT.message}
                </Form.Text>
              )}
            </Col>
            <Col xs={6} className="mb-5 mx-0">
              <label
                htmlFor="SDT"
                className="form-label fw-bold"
                style={{ fontSize: '1.6rem' }}
              >
                Chọn giới tính<span className="text-danger">*</span>
              </label>
              <Select options={optionsGender} />
              {errors.sex && (
                <Form.Text
                  className="text-danger"
                  style={{
                    fontSize: '1.6rem',
                    paddingTop: '0.5rem',
                    display: 'block',
                  }}
                >
                  {errors.sex.message}
                </Form.Text>
              )}
            </Col>
            <Col xs={6} className="mb-5 mx-0">
              <label
                htmlFor="SDT"
                className="form-label fw-bold"
                style={{ fontSize: '1.6rem' }}
              >
                Nghề nghiệp<span className="text-danger">*</span>
              </label>
              <input
                type="SDT"
                className={`${styles.form} ${`form-control p-4 h4 m-0`} ${
                  errors.ngheNghiep && styles.inputError
                }`}
                id="ngheNghiep"
                {...register('ngheNghiep')}
                placeholder="Nhập nghề nghiệp"
              />
              {errors.ngheNghiep && (
                <Form.Text
                  className="text-danger"
                  style={{
                    fontSize: '1.6rem',
                    paddingTop: '0.5rem',
                    display: 'block',
                  }}
                >
                  {errors.ngheNghiep.message}
                </Form.Text>
              )}
            </Col>
            <Col xs={6} className="mb-5 mx-0">
              <label
                htmlFor="SDT"
                className="form-label fw-bold"
                style={{ fontSize: '1.6rem' }}
              >
                Địa chỉ email<span className="text-danger">*</span>
              </label>
              <input
                type="SDT"
                className={`${styles.form} ${`form-control p-4 h4 m-0`} ${
                  errors.email && styles.inputError
                }`}
                id="email"
                {...register('email')}
                placeholder="Nhập nghề nghiệp"
              />
              {errors.email && (
                <Form.Text
                  className="text-danger"
                  style={{
                    fontSize: '1.6rem',
                    paddingTop: '0.5rem',
                    display: 'block',
                  }}
                >
                  {errors.email.message}
                </Form.Text>
              )}
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
      <h4 className="text-center mb-5 fw-bold">Lịch sử khám bệnh</h4>
      <h6 className="text-danger text-center mb-5">
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
