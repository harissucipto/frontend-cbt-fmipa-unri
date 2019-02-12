import React from 'react';
import styled from 'styled-components';
import InfoAkun from '../components/InfoAkun';
import PleaseSignIn from '../components/PleaseSignIn';

const Columns = styled.div`
  display: grid;
`;

const AkunPage = () => (
  <Columns>
    <InfoAkun />
  </Columns>
);

export default AkunPage;
