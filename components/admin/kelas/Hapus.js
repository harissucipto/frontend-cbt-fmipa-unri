import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Button, Popconfirm, Icon, Alert } from 'antd';

import { SEARCH_LIST } from './List';

const DELTE_MATAKULIAH_MUTATION = gql`
  mutation DELTE_MATAKULIAH_MUTATION($id: ID!) {
    deleteMataKuliah(id: $id) {
      id
    }
  }
`;

class DeleteDosen extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
  };

  update = (cache, payload) => {
    // manually update the cache on the client, so it matches the server
    // 1. Read the cache for the items we want
    const dataALL = cache.readQuery({
      query: SEARCH_LIST,
      variables: {
        searchTerm: '',
        jurusan: '',
        prodi: '',
      },
    });
    // // 2. Filter the deleted itemout of the page

    dataALL.mataKuliahs = dataALL.mataKuliahs.filter(item => item.id !== payload.data.deleteMataKuliah.id);

    // // 3. Put the items back!
    cache.writeQuery({
      query: SEARCH_LIST,
      variables: {
        searchTerm: '',
        jurusan: '',
        prodi: '',
      },
      data: dataALL,
    });

    const dataK = cache.readQuery({
      query: SEARCH_LIST,
      variables: {
        searchTerm: this.props.keyword,
        jurusan: this.props.jurusan,
        prodi: this.props.prodi,
      },
    });
    // // 2. Filter the deleted itemout of the page

    dataK.mataKuliahs = dataK.mataKuliahs.filter(item => item.id !== payload.data.deleteMataKuliah.id);

    cache.writeQuery({
      query: SEARCH_LIST,
      variables: {
        searchTerm: this.props.keyword,
        jurusan: this.props.jurusan,
        prodi: this.props.prodi,
      },
      data: dataK,
    });
  };
  render() {
    return (
      <Mutation
        mutation={DELTE_MATAKULIAH_MUTATION}
        variables={{ id: this.props.id }}
        update={this.update}
      >
        {(deleteItem, { error, loading, called }) => (
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

export default DeleteDosen;
export { DELTE_MATAKULIAH_MUTATION };
