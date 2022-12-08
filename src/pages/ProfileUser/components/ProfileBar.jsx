import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RiShieldUserLine } from 'react-icons/ri';
import { FaHistory } from 'react-icons/fa';
import { TbBuildingHospital } from 'react-icons/tb';
import styles from '../ProfileUser.module.css';

const profileRoute = [
  {
    title: 'Hồ sơ người dùng',
    icon: <RiShieldUserLine />,
    id: 'hoso',
  },
  {
    title: 'Lịch sử khám bệnh',
    icon: <FaHistory />,
    id: 'lichsu',
  },
];
export default function ProfileBar({ id, onClickId }) {
  const { maQuyen } = useSelector((state) => state.auth.currentUser);

  return (
    <div className={styles.profile}>
      <ul className={styles.profileBarList}>
        {maQuyen === 'bacsi' && (
          <li
            className={`${styles.profileBarItem} ${
              id === 'bacsi' && styles.active
            }`}
            onClick={() => onClickId('bacsi')}
          >
            <TbBuildingHospital />
            Thông tin bác sĩ
          </li>
        )}
        {profileRoute.map((profile) => (
          <>
            <li
              className={`${styles.profileBarItem} ${
                id === profile.id && styles.active
              }`}
              key={profile.id}
              onClick={() => onClickId(profile.id)}
            >
              {profile.icon}
              {profile.title}
            </li>
          </>
        ))}
      </ul>
    </div>
  );
}
