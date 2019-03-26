import React from 'react';
import { Row, Col } from 'antd';

import KelolaMataKuliah from '../../../components/admin/mataKuliah/Kelola';

export default () => (
  <Row type="flex" gutter={16} style={{ margin: '40px' }}>
    <Col xs={24}>
      <KelolaMataKuliah />
    </Col>
  </Row>
);
