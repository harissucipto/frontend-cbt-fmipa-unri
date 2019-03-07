import React from 'react';
import Downshift, { resetIdCounter } from 'downshift';
import Router from 'next/router';
import { ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import debounce from 'lodash.debounce';
import { DropDown, DropDownItem, SearchStyles } from './styles/DropDown';

const SEARCH_DOSEN_QUERY = gql`
  query SEARCH_DOSEN_QUERY($searchTerm: String!) {
    dosens(where: { OR: [{ nip_contains: $searchTerm }, { nama_contains: $searchTerm }] }) {
      id
      nip
      nama
    }
  }
`;

function routeToItem(item) {
  Router.push({
    pathname: '/dosen/profil',
    query: {
      id: item.id,
    },
  });
}

class AutoComplete extends React.Component {
  state = {
    dosens: [],
    loading: false,
  };
  onChange = debounce(async (e, client) => {
    console.log('Searching...');
    // turn loading on
    this.setState({ loading: true });
    // Manually query apollo client
    const res = await client.query({
      query: SEARCH_DOSEN_QUERY,
      variables: { searchTerm: e.target.value },
    });
    this.setState({
      dosens: res.data.dosens,
      loading: false,
    });
  }, 350);
  render() {
    resetIdCounter();
    return (
      <SearchStyles>
        <Downshift
          onChange={(item) => {
            this.props.tambahDosen(item);
          }}
          itemToString={item => (item === null ? '' : item.nama)}
        >
          {({
 getInputProps, getItemProps, isOpen, inputValue, highlightedIndex,
}) => (
  <div>
    <ApolloConsumer>
      {client => (
        <input
          {...getInputProps({
                      type: 'search',
                      placeholder: 'Cari dosen...',
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
      {this.state.dosens.map((item, index) => (
        <DropDownItem
          {...getItemProps({ item })}
          key={item.id}
          ss
          highlighted={index === highlightedIndex}
        >
          {item.nama} ({item.nip} )
        </DropDownItem>
                  ))}
      {!this.state.dosens.length && !this.state.loading && (
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
