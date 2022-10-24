import React, { useState, useMemo } from 'react';
import { useLocalStorage } from 'react-use';
import Filter from 'components/Filter';
import ContactForm from 'components/ContactForm';
import Box from '../Box';
import ContactsTable from 'components/ContactsTable';
import { useTheme } from '@mui/material/styles';
import debounce from 'lodash.debounce';
import { ToastContainer, toast } from 'react-toastify';

const INITIAL_STATE = {
  contacts: [
    { id: '928fbg1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: '928fbg2', name: 'Hermione Kline', number: '443-89-12' },
    { id: '928fbg3', name: 'Eden Clements', number: '645-17-79' },
    { id: '928fbg4', name: 'Annie Copeland', number: '227-91-26' },
  ],
};

const STORAGE_KEY = 'contacts';

export default function PhoneBook() {
  const [contacts, setContacts] = useLocalStorage(
    STORAGE_KEY,
    INITIAL_STATE.contacts
  );
  const [filter, setFilter] = useState('');
  const theme = useTheme();

  const onSubmit = ({ id, name, number }) => {
    const contact = {
      id,
      name,
      number,
    };
    if (contacts.find(contact => contact.name === name)) {
      toast.warning(`${name} is already in contacts`, {});
      return;
    }
    setContacts([...contacts, contact]);
  };

  const onFilterChange = ({ value }) => {
    setFilter(value);
  };

  const onFilterChangeDebounced = debounce(onFilterChange, 500);

  const onDeleteContact = ({ id }) => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const filteredContacts = useMemo(() => {
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [contacts, filter]);

  return (
    <>
      <Box as={'h1'} mb={'10px'} color={theme.palette.text.primary}>
        Phonebook
      </Box>
      <ContactForm onSubmit={onSubmit} />
      <Box as={'h2'} mb={'0px'} color={theme.palette.text.primary}>
        Contacts
      </Box>
      <Filter onInput={onFilterChangeDebounced} />
      <ContactsTable contacts={filteredContacts} onDelete={onDeleteContact} />
      <ToastContainer position="top-right" autoClose={2000} theme="colored" />
    </>
  );
}
