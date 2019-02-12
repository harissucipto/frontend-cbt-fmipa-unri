import React from 'react';
import styled from 'styled-components';
import InfoAkun from '../components/InfoAkun';
import PleaseSignIn from '../components/PleaseSignIn';

const Columns = styled.div`
  display: grid;
`;

const AkunPage = () => (
  <PleaseSignIn>
    <Columns>
      <InfoAkun />
    </Columns>
  </PleaseSignIn>
);

export default AkunPage;
