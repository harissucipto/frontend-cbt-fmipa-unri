/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Row, Col, Card, Layout } from 'antd';

import Edit from '../../../components/admin/mataKuliah/Edit';

const EditPage = props => (
  <Layout>
    <Row>
      <Col span={12}>
        <Edit id={props.query.id} />
      </Col>
    </Row>
  </Layout>
);
export default EditPage;
