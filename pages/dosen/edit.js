/* eslint-disable react/prop-types */
import React from 'react';
import EditDosen from '../../components/EditDosen';

const IndexPage = props => <EditDosen id={props.query.id} />;

export default IndexPage;
