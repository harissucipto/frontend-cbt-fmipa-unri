/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Row, Col, Card, Layout } from 'antd';

import Edit from '../../../components/admin/dosen/Edit';

const EditPage = props => (
  <Layout>
    <Row>
      <Col span={12}>
        <Edit id={props.query.id} />
      </Col>
      <Col span={12}>
        <Card style={{ margin: '20px' }}>
          <p>Halo</p>
        </Card>
      </Col>
    </Row>
  </Layout>
);
export default EditPage;
