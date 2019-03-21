import React from 'react';
import User from '../components/User';
import Admin from './admin';
import Dosen from './dosen';
import Mahasiswa from './mahasiswa';

const IndexPage = () => (
  <User>
    {({ data, loading }) => {
      if (loading) return <p>Loading...</p>;

      const hakAksesSaya = data.me.permissions;

      if (hakAksesSaya.includes('ADMIN')) {
        return <Admin />;
      } else if (hakAksesSaya.includes('DOSEN')) {
        return <Dosen />;
      } else if (hakAksesSaya.includes('MAHASISWA')) {
        return <Mahasiswa />;
      }

      return <p>Anda login</p>;
    }}
  </User>
);
export default IndexPage;
