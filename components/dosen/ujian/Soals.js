import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import { Card, List, Avatar, Row, Col, Button } from 'antd';

import ListDistribusi from './ListDistribusi';

const CURRENT_QUERY = gql`
  query CURRENT_QUERY($id: ID!) {
    ujian(where: { id: $id }) {
      id
      nama
      soalMahasiswas {
        id
        mahasiswa {
          id
          nama
          nim
        }
        soals {
          id
          tingkatKesulitan
        }
      }
      bankSoal {
        id
        nama
        soals {
          id
          tingkatKesulitan
        }
      }
    }
  }
`;

class ProfilAdmin extends React.Component {
  render() {
    const { id } = this.props;

    return (
      <Query query={CURRENT_QUERY} variables={{ id }} fetchPolicy="network-only">
        {({ data, loading }) => {
          if (loading) return <p>Loading...</p>;
          if (!data) return <p>Loading..</p>;
          console.log(data, 'data profil');

          const { ujian } = data;

          return (
            <Row type="flex" gutter={16} style={{ margin: '40px' }}>
              <Col xs={24} md={24}>
                <Card title={`Informasi Distribusi Soal Ujian ${ujian.nama}`} loading={loading}>
                  <div style={{ marginBottom: '2rem' }}>
                    <h3>
                      <u>Detail Bank Soal</u>
                    </h3>
                    <Row>
                      <Col span={8}>
                        <Row>
                          <Col span={8}>
                            <h3>Nama</h3>
                          </Col>
                          <Col span={14}>
                            <h3>: {ujian.bankSoal.nama}</h3>
                          </Col>
                        </Row>
                      </Col>
                      <Col span={8}>
                        <Row>
                          <Col span={8}>
                            <h3>Jumlah Soal</h3>
                          </Col>
                          <Col span={14}>
                            <h3>: {ujian.bankSoal.soals.length}</h3>
                          </Col>
                        </Row>
                      </Col>
                    </Row>

                    <h3 style={{ marginTop: '2rem' }}>
                      <u>Detail Ujian</u>
                    </h3>
                    <Row>
                      <Col span={8}>
                        <Row>
                          <Col span={8}>
                            <h3>Nama </h3>
                          </Col>
                          <Col span={14}>
                            <h3>: {ujian.nama}</h3>
                          </Col>
                        </Row>
                      </Col>
                      <Col span={8}>
                        <Row>
                          <Col span={8}>
                            <h3>Soal Tiap MahaSiswa</h3>
                          </Col>
                          <Col span={14}>
                            <h3>: {ujian.soalMahasiswas[0].soals.length}</h3>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </div>

                  <u>
                    <h3>Pengacakan Soal Ujian:</h3>
                  </u>

                  <ListDistribusi
                    bankSoal={ujian.bankSoal}
                    soalMahasiswas={ujian.soalMahasiswas}
                    loading={loading}
                  />
                </Card>
              </Col>
            </Row>
          );
        }}
      </Query>
    );
  }
}

export default ProfilAdmin;
export { CURRENT_QUERY };
