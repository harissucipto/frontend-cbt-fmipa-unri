import React from 'react';
import User from './User';
import Router from 'next/router';

const Dashboard = () => (
  <User>
    {({ data }, loading) => {
      if (loading) return <p>loading</p>;

      const { permissions } = data.me;
      if (permissions.includes('ADMIN')) {
        return <p>ADMIN</p>;
      }
      if (permissions.includes('DOSEN')) {
        return <p>DOSEN</p>;
      }
      if (permissions.includes('MAHASISWA')) {
        return <p>MAHASISWA</p>;
      }

      return <p>Tidak Memiliki Hak Akses</p>;
    }}
  </User>
);

export default Dashboard;
