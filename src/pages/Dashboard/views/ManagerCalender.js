import { getTime } from 'date-fns';
import React, { useEffect, useMemo, useState } from 'react';
// react-bootstrap components
import { Col, Container, Row } from 'react-bootstrap';
import { Calendar } from 'react-calendar';
import { useForm } from 'react-hook-form';
import { datLichApi } from '../../../api/datLich';
import { lichLamViecApi } from '../../../api/lichLamViecApi';
import { Loading } from '../../../components/Loading';
import SelectControl from '../../../form-control/SelectControl';
import { formatDate, toastify } from '../../../utils/common';
import { CardTicker } from '../../ProfileUser/components/ProfileContent';

function getPreviousDay(date = new Date()) {
  const previous = new Date(date.getTime());
  previous.setDate(date.getDate() - 1);

  return previous;
}

function ManagerCalendar() {
  const [dateData, setDateData] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [listRegister, setListRegister] = useState([]);
  const [lich, setLich] = useState([]);
  const [isLoadingCard, setIsLoadingCard] = useState(true);

  const { control } = useForm();

  const [value, onChange] = useState(new Date());
  const tileDisabled = ({ activeStartDate, date, view }) => {
    return date < getPreviousDay(new Date()) || !date.getDay('Sunday');
  };
  const handleOnClickDay = (value) => {
    setDateData(value);
  };

  const fetchData = async (date) => {
    try {
      const res = await datLichApi.getAllDatLich({
        ngayDatLich: formatDate(date),
      });
      setListRegister(res);
      setLoading(false);
    } catch (error) {}
  };

  const fetchGetTime = async () => {
    try {
      const res = await lichLamViecApi.getThoiGianLamViec();
      setLich(res.data);
    } catch (error) {}
  };
  useEffect(() => {
    fetchData(dateData);
  }, [dateData]);

  useEffect(() => {
    fetchGetTime();
  }, []);

  const handleOnConfirm = (maND, maThoiGian, thoiGianDky) => {
    try {
      console.log(maND);
      const res = datLichApi.comfirmDangKy(
        { maND, maThoiGian, thoiGianDky: formatDate(thoiGianDky) },
        { tinhTrangDangKy: 'Success' }
      );
      setIsLoadingCard(true);

      setTimeout(() => {
        fetchData(dateData);
      }, 500);
      toastify('success', res.message);
    } catch (error) {}
  };

  const optionTime = useMemo(() => {
    return lich.map((item) => {
      return {
        value: item.maTG,
        label: `${item.thoiGianBatDau} - ${item.thoiGianKetThuc}`,
      };
    });
  }, [lich]);

  if (loading) return <Loading />;
  return (
    <>
      <Container style={{ marginTop: '75px' }}>
        <Row>
          <Col xs={5}>
            <div className="mb-4" style={{ position: 'fixed', width: '440px' }}>
              <Calendar
                onChange={onChange}
                value={value}
                tileDisabled={tileDisabled}
                // tileDisabled={({ date }) => !date.getDay('Sunday')}
                onClickDay={handleOnClickDay}
                locale="vi"
              />
            </div>
          </Col>
          <Col xs={7}>
            <div className="my-2 mb-5">
              <Row>
                <Col xs={1}>
                  <h4 style={{ margin: 0 }}> Lọc </h4>
                </Col>
                <Col xs={4}>
                  <SelectControl
                    name="time"
                    placeholder="Chọn thời gian"
                    values={optionTime}
                    control={control}
                  />
                </Col>
                <Col xs={4}>
                  <SelectControl
                    name="name"
                    placeholder="Chọn trạng thái"
                    values={[
                      {
                        value: 'Success',
                        label: 'Đã xác nhận',
                      },
                      {
                        value: 'Pending',
                        label: 'Đang chờ',
                      },
                    ]}
                    control={control}
                  />
                </Col>
                <Col xs={3}>
                  <button className="btn-button p-3" style={{ width: '100%' }}>
                    Xóa lọc
                  </button>
                </Col>
              </Row>
            </div>

            <Row>
              {listRegister.data?.map((item) => (
                <Col xs={4}>
                  <CardTicker
                    isCheck={true}
                    item={item}
                    key={`${item.thoiGianDky}${item.thoiGianBatDau} `}
                    onClick={handleOnConfirm}
                  />
                </Col>
              ))}

              {listRegister.total <= 0 && (
                <h4 className="text-warning">Chưa có người đăng ký</h4>
              )}
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ManagerCalendar;
