import React from 'react';
import { Row, Col, Card, Avatar } from 'antd';

import ProfilAdmin from '../../components/admin/Profil';

export default () => (
  <Row type="flex" gutter={16} style={{ margin: '40px' }}>
    <Col order={2} xs={24} md={8}>
      <ProfilAdmin />
    </Col>
    <Col order={1} xs={24} md={16} style={{ display: 'flex', marginBottom: '20px' }}>
      <Card style={{ width: '100%', height: '100%', paddingBottom: '100px' }}>
        <h1
          style={{
            marginTop: '40px',
            textAlign: 'center',
            marginBottom: '40px',
          }}
        >
          Selamat Datang
          <br /> di Portal Computer Based Test <br /> FMIPA Universitas Riau
        </h1>
        <div style={{ padding: '10px', textAlign: 'center', marginBottom: '40px' }}>
          <p>
            Ini merupakan layanan yang dapat digunakan oleh Admin, untuk melakukan beberapa hal
            terkait sistem Computer Based Test
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ textAlign: 'center', marginRight: '20px' }}>
            <Avatar shape="square" size={100} style={{ marginBottom: '5px' }} icon="user" />
            <p>Kelola Akun Mahasiswa</p>
          </div>
          <div style={{ textAlign: 'center', marginRight: '20px' }}>
            <Avatar shape="square" size={100} style={{ marginBottom: '5px' }} icon="user" />
            <p>Kelola Akun Dosen</p>
          </div>
          <div style={{ textAlign: 'center', marginRight: '20px' }}>
            <Avatar shape="square" size={100} icon="file-text" style={{ marginBottom: '5px' }} />
            <p>Kelola Mata Kuliah</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Avatar shape="square" size={100} icon="bank" style={{ marginBottom: '5px' }} />
            <p>Kelola Kelas</p>
          </div>
        </div>
      </Card>
    </Col>
  </Row>
);
