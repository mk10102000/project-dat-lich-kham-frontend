import React, { useState, useEffect } from 'react';
import { Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import HeadTitle from '../../components/HeadTitle/HeadTitle';
import ChooseTime from './components/ChooseTime';
import { lichLamViecApi } from '../../api/lichLamViecApi';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { addService } from '../../app/slices/bookServiceSlice';

export default function ChooseDayExamination() {
  const dispatch = useDispatch();
  const [value, onChange] = useState(new Date());
  const [time, setTime] = useState('');
  const [dateData, setDateData] = useState('');
  const [isViewTime, setIsViewTime] = useState(false);
  const [buoiSang, setBuoiSang] = useState([]);
  const [buoiChieu, setBuoiChieu] = useState([]);
  const [timeItem, setTimeItem] = useState('');
  const navigate = useNavigate();

  function getPreviousDay(date = new Date()) {
    const previous = new Date(date.getTime());
    previous.setDate(date.getDate() - 1);

    return previous;
  }
  const tileDisabled = ({ activeStartDate, date, view }) => {
    return date < getPreviousDay(new Date()) || !date.getDay('Sunday');
  };

  const handleOnClickDay = (value) => {
    setIsViewTime(true);
    setDateData(value);
  };

  const handleOnClickTime = (time) => {
    setTime(time);
  };

  const handleOnSubmit = () => {
    console.log({ time, dateData });
    dispatch(
      addService({
        time,
        dateData,
        id: uuidv4(),
      })
    );
    // call api save redux
    navigate('/xac-nhan-thong-tin');
  };

  const fetchData = async () => {
    try {
      const { buoiSang, buoiChieu } = await lichLamViecApi.getThoiGianLamViec();
      console.log(buoiSang);
      setBuoiSang(buoiSang);
      setBuoiChieu(buoiChieu);
    } catch (error) {}
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <HeadTitle title="Vui lòng chọn ngày khám" />
      <div>
        <Calendar
          onChange={onChange}
          value={value}
          tileDisabled={tileDisabled}
          // tileDisabled={({ date }) => !date.getDay('Sunday')}
          onClickDay={handleOnClickDay}
          locale="vi"
        />
      </div>
      {isViewTime && (
        <ChooseTime
          time={time}
          onClickTime={handleOnClickTime}
          date={value}
          buoiChieu={buoiChieu}
          buoiSang={buoiSang}
          onSubmit={handleOnSubmit}
        />
      )}
    </div>
  );
}
