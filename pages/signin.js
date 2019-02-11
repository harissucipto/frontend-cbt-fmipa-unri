import React from 'react';
import styled from 'styled-components';
import Signin from '../components/Signin';
import Signinup from '../components/Signup';

const Columns = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
`;

const LoginPage = () => (
  <Columns>
    <Signin />
    <Signinup />
  </Columns>
);

export default LoginPage;
