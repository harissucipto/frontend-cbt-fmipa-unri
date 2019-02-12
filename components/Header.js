/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import NProgress from 'nprogress';
import Router from 'next/router';
import styled from 'styled-components';
import { Layout } from 'antd';
import Signout from './Signout';
const { Header } = Layout;

Router.onRouteChangeStart = () => {
  NProgress.start();
};
Router.onRouteChangeComplete = () => {
  NProgress.done();
};

Router.onRouteChangeError = () => {
  NProgress.done();
};

const Left = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  margin-right: 20px;
`;

const HeaderComponent = () => (
  <Header style={{ background: '#fff', padding: 0 }}>
    <Left>
      <Signout />
    </Left>
  </Header>
);

export default HeaderComponent;
