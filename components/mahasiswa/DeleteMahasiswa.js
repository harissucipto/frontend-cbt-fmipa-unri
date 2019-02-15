import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Button, Popconfirm, Icon, Alert } from 'antd';
import { ALL_MAHASISWA_QUERY } from './ListMahasiswa';

const DELETE_MAHASISWA_MUTATION = gql`
  mutation DELETE_MAHASISWA_MUTATION($id: ID!) {
    deleteMahasiswa(id: $id) {
      id
    }
  }
`;

class DeleteMahasiswa extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
  };

  update = (cache, payload) => {
    // manually update the cache on the client, so it matches the server
    // 1. Read the cache for the items we want
    const data = cache.readQuery({ query: ALL_MAHASISWA_QUERY });
    // // 2. Filter the deleted itemout of the page
    data.mahasiswas = data.mahasiswas.filter(item => item.id !== payload.data.deleteMahasiswa.id);
    // 3. Put the items back!
    cache.writeQuery({ query: ALL_MAHASISWA_QUERY, data });
  };
  render() {
    return (
      <Mutation
        mutation={DELETE_MAHASISWA_MUTATION}
        variables={{ id: this.props.id }}
        update={this.update}
      >
        {(deleteItem, { error, loading }) => (
          <>
            {error && <Alert message="Error Saat Mengahapus" type="error" closable />}

            <Popconfirm
              title="Are you sure？"
              icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
              onConfirm={deleteItem}
            >
              <Button type="danger" loading={loading}>
                Delete
              </Button>
            </Popconfirm>
          </>
        )}
      </Mutation>
    );
  }
}

export default DeleteMahasiswa;
