import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import ProfileBar from './ProfileBar';
import {
  ProfileHistory,
  ProfileInforUser,
  ProfileInforDoctor,
  ProfileInforTicker,
} from './ProfileContent';

function ProfileLayout(props) {
  const [activeId, setActiveId] = useState('hoso');
  return (
    <div>
      <Container>
        <Row>
          <Col xs={3}>
            <ProfileBar id={activeId} onClickId={(id) => setActiveId(id)} />
          </Col>
          <Col xs={9}>
            {activeId === 'hoso' ? (
              <ProfileInforUser />
            ) : (
              activeId === 'lichsu' && <ProfileHistory />
            )}
            {activeId === 'phieukham' && <ProfileInforTicker />}
            {activeId === 'bacsi' && <ProfileInforDoctor />}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ProfileLayout;
