import React from 'react';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { Card, List, Avatar } from 'antd';
import PesanError from '../PesanError';

const MAHASISWA_QUERY = gql`
  query MAHASISWA_QUERY($id: ID!) {
    mahasiswa(id: $id) {
      nama
      nim
      id
      user {
        email
        passwordKasih
        permissions
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

const ProfilMahasiswa = props => (
  <Query
    query={MAHASISWA_QUERY}
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
                  <h2>{data.mahasiswa.nama}</h2>
                  <p>
                    {data.mahasiswa.user.permissions
                      .filter(permission => !['USER'].includes(permission))
                      .join(' ')}{' '}
                    CBT FMIPA UR
                  </p>
                </div>
              </HeaderAvatar>

              <List>
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon="mail" />}
                    title="Nim"
                    description={data.mahasiswa.nim}
                  />
                </List.Item>
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon="mail" />}
                    title="Email"
                    description={data.mahasiswa.user.email}
                  />
                </List.Item>
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon="mail" />}
                    title="Permission"
                    description={data.mahasiswa.user.permissions.reduce(
                      (acc, prev) => `${acc} ${prev},`,
                      '',
                    )}
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

ProfilMahasiswa.propTypes = {
  id: PropTypes.string.isRequired,
};

export default ProfilMahasiswa;
