import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Icon } from 'antd';
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
            Made with <Icon type="heart" color="red" style={{ margin: '0px 5px' }} /> by Haris
            Sucipto
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
