import { Component } from 'react';
import { nanoid } from 'nanoid';
import { PhonebookForm } from './PhonebookForm/PhonebookForm';
import { PhonebookContacts } from './PhonebookContacts/PhonebookContacts';
import { Filter } from './Filter/Filter';
import { Container } from './App.styled';
import { server } from './server';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const saveContact = localStorage.getItem('contacts');
    if (saveContact) {
      const contactsParse = JSON.parse(saveContact);
      this.setState({ contacts: contactsParse });
      return;
    }
    this.setState({ contacts: server });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  onSubmit = (name, number) => {
    const contact = {
      id: nanoid().toString(),
      name,
      number,
    };

    if (
      this.state.contacts.find(
        item => item.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      alert(`${name} is already in contacts`);
      return;
    }

    this.setState({
      contacts: [...this.state.contacts, contact],
    });
  };

  onChange = e => {
    this.setState({ filter: e.target.value }, this.filterName);
  };

  filterName() {
    const valueFilter = this.state.filter.toLowerCase();
    const contacts = this.state.contacts;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(valueFilter)
    );
  }

  deleteContact = id => {
    const contacts = this.state.contacts;
    this.setState(() => ({
      contacts: contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    return (
      <Container>
        <PhonebookForm onAddContact={this.onSubmit} />
        <Filter value={this.filter} onChange={this.onChange} />
        <PhonebookContacts
          contacts={this.filterName()}
          onDeleteContact={this.deleteContact}
        />
      </Container>
    );
  }
}
