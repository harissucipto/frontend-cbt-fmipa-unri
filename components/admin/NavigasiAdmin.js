import React from 'react';
import Router from 'next/router';
import { Menu, Icon } from 'antd';

const { SubMenu } = Menu;

const NavigasiAdmin = () => (
  <>
    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
      <SubMenu
        key="sub1"
        title={
          <span>
            <Icon type="user" />
            Akun
          </span>
        }
      >
        <Menu.Item key="1" onClick={() => Router.push('/admin/profil')}>
          Info Akun
        </Menu.Item>
        <Menu.Item key="2" onClick={() => Router.push('/admin/setting')}>
          Pengaturan Akun
        </Menu.Item>
      </SubMenu>
    </Menu>
  </>
);

export default NavigasiAdmin;
