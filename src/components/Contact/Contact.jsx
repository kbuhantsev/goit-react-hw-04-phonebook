import React from 'react';
import PropTypes from 'prop-types';
import { LiStyled } from './Contact.styled';

function Contact({ id, name, number, onDelete }) {
  return (
    <LiStyled>
      <span>
        {name}: {number}
      </span>
      <button name="delete" type="button" onClick={() => onDelete({ id })}>
        Delete
      </button>
    </LiStyled>
  );
}
Contact.propTypes = {
  name: PropTypes.string,
  number: PropTypes.string,
  onDelete: PropTypes.func,
};

export default Contact;
