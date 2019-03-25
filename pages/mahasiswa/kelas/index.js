import React from 'react';
import { Row, Col } from 'antd';

import Kelola from '../../../components/mahasiswa/kelas/Kelola';

export default () => (
  <Row type="flex" gutter={16} style={{ margin: '40px' }}>
    <Col xs={24}>
      <Kelola />
    </Col>
  </Row>
);
