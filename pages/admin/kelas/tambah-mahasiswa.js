import React from 'react';
import { Row, Col } from 'antd';

import TambahMahasiswa from '../../../components/admin/kelas/TambahMahasiswa';

const AkunSettings = props => (
  <Row type="flex" gutter={16} style={{ margin: '40px', justifyContent: 'center' }}>
    <Col xs={24} lg={24}>
      <TambahMahasiswa kelas={props.query.kelas} />
    </Col>
  </Row>
);

export default AkunSettings;
