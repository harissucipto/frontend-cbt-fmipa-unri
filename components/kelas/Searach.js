import React from 'react';
import Downshift, { resetIdCounter } from 'downshift';
import Router from 'next/router';
import { ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import debounce from 'lodash.debounce';
import { DropDown, DropDownItem, SearchStyles } from '../styles/DropDown';

const SEARCH_KELAS_QUERY = gql`
  query SEARCH_KELAS_QUERY($searchTerm: String!) {
    kelases(where: { OR: [{ nama_contains: $searchTerm }] }) {
      id
      nama
      mataKuliah {
        nama
      }
      tahunAjaran
    }
  }
`;

function routeToItem(item) {
  Router.push({
    pathname: '/kelas/profil',
    query: {
      id: item.id,
    },
  });
}

class AutoComplete extends React.Component {
  state = {
    kelases: [],
    loading: false,
  };
  onChange = debounce(async (e, client) => {
    console.log('Searching...');
    // turn loading on
    this.setState({ loading: true });
    // Manually query apollo client
    const res = await client.query({
      query: SEARCH_KELAS_QUERY,
      variables: { searchTerm: e.target.value },
    });
    this.setState({
      kelases: res.data.kelases,
      loading: false,
    });
  }, 350);
  render() {
    resetIdCounter();
    return (
      <SearchStyles>
        <Downshift onChange={routeToItem} itemToString={item => (item === null ? '' : item.email)}>
          {({
 getInputProps, getItemProps, isOpen, inputValue, highlightedIndex,
}) => (
  <div>
    <ApolloConsumer>
      {client => (
        <input
          {...getInputProps({
                      type: 'search',
                      placeholder: 'Cari kelas...',
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
      {this.state.kelases.map((item, index) => (
        <DropDownItem
          {...getItemProps({ item })}
          key={item.id}
          highlighted={index === highlightedIndex}
        >
          {item.nama}
        </DropDownItem>
                  ))}
      {!this.state.kelases.length && !this.state.loading && (
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
