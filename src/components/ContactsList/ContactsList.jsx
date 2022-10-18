import React from 'react';
import PropTypes from 'prop-types';
import Contact from '../Contact';
import { UlStyled } from './ContactsList.styled';

function ContactList({ contacts, onDelete }) {
  return (
    <UlStyled>
      {contacts.map(({ id, name, number }) => (
        <Contact
          key={id}
          id={id}
          name={name}
          number={number}
          onDelete={onDelete}
        />
      ))}
    </UlStyled>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.shape),
  onDelete: PropTypes.func,
};

export default ContactList;
