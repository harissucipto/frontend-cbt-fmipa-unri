/* eslint-disable react/prop-types */
import React from 'react';
import ProfilDosen from '../../components/ProfilDosen';

const IndexPage = props => <ProfilDosen id={props.query.id} />;

export default IndexPage;
