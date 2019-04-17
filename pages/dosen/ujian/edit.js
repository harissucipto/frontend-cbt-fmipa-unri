import React from 'react';
import { Row, Col } from 'antd';
import TambahPage from '../../../components/dosen/ujian/Edit';

const AkunSettings = props => (
  <Row type="flex" gutter={16} style={{ margin: '40px', justifyContent: 'center' }}>
    <Col xs={24} lg={14}>
      <TambahPage id={props.query.id} />
    </Col>
  </Row>
);

export default AkunSettings;
