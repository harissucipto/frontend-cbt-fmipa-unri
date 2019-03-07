import React from 'react';
import ProfilAdmin from '../components/ProfilAdmin';
import User from '../components/User';

const IndexPage = () => (
  <User>
    {({ data, loading }) => {
      if (loading) return <p>Loading...</p>;

      const hakAksesSaya = data.me.permissions;

      if (hakAksesSaya.includes('ADMIN')) {
        return <p>Anda Admin</p>;
      } else if (hakAksesSaya.includes('DOSEN')) {
        return <p>Anda Dosen</p>;
      } else if (hakAksesSaya.includes('MAHASISWA')) {
        return <p>Anda Mahasiswa</p>;
      }

      return <p>Anda login</p>;
    }}
  </User>
);
export default IndexPage;
