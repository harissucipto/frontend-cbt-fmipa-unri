import React from 'react';
import styled from 'styled-components';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { Card, Avatar, Form, Alert, Input, Button } from 'antd';
import PesanError from '../PesanError';

const MATAKULIAH_QUERY = gql`
  query MATAKULIAH_QUERY($id: ID!) {
    mataKuliah(id: $id) {
      nama
      kode
      id
    }
  }
`;

const MATAKULIAH_UPDATE_QUERY = gql`
  mutation MATAKULIAH_UPDATE_QUERY($mataKuliah: MataKuliahBaruInput!, $id: ID!) {
    updateMataKuliah(mataKuliah: $mataKuliah, id: $id) {
      id
      nama
      kode
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

class FormEditmataKuliah extends React.Component {
  static propTypes = {
    mataKuliah: PropTypes.shape({
      id: PropTypes.string.isRequired,
      nama: PropTypes.string.isRequired,
      kode: PropTypes.string.isRequired,
    }).isRequired,
  };

  state = {
    nama: this.props.mataKuliah.nama || '',
    kode: this.props.mataKuliah.kode || '',
  };

  saveToState = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <Mutation
        mutation={MATAKULIAH_UPDATE_QUERY}
        variables={{
          mataKuliah: {
            nama: this.state.nama,
            kode: this.state.kode,
          },
          id: this.props.mataKuliah.id,
        }}
        refetchQueries={[{ query: MATAKULIAH_QUERY, variables: { id: this.props.mataKuliah.id } }]}
      >
        {(updateMataKuliah, { error, loading, called }) => (
          <Form
            method="post"
            onSubmit={async (e) => {
              e.preventDefault();
              await updateMataKuliah();
            }}
          >
            <PesanError error={error} />
            {!error && !loading && called && (
              <Alert
                message="Update Informasi Akun Berhasil"
                type="success"
                showIcon
                style={{ margin: '10px 0' }}
              />
            )}

            <Form.Item label="Nama">
              <Input
                disabled={loading}
                onChange={this.saveToState}
                value={this.state.nama}
                name="nama"
                type="string"
                required
              />
            </Form.Item>

            <Form.Item label="Kode">
              <Input
                disabled={loading}
                onChange={this.saveToState}
                value={this.state.kode}
                name="kode"
                type="string"
                required
              />
            </Form.Item>

            <Button type="primary" htmlType="submit" loading={loading}>
              Update Informasi
            </Button>
          </Form>
        )}
      </Mutation>
    );
  }
}

const ProfilMataKuliah = props => (
  <Query
    query={MATAKULIAH_QUERY}
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
                <Avatar size={144} icon="" />
                <div>
                  <h2>{data.mataKuliah.nama}</h2>
                  <h2>{data.mataKuliah.kode}</h2>
                </div>
              </HeaderAvatar>

              <FormEditmataKuliah mataKuliah={data.mataKuliah} />
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
