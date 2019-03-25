import React from 'react';
import { Row, Col } from 'antd';

import TambahPage from '../../../components/dosen/ujian/Tambah';

const AkunSettings = () => (
  <Row type="flex" gutter={16} style={{ margin: '40px', justifyContent: 'center' }}>
    <Col xs={24} lg={10}>
      <TambahPage />
    </Col>
  </Row>
);

export default AkunSettings;
