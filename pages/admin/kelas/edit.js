import React from 'react';
import { Row, Col } from 'antd';

import Edit from '../../../components/admin/kelas/Edit';

const AkunSettings = props => (
  <Row type="flex" gutter={16} style={{ margin: '40px', justifyContent: 'center' }}>
    <Col xs={24} lg={16}>
      <Edit id={props.query.id} />
    </Col>
  </Row>
);

export default AkunSettings;
