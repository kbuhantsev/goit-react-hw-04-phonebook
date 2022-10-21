//React
import React, { useState } from 'react';
import { useLocalStorage } from 'react-use';
//Styled
import Filter from './Filter/Filter';
import ContactForm from './ContactForm';
import Box from './Box';
import ContactsTable from './ContactsTable';
//External libs
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

export default function App() {
  const [contacts, setContacts] = useLocalStorage(
    STORAGE_KEY,
    INITIAL_STATE.contacts
  );
  const [filter, setFilter] = useState('');

  const onSubmit = ({ id, name, number }) => {
    const contact = {
      id,
      name,
      number,
    };
    console.log(contact);
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

  const filteredContacts = () => {
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    );
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

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}
