import React, { useEffect, useState } from 'react';
import Filter from './Filter/Filter';
import ContactForm from './ContactForm';
import debounce from 'lodash.debounce';
import Box from './Box';
import { useLocalStorage } from 'react-use';

//Material
import ContactsTable from './ContactsTable';

const INITIAL_STATE = {
  contacts: [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ],
};

const STORAGE_KEY = 'contacts';

export default function App() {
  const [contacts, setContacts] = useLocalStorage(STORAGE_KEY, []);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    if (contacts.length === 0) {
      setContacts(INITIAL_STATE.contacts);
    }
  }, []);

  const onSubmit = ({ id, name, number }) => {
    const contact = {
      id,
      name,
      number,
    };
    if (contacts.find(contact => contact.name === name)) {
      alert(`${name} is already in contacts`);
      return false;
    }
    setContacts(contacts => [...contacts, contact]);
    return true;
  };

  const onFilterChange = ({ value }) => {
    setFilter(value);
  };

  const onFilterChangeDebounced = debounce(onFilterChange, 500);

  const onDeleteContact = ({ id }) => {
    setContacts(contacts => contacts.filter(contact => contact.id !== id));
  };

  const filteredContacts = () => {
    return contacts.filter(({ name }) => {
      return name.toLowerCase().includes(filter.toLowerCase());
    });
  };

  return (
    <div style={{ marginLeft: '30px' }}>
      <Box as={'h1'} mb={'10px'}>
        Phonebook
      </Box>
      <ContactForm onSubmit={onSubmit} />

      <Box as={'h2'} mb={'0px'}>
        Contacts
      </Box>
      <Filter onInput={onFilterChangeDebounced} />

      <ContactsTable contacts={filteredContacts()} onDelete={onDeleteContact} />
    </div>
  );
}
