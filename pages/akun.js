import React from 'react';
import styled from 'styled-components';
import InfoAkun from '../components/InfoAkun';
import PleaseSignIn from '../components/PleaseSignIn';

const Columns = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
`;

const AkunPage = () => (
  <PleaseSignIn>
    <Columns>
      <InfoAkun />
      <div>
        <h2>Update Akun</h2>
      </div>
    </Columns>
  </PleaseSignIn>
);

export default AkunPage;
