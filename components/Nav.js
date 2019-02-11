/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import User from './User';
import Signout from './Signout';
import NavStyles from './styles/NavStyles';

const Nav = () => (
  <User>
    {({ data: { me } }) => (
      <NavStyles>
        {me && (
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
        )}
      </NavStyles>
    )}
  </User>
);

export default Nav;
