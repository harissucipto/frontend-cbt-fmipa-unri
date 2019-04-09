import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import { Card, List, Avatar, Row, Col, Button } from 'antd';

import ListKelas from './ListKelasHasil';
import ProfilUjian from './ProfilUjian';

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
        skor
      }

      dosen {
        id
        nama
      }
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
        mahasiswas {
          id
          nama
          nim
        }
      }
      bankSoal {
        id
        nama
      }
      tanggalPelaksanaan
      lokasi
      JumlahSoal
      presentasiSusah
      presentasiSedang
      presentasiMudah
      durasiPengerjaan
    }
  }
`;

class ProfilAdmin extends React.Component {
  render() {
    const { id } = this.props;

    return (
      <Query query={CURRENT_QUERY} variables={{ id }} fetchPolicy="network-only">
        {({ data, loading }) => {
          if (!data) return <p>Loading..</p>;
          console.log(data, 'data profil');

          return (
            <Row type="flex" gutter={16} style={{ margin: '40px' }}>
              <Col xs={24}>
                <Card
                  title="Informasi Ujian"
                  loading={loading}
                  style={{ marginBottom: '15px' }}
                  extra={
                    <Button
                      type="primary"
                      onClick={() =>
                        Router.push({
                          pathname: '/dosen/ujian/soals',
                          query: { id: data.ujian.id },
                        })
                      }
                    >
                      Lihat Distribusi Soal
                    </Button>
                  }
                >
                  {/* <HeaderAvatar>
            <Avatar size={144} icon="user" />
            <div>
              <p>
                {data.admin.permissions
                  .filter(permission => !['USER'].includes(permission))
                  .join(' ')}
              </p>
            </div>
          </HeaderAvatar> */}
                  <ProfilUjian
                    ujian={data.ujian}
                    grid={{
                      gutter: 16,
                      lg: 3,
                      md: 2,
                      xs: 1,
                    }}
                  />
                </Card>
              </Col>
              <Col xs={24}>
                <Card title="Peserta Ujian:">
                  <ListKelas
                    idUjian={id}
                    mahasiswas={data.ujian.soalMahasiswas}
                    loading={loading}
                    kelas={data.ujian.kelas.id}
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
