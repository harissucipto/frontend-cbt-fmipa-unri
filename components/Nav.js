/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Router from 'next/router';
import { Layout, Menu, Icon } from 'antd';
import styled from 'styled-components';

import User from './User';

const { Sider } = Layout;
const { SubMenu } = Menu;

const Logo = styled.div`
  position: relative;
  height: 64px;
  padding-left: 24px;
  overflow: hidden;
  line-height: 64px;
  background: #002140;
  transition: all 0.3s;
  h1 {
    display: inline-block;
    margin: 0 0 0 12px;
    color: #fff;
    font-weight: 600;
    font-size: 20px;
    font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
    vertical-align: middle;
  }
  img {
    display: inline-block;
    height: 32px;
    vertical-align: middle;
  }
`;

const Nav = () => (
  <User>
    {({ data: { me } }) => (
      <Sider breakpoint="lg" width="256" collapsedWidth="0">
        <Logo>
          <img src="../static/logo.svg" alt="logo" />
          <h1>CBT FMIPA UR</h1>
        </Logo>

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

          <SubMenu
            key="sub2"
            title={
              <span>
                <Icon type="user" />
                Dosen
              </span>
            }
          >
            <Menu.Item key="3" onClick={() => Router.push('/dosen/kelola')}>
              Kelola Dosen
            </Menu.Item>
            <Menu.Item key="22" onClick={() => Router.push('/dosen/tambah')}>
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
            <Menu.Item key="31" onClick={() => Router.push('/mahasiswa/kelola')}>
              Kelola Mahasiswa
            </Menu.Item>
            <Menu.Item key="32" onClick={() => Router.push('/mahasiswa/tambah')}>
              Tambah Mahasiswa
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub4"
            title={
              <span>
                <Icon type="user" />
                Pengawas
              </span>
            }
          >
            <Menu.Item key="7">Kelola Pengawas</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub5"
            title={
              <span>
                <Icon type="user" />
                Mata Kuliah
              </span>
            }
          >
            <Menu.Item key="9">Kelola MataKuliah</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub6"
            title={
              <span>
                <Icon type="user" />
                Kelas
              </span>
            }
          >
            <Menu.Item key="11">Kelola Kelas</Menu.Item>
            <Menu.Item key="12">Pengaturan Akun</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub7"
            title={
              <span>
                <Icon type="user" />
                Ujian
              </span>
            }
          >
            <Menu.Item key="13">Info Akun</Menu.Item>
            <Menu.Item key="14">Pengaturan Akun</Menu.Item>
          </SubMenu>

          {/* {me && (
            <>
              <Link href="/mahasiswa">
                <a>Mahasiswa</a>
              </Link>
              <Link href="dosen">
                <a>Dosen</a>
              </Link>
              <Link href="/pengawas">
                <a>Pengawas</a>
              </Link>
              <Link href="/kelas">
                <a>Kelas</a>
              </Link>
              <Link href="/bank-soal">
                <a>Soal</a>
              </Link>
              <Link href="/ujian">
                <a>Ujian</a>
              </Link>
              <Link href="/skor">
                <a>Skor</a>
              </Link>
              <Link href="/akun">
                <a>Akun</a>
              </Link>
              <Signout />
            </>
          )}

          {!me && (
            <Link href="/signin">
              <a>Login</a>
            </Link>
          )} */}
        </Menu>
      </Sider>
    )}
  </User>
);

export default Nav;
