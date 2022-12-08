import React, { useEffect } from 'react';
import InforBar from '../../components/Layout/InforBar';
import LayoutBooks from '../../components/Layout/LayoutBooks';
import BarInforUser from './components/BarInforUser';
import { useNavigate, Navigate } from 'react-router';
import { useSelector } from 'react-redux';

function ConfirmInformation(props) {
  const navigate = useNavigate();
  const { services } = useSelector((state) => state.service.data);
  useEffect(() => {
    if (services.length <= 0) {
      navigate('/');
    }
  }, [services]);
  return (
    <>
      {services.length <= 0 ? (
        <Navigate to="/" />
      ) : (
        <LayoutBooks
          InfoBar={
            <InforBar title="Thông tin bệnh nhân">
              <BarInforUser />
            </InforBar>
          }
        />
      )}
    </>
  );
}

ConfirmInformation.propTypes = {};

export default ConfirmInformation;
