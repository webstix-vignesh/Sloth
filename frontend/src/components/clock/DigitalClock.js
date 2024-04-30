import React, { useState, useEffect } from 'react';
import { Row, Col, Typography } from 'antd';
import moment from 'moment-timezone';

const { Title } = Typography;

const DigitalClock = () => {
  const [madisonTime, setMadisonTime] = useState(moment().tz('America/Chicago').format('HH:mm:ss'));
  const [indiaTime, setIndiaTime] = useState(moment().tz('Asia/Kolkata').format('HH:mm:ss'));

  useEffect(() => {
    const madisonInterval = setInterval(() => {
      setMadisonTime(moment().tz('America/Chicago').format('HH:mm:ss'));
    }, 1000);

    const indiaInterval = setInterval(() => {
      setIndiaTime(moment().tz('Asia/Kolkata').format('HH:mm:ss'));
    }, 1000);

    return () => {
      clearInterval(madisonInterval);
      clearInterval(indiaInterval);
    };
  }, []);

  return (
    <Row gutter={[16, 16]}>
      <Col span={12}>
        <Title level={2} style={{ textAlign: 'center' }}>
          Madison Time
        </Title>
        <Title level={4} style={{ textAlign: 'center' }}>
          {madisonTime}
        </Title>
      </Col>
      <Col span={12}>
        <Title level={2} style={{ textAlign: 'center' }}>
          India Time
        </Title>
        <Title level={4} style={{ textAlign: 'center' }}>
          {indiaTime}
        </Title>

      </Col>
    </Row>
  );
};

export default DigitalClock;
