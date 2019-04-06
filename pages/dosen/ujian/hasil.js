import React from 'react';
import { Row, Col } from 'antd';

import KelolaHasil from '../../../components/dosen/ujian/KelolaHasil';

export default () => (
  <Row type="flex" gutter={16} style={{ margin: '40px' }}>
    <Col xs={24}>
      <KelolaHasil />
    </Col>
  </Row>
);
