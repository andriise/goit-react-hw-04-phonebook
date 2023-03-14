import { nanoid } from 'nanoid';
import { useState } from 'react';
import { Form, FormContainer, FormButton } from './PhonebookForm.styled';
import { Formik, Field } from 'formik';
export const PhonebookForm = ({ onAddContact }) => {
  const [contacts, setContacts] = useState([
    { id: nanoid(), name: '', number: '' },
  ]);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleSubmit = values => {
    values.preventDefault();
    const contact = {
      id: nanoid(),
      name: values.name,
      number: values.number,
    };
    setContacts([...contacts, contact]);
    setName('');
    setNumber('');
    onAddContact(name, number);
  };
  return (
    <FormContainer>
      <h2>Phonebook</h2>
      <Formik
        initialValues={{ name: '' }}
        onSubmit={(values, actions) => {
          onAddContact({
            ...values,
            id: nanoid(),
          });
          actions.resetForm();
        }}
      >
        <Form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <Field
            type="text"
            name="name"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <label htmlFor="number">Number</label>
          <Field
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={number}
            onChange={e => setNumber(e.target.value)}
          />

          <FormButton type="submit">Add contact</FormButton>
        </Form>
      </Formik>
    </FormContainer>
  );
};
