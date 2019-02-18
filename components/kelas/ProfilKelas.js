import React from 'react';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { Card, List, Avatar } from 'antd';
import PesanError from '../PesanError';
import SiswaKelas from './SiswaKelas';

const KELAS_QUERY = gql`
  query KELAS_QUERY($id: ID!) {
    kelas(id: $id) {
      id
      nama
      tahunAjaran
      mataKuliah {
        nama
      }
      dosen {
        nama
      }
      tahunAjaran
      listMahasiswa {
        nama
        nim
        id
      }
    }
  }
`;

const HeaderAvatar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;

  div {
    margin-top: 20px;
    text-align: center;
    h2 {
      margin-bottom: 4px;
      color: rgba(0, 0, 0, 0.85);
      font-weight: 500;
      font-size: 20px;
      line-height: 28px;
    }
  }
`;

const ProfilMataKuliah = props => (
  <Query
    query={KELAS_QUERY}
    variables={{
      id: props.id,
    }}
  >
    {({ data, loading, error }) => {
      if (loading) return <p>Loading</p>;
      if (error) {
        return (
          <div style={{ margin: '40px' }}>
            <PesanError error={error} />
          </div>
        );
      }

      return (
        <Card style={{ margin: '20px', padding: '24px' }} loading={loading}>
          {data && (
            <>
              <HeaderAvatar>
                <Avatar size={144} icon="user" />
                <div>
                  <h2>Kelas {data.kelas.nama}</h2>
                </div>
              </HeaderAvatar>

              <List>
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon="user" />}
                    title="Tahun Ajaran"
                    description={data.kelas.tahunAjaran}
                  />
                </List.Item>

                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon="user" />}
                    title="Mata Kuliah"
                    description={data.kelas.mataKuliah.nama}
                  />
                </List.Item>

                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon="user" />}
                    title="Dosen"
                    description={data.kelas.dosen.nama}
                  />
                </List.Item>

                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon="user" />}
                    title="List Mahasiswa"
                    description={
                      <SiswaKelas mahasiswa={data.kelas.listMahasiswa} loding={loading} />
                    }
                  />
                </List.Item>
              </List>
            </>
          )}
        </Card>
      );
    }}
  </Query>
);

ProfilMataKuliah.propTypes = {
  id: PropTypes.string.isRequired,
};

export default ProfilMataKuliah;
