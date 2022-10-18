import React from 'react';
import PropTypes from 'prop-types';
import { TextFieldStyled } from './Filter.styled';

function Filter({ onInput }) {
  const handleInput = event => {
    const value = event.target.value;
    onInput({ value });
  };

  return (
    <TextFieldStyled
      id="search"
      name="search"
      label="Find contacts by name"
      variant="standard"
      sx={{ marginBottom: '10px', width: '300px' }}
      onChange={handleInput}
    />
  );
}

Filter.propTypes = {
  onInput: PropTypes.func,
};

export default Filter;
