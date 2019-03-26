import React from 'react';
import { Row, Col } from 'antd';

import TambahDosen from '../../../components/admin/dosen/Tambah';

const AkunSettings = () => (
  <Row type="flex" gutter={16} style={{ margin: '40px', justifyContent: 'center' }}>
    <Col xs={24} lg={16}>
      <TambahDosen />
    </Col>
  </Row>
);

export default AkunSettings;
