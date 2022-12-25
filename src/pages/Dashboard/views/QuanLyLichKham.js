import React, { useEffect, useMemo, useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import { GoSearch } from 'react-icons/go';
import { datLichApi } from '../../../api/datLich';
import { lichLamViecApi } from '../../../api/lichLamViecApi';
import { Chip } from '../../../components/Chip/Chip';
import { formatDate, toastify } from '../../../utils/common';
import { Loading } from '../../../components/Loading';

import styles from './Dashboard.module.css';

function QuanLyLichKham() {
  const [lich, setLich] = useState([]);
  const [loading, setLoading] = useState(true);
  const [keyTime, setKeyTime] = useState(1);
  const [dataDatLich, setDataDatLich] = useState();
  const [params, setParams] = useState({
    maThoiGian: 1,
    thoiGianDky: formatDate(new Date()),
  });
  const fetchGetTime = async () => {
    try {
      const res = await lichLamViecApi.getThoiGianLamViec();
      setLich(res.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchGetTime();
  }, []);

  const optionTime = useMemo(() => {
    return lich.map((item) => {
      return {
        value: item.maTG,
        label: `${item.thoiGianBatDau} - ${item.thoiGianKetThuc}`,
      };
    });
  }, [lich]);

  const fetchDataDatLich = async (params) => {
    try {
      const res = await datLichApi.getDatLichByMaThoiGian(params);
      setDataDatLich(res);
      setLoading(false);
    } catch (error) {}
  };

  const handleOnConfirm = (maND, maThoiGian, thoiGianDky) => {
    try {
      const res = datLichApi.comfirmDangKy(
        { maND, maThoiGian, thoiGianDky: formatDate(thoiGianDky) },
        { tinhTrangDangKy: 'hoanThanh' }
      );

      const timer = setTimeout(() => {
        fetchDataDatLich(params);
      }, 100);

      toastify('success', res.message);

      return () => {
        clearTimeout(timer);
      };
    } catch (error) {}
  };

  useEffect(() => {
    fetchDataDatLich(params);
  }, [params]);

  if (loading) return <Loading />;

  return (
    <div
      style={{
        marginTop: '9rem',
      }}
    >
      <Container fluid>
        <h3 className="text-center my-5">
          Quản lý lịch khám ngày: {formatDate(new Date())}
        </h3>

        <div>
          <div>
            <div className="d-flex justify-content-between">
              <h5
                style={{
                  fontWeight: 600,
                }}
              >
                Thời gian:
              </h5>
              <div>
                <div className={styles.boxSearch}>
                  <input
                    placeholder="Nhập từ khóa tìm kiếm..."
                    className={styles.search}
                  />
                  <GoSearch />
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-between gap-5 flex-wrap">
              {optionTime.map((item) => (
                <div
                  className={`${styles.boxTime} ${
                    keyTime === item.value && styles.boxTimeActive
                  }`}
                  style={{
                    userSelect: 'none',
                    padding: '1rem 2rem',
                    backgroundColor: '#fff',
                    color: '#000',
                    fontSize: '1.4rem',
                    width: '20%',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    border: '1px solid var(--color-primary)',
                  }}
                  key={item.value}
                  onClick={() => {
                    setParams({
                      ...params,
                      maThoiGian: item.value,
                    });
                    setKeyTime(item.value);
                  }}
                >
                  <p className="text-center">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          {dataDatLich.total > 0 && (
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Tên</th>
                  <th>SDT</th>
                  <th>Ngày khám</th>
                  <th>Thời gian khám</th>
                  <th>Trạng thái</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {dataDatLich.data?.map((item, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{item.hoTen}</td>
                    <td>{item.SDT}</td>
                    <td>{formatDate(item.thoiGianDky)}</td>
                    <td>{item.thoiGianBatDau}</td>
                    <td>
                      {item.tinhTrangDangKy === 'Success' ? (
                        <Chip status={'Đã xác nhận'} variant={'#03a9f4'} />
                      ) : (
                        <Chip status={'Đã khám'} variant={'#03a9f4'} />
                      )}
                    </td>

                    <td>
                      <div className="d-flex justify-content-between mt-4">
                        {item.tinhTrangDangKy === 'Success' && (
                          <button
                            className="btn-button btn-button-primary p-p-5 mx-1"
                            onClick={() =>
                              handleOnConfirm(
                                item.maND,
                                item.maThoiGian,
                                item.thoiGianDky
                              )
                            }
                          >
                            Hoàn thành
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}

          {dataDatLich.total <= 0 && (
            <h4 className="text-warning">Không có người khám</h4>
          )}
        </div>
      </Container>
    </div>
  );
}

export default QuanLyLichKham;
