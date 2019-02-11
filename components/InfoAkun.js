import React from 'react';

import styled from 'styled-components';
import Head from 'next/head';

import User from './User';

const SingleItemStyles = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  box-shadow: ${props => props.theme.bs};
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  min-height: 800px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .details {
    margin: 3rem;
    font-size: 2rem;
  }
`;

const InfoAkun = () => (
  <User>
    {({ data: { me } }) => (
      <SingleItemStyles>
        <Head>
          <title>CBT FMIPA UNRI | {me.email}</title>
        </Head>

        <div className="details">
          <h2>Info Akun</h2>
          <p>Email: {me.email}</p>
        </div>
      </SingleItemStyles>
    )}
  </User>
);

export default InfoAkun;
