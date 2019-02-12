import styled from 'styled-components';
import React from 'react';

import PropTypes from 'prop-types';
import { Alert } from 'antd';

const DisplayError = ({ error }) => {
  if (!error || !error.message) return null;
  if (error.networkError && error.networkError.result && error.networkError.result.errors.length) {
    return error.networkError.result.errors.map((error, i) => (
      <Alert message={error.message.replace('GraphQL error: ', 'Shoot! ')} type="error" style={{ marginBottom: '5px'}} />
    ));
  }
  return <Alert message={error.message.replace('GraphQL error: ', 'Shoot! ')} type="error" style={{ marginBottom: '5px'}} />;
};

DisplayError.defaultProps = {
  error: {},
};

DisplayError.propTypes = {
  error: PropTypes.object,
};

export default DisplayError;
