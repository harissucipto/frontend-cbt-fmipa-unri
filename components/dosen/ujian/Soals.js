import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import { Card, List, Avatar, Row, Col, Button } from 'antd';

import ListDistribusi from './ListDistribusi';
import ProfilUjianDistribusi from './ProfilUjianDistribusi';

const CURRENT_QUERY = gql`
  query CURRENT_QUERY($id: ID!) {
    ujian(where: { id: $id }) {
      id
      nama
      prodi {
        id
        nama
        jurusan {
          id
          nama
        }
      }
      kelas {
        id
        nama
        mataKuliah {
          id
          nama
        }
      }
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

      JumlahSoal
      presentasiSusah
      presentasiSedang
      presentasiMudah
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
                <Card
                  title={`Informasi Distribusi Soal Ujian ${ujian.nama}`}
                  loading={loading}
                  style={{ marginBottom: '15px' }}
                >
                  <ProfilUjianDistribusi
                    ujian={ujian}
                    grid={{
                      gutter: 16,
                      lg: 3,
                      md: 2,
                      xs: 1,
                    }}
                  />
                </Card>

                <Card title="Distribusi Soal">
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
