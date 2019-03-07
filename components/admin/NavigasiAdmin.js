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
        <Menu.Item key="sub1-1" onClick={() => Router.push('/admin/')}>
          Info Profil
        </Menu.Item>
        <Menu.Item key="sub-1-2" onClick={() => Router.push('/admin/setting')}>
          Setting Profil
        </Menu.Item>
      </SubMenu>

      <SubMenu
        key="sub2"
        title={
          <span>
            <Icon type="user" />
            Dosen
          </span>
        }
      >
        <Menu.Item key="sub2-1" onClick={() => Router.push('/admin/dosen')}>
          Kelola Dosen
        </Menu.Item>
        <Menu.Item key="sub2-2" onClick={() => Router.push('/admin/dosen/tambah')}>
          Tambah Dosen
        </Menu.Item>
      </SubMenu>

      <SubMenu
        key="sub3"
        title={
          <span>
            <Icon type="user" />
            Mahasiswa
          </span>
        }
      >
        <Menu.Item key="sub3-1" onClick={() => Router.push('/admin/mahasiswa/')}>
          Kelola Mahasiswa
        </Menu.Item>
        <Menu.Item key="sub3-2" onClick={() => Router.push('/admin/mahasiswa/tambah')}>
          Tambah Mahasiswa
        </Menu.Item>
      </SubMenu>

      <SubMenu
        key="sub4"
        title={
          <span>
            <Icon type="user" />
            Mata Kuliah
          </span>
        }
      >
        <Menu.Item key="sub4-1" onClick={() => Router.push('/admin/mata-kuliah/')}>
          Kelola Mata Kuliah
        </Menu.Item>
        <Menu.Item key="sub4-2" onClick={() => Router.push('/admin/mata-kulia/tambah')}>
          Tambah Mata Kuliah
        </Menu.Item>
      </SubMenu>

      <SubMenu
        key="sub5"
        title={
          <span>
            <Icon type="user" />
            Kelas
          </span>
        }
      >
        <Menu.Item key="sub5-1" onClick={() => Router.push('/admin/kelas/')}>
          Kelola Kelas
        </Menu.Item>
        <Menu.Item key="sub5-2" onClick={() => Router.push('/admin/kelas/tambah')}>
          Tambah Kelas
        </Menu.Item>
      </SubMenu>
    </Menu>
  </>
);

export default NavigasiAdmin;
