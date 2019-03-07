import React from 'react';
import Downshift, { resetIdCounter } from 'downshift';
import Router from 'next/router';
import { ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import debounce from 'lodash.debounce';
import { DropDown, DropDownItem, SearchStyles } from '../styles/DropDown';

const SEARCH_MAHASISWA_QUERY = gql`
  query SEARCH_MAHASISWA_QUERY($searchTerm: String!) {
    mahasiswas(where: { OR: [{ nim_contains: $searchTerm }, { nama_contains: $searchTerm }] }) {
      id
      nim
      nama
    }
  }
`;

function routeToItem(item) {
  Router.push({
    pathname: '/mahasiswa/profil',
    query: {
      id: item.id,
    },
  });
}

class AutoComplete extends React.Component {
  state = {
    mahasiswas: [],
    loading: false,
  };
  onChange = debounce(async (e, client) => {
    console.log('Searching...');
    // turn loading on
    this.setState({ loading: true });
    // Manually query apollo client
    const res = await client.query({
      query: SEARCH_MAHASISWA_QUERY,
      variables: { searchTerm: e.target.value },
    });
    this.setState({
      mahasiswas: res.data.mahasiswas,
      loading: false,
    });
  }, 350);
  render() {
    resetIdCounter();
    return (
      <SearchStyles>
        <Downshift onChange={routeToItem} itemToString={item => (item === null ? '' : item.nim)}>
          {({
 getInputProps, getItemProps, isOpen, inputValue, highlightedIndex,
}) => (
  <div>
    <ApolloConsumer>
      {client => (
        <input
          {...getInputProps({
                      type: 'search',
                      placeholder: 'Cari mahasiswa...',
                      id: 'search',
                      className: this.state.loading ? 'loading' : '',
                      onChange: (e) => {
                        e.persist();
                        this.onChange(e, client);
                      },
                    })}
        />
                )}
    </ApolloConsumer>
    {isOpen && (
    <DropDown>
      {this.state.mahasiswas.map((item, index) => (
        <DropDownItem
          {...getItemProps({ item })}
          key={item.id}
          highlighted={index === highlightedIndex}
        >
          {item.nama} ({item.nim} )
        </DropDownItem>
                  ))}
      {!this.state.mahasiswas.length && !this.state.loading && (
      <DropDownItem> Nothing Found {inputValue}</DropDownItem>
                  )}
    </DropDown>
              )}
  </div>
          )}
        </Downshift>
      </SearchStyles>
    );
  }
}

export default AutoComplete;
