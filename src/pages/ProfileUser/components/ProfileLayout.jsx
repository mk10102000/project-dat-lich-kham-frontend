import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import ProfileBar from './ProfileBar';
import { Outlet } from 'react-router';
import {
  ProfileHistory,
  ProfileInforUser,
  ProfileInforDoctor,
} from './ProfileContent';

function ProfileLayout(props) {
  const [activeId, setActiveId] = useState('hoso');
  console.log(activeId);
  return (
    <div>
      <Container>
        <Row>
          <Col xs={3}>
            <ProfileBar id={activeId} onClickId={(id) => setActiveId(id)} />
          </Col>
          <Col xs={8}>
            {activeId === 'hoso' ? (
              <ProfileInforUser />
            ) : (
              activeId === 'lichsu' && <ProfileHistory />
            )}
            {activeId === 'bacsi' && <ProfileInforDoctor />}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ProfileLayout;
