import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Button, Popconfirm, Icon, Alert } from 'antd';
import { ALL_PENGAWAS_QUERY } from './ListPengawas';

const DELETE_PENGAWAS_MUTATION = gql`
  mutation DELETE_PENGAWAS_MUTATION($id: ID!) {
    deletePengawas(id: $id) {
      id
    }
  }
`;

class DeletePengawas extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
  };

  update = (cache, payload) => {
    // manually update the cache on the client, so it matches the server
    // 1. Read the cache for the items we want
    const data = cache.readQuery({ query: ALL_PENGAWAS_QUERY });
    // // 2. Filter the deleted itemout of the page
    data.pengawass = data.pengawass.filter(item => item.id !== payload.data.deletePengawas.id);
    // 3. Put the items back!
    cache.writeQuery({ query: ALL_PENGAWAS_QUERY, data });
  };
  render() {
    return (
      <Mutation
        mutation={DELETE_PENGAWAS_MUTATION}
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

export default DeletePengawas;
