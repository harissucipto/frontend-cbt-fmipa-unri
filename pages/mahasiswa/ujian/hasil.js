import React from 'react';
import { Row, Col } from 'antd';

import IndexPage from '../../../components/mahasiswa/ujian/Hasil';

export default () => (
  <Row type="flex" gutter={16} style={{ margin: '40px' }}>
    <Col xs={24}>
      <IndexPage />
    </Col>
  </Row>
);
