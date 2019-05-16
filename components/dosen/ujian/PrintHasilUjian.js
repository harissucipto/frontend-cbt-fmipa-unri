import React from 'react';
import ReactToPrint from 'react-to-print';
import { Query } from 'react-apollo';
import { Button, Row, Col, Card, Table } from 'antd';
import styled from 'styled-components';

import moment from 'moment';
import 'moment/locale/id';

import { CURRENT_QUERY } from './ProfilHasil';

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

class ComponentToPrint extends React.Component {
  render() {
    const { id } = this.props;
    return (
      <Query query={CURRENT_QUERY} variables={{ id }} fetchPolicy="network-only">
        {({ data, loading }) => {
          if (!data) return <p>Loading..</p>;
          if (loading) return <p>Loading...</p>;

          const {
            nama,
            prodi,
            kelas,
            tanggalPelaksanaan,
            durasiPengerjaan,
            dosen,
            soalMahasiswas,
          } = data.ujian;
          return (
            <div style={{ margin: '2rem' }}>
              <div style={{ marginBottom: '3rem' }}>
                <h3 style={{ textAlign: 'center', textDecoration: 'underline' }}>
                  HASIL UJIAN CBT FMIPA UNIVERSITAS RIAU
                </h3>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <Row>
                  <Col span={8}>
                    <h4>NAMA UJIAN</h4>
                  </Col>
                  <Col>
                    <h4>: {nama.toUpperCase()}</h4>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    <h4>JURUSAN</h4>
                  </Col>
                  <Col>
                    <h4>: {prodi.jurusan.nama.toUpperCase()}</h4>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    <h4>PRODI</h4>
                  </Col>
                  <Col>
                    <h4>: {prodi.nama.toUpperCase()}</h4>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    <h4>MATA KULIAH</h4>
                  </Col>
                  <Col>
                    <h4>: {kelas.mataKuliah.nama.toUpperCase()}</h4>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    <h4>KELAS</h4>
                  </Col>
                  <Col>
                    <h4>: {kelas.nama.toUpperCase()}</h4>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    <h4>DOSEN</h4>
                  </Col>
                  <Col>
                    <h4>: {dosen.nama.toUpperCase()}</h4>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    <h4>TANGGAL PELAKSANAAN</h4>
                  </Col>
                  <Col>
                    <h4>
                      :{' '}
                      {moment(tanggalPelaksanaan)
                        .format('dddd, Do MMMM  YYYY, hh:mm a')
                        .toUpperCase()}
                    </h4>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    <h4>DURASI</h4>
                  </Col>
                  <Col>
                    <h4>: {durasiPengerjaan} MENIT</h4>
                  </Col>
                </Row>
              </div>
              <Table
                style={{ borderWidth: '10px' }}
                title={() => <h3 style={{ textAlign: 'center' }}>SKOR PESERTA UJIAN</h3>}
                pagination={false}
                size="small"
                bordered
                loading={loading}
                dataSource={soalMahasiswas}
                rowKey={item => item.id}
                columns={[
                  {
                    title: 'NAMA',

                    dataIndex: 'mahasiswa.nama',
                    key: 'nama',
                    render: text => text.toUpperCase(),
                  },
                  {
                    title: 'NIM',

                    dataIndex: 'mahasiswa.nim',
                    key: 'nim',
                    render: text => text.toUpperCase(),
                  },
                  {
                    title: 'NILAI',
                    align: 'center',
                    dataIndex: 'skor',
                    key: 'skor',
                    render: text => text,
                  },
                ]}
              />
            </div>
          );
        }}
      </Query>
    );
  }
}

class Example extends React.Component {
  render() {
    return (
      <Row type="flex" gutter={16} style={{ margin: '40px' }}>
        <Col xs={24}>
          <Card
            title="Preview Cetak Hasil Ujian"
            extra={
              <ReactToPrint
                trigger={() => (
                  <Button type="primary" size="large">
                    Cetak
                  </Button>
                )}
                content={() => this.componentRef}
              />
            }
          >
            <ComponentToPrint ref={el => (this.componentRef = el)} id={this.props.id} />;
          </Card>
        </Col>
      </Row>
    );
  }
}

export default Example;
