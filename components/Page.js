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
injectGlobal`
  @font-face {
    font-family: '-apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif,
 "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";';
    /* src: url('/static/radnikanext-medium-webfont.woff2') format('woff2'); */
    font-weight: normal;
    font-style: normal;
  }

`;

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
