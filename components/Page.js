import React from 'react';
import { injectGlobal } from 'styled-components';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import Header from './Header';
import PleaseSignIn from './PleaseSignIn';
import Meta from './Meta';
import Nav from './Nav';
const { Content, Footer } = Layout;
// eslint-disable-next-line no-unused-expressions

const Page = props => (
  <Layout style={{ minHeight: '100vh' }}>
    <PleaseSignIn>
      <>
        <Meta />
        <Nav />
        <Layout>
          <Header />

          <Content>{props.children}</Content>
          <Footer style={{ textAlign: 'center' }}>
            Aplikasi CBT FMIPA UR ©2018 Created by Haris Sucipto
          </Footer>
        </Layout>
      </>
    </PleaseSignIn>
  </Layout>
);

Page.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default Page;
