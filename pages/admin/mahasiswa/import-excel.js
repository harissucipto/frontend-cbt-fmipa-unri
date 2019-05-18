import React from 'react';
import { Row, Col } from 'antd';

import Tambah from '../../../components/admin/mahasiswa/ImportExcel';

const AkunSettings = () => (
  <Row type="flex" gutter={16} style={{ margin: '40px', justifyContent: 'center' }}>
    <Col xs={24} lg={24}>
      <Tambah />
    </Col>
  </Row>
);

export default AkunSettings;
