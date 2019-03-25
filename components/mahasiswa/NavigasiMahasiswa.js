import React from 'react';
import Router from 'next/router';
import { Menu, Icon } from 'antd';

const { SubMenu } = Menu;

const NavigasiAdmin = () => (
  <>
    <Menu theme="dark" mode="inline" defaultSelectedKeys={['sub1-1']}>
      <SubMenu
        key="sub1"
        title={
          <span>
            <Icon type="user" />
            Profil
          </span>
        }
      >
        <Menu.Item key="sub1-1" onClick={() => Router.push('/mahasiswa/')}>
          Info Profil
        </Menu.Item>
        <Menu.Item key="sub-1-2" onClick={() => Router.push('/mahasiswa/setting')}>
          Setting Profil
        </Menu.Item>
      </SubMenu>

      <SubMenu
        key="sub2"
        title={
          <span>
            <Icon type="bank" />
            Kelas
          </span>
        }
      >
        <Menu.Item key="sub2-1" onClick={() => Router.push('/mahasiswa/kelas')}>
          Informasi Kelas
        </Menu.Item>
      </SubMenu>

      <SubMenu
        key="sub3"
        title={
          <span>
            <Icon type="schedule" />
            Ujian
          </span>
        }
      >
        <Menu.Item key="sub3-1" onClick={() => Router.push('/mahasiswa/ujian/')}>
          Jadwal Ujian
        </Menu.Item>
        <Menu.Item key="sub3-2" onClick={() => Router.push('/mahasiswa/ujian/hasil')}>
          Hasil Ujian
        </Menu.Item>
      </SubMenu>
    </Menu>
  </>
);

export default NavigasiAdmin;
