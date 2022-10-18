import React, { Component } from 'react';
import Filter from './Filter/Filter';
import ContactForm from './ContactForm';
import debounce from 'lodash.debounce';
import * as storage from '../utils/storage';
import Box from './Box';

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
export class App extends Component {
  state = { contacts: [], filter: '' };
  STORAGE_KEY = 'contacts';

  componentDidMount() {
    const contacts = storage.load(this.STORAGE_KEY);
    if (contacts) {
      this.setState({ contacts: contacts });
    } else {
      this.setState({ contacts: INITIAL_STATE.contacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const nextContacts = this.state.contacts;
    const prevContacts = prevState.contacts;

    if (nextContacts !== prevContacts) {
      storage.save(this.STORAGE_KEY, nextContacts);
    }
  }

  onSubmit = ({ id, name, number }) => {
    const contact = {
      id,
      name,
      number,
    };
    if (this.state.contacts.find(contact => contact.name === name)) {
      alert(`${name} is already in contacts`);
      return false;
    }
    this.setState(({ contacts }) => ({ contacts: [...contacts, contact] }));
    return true;
  };

  onFilterChange = ({ value }) => {
    this.setState({ filter: value });
  };

  onFilterChangeDebounced = debounce(this.onFilterChange, 500);

  onDeleteContact = ({ id }) => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const { contacts, filter } = this.state;
    let filteredContacts = contacts;
    if (filter) {
      filteredContacts = contacts.filter(({ name }) => {
        return name.toLowerCase().includes(filter.toLowerCase());
      });
    }
    return (
      <div style={{ marginLeft: '30px' }}>
        <Box as={'h1'} mb={'10px'}>
          Phonebook
        </Box>
        <ContactForm onSubmit={this.onSubmit} />

        <Box as={'h2'} mb={'0px'}>
          Contacts
        </Box>
        <Filter onInput={this.onFilterChangeDebounced} />

        <ContactsTable
          contacts={filteredContacts}
          onDelete={this.onDeleteContact}
        />
      </div>
    );
  }
}
