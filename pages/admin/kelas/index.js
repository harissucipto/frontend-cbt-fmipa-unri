import React from 'react';
import { Row, Col } from 'antd';

import KelolaKelas from '../../../components/admin/kelas/Kelola';

export default () => (
  <Row type="flex" gutter={16} style={{ margin: '40px' }}>
    <Col xs={24}>
      <KelolaKelas />
    </Col>
  </Row>
);
