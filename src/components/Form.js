import React, { useState } from 'react';
import { firestore } from './db'; // Import the firestore instance from your firebase.js file
import './FormStyles.css';

const Form = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(await firestore.listCollections)

    try {
      // Add the form data to a 'contacts' collection in Firestore
      await firestore.collection('contact_details').add(formData);

      console.log('Form submitted successfully to Firestore');
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  return (
    <div className='form'>
      <form onSubmit={handleSubmit}>
        <label htmlFor='name'>Your Name</label>
        <input
          type='text'
          id='name'
          name='name'
          value={formData.name}
          onChange={handleChange}
        />

        <label htmlFor='email'>Email</label>
        <input
          type='email'
          id='email'
          name='email'
          value={formData.email}
          onChange={handleChange}
        />

        <label htmlFor='subject'>Subject</label>
        <input
          type='text'
          id='subject'
          name='subject'
          value={formData.subject}
          onChange={handleChange}
        />

        <label htmlFor='message'>Details</label>
        <textarea
          rows='6'
          id='message'
          name='message'
          placeholder='Type a short message here'
          value={formData.message}
          onChange={handleChange}
        />

        <button className='btn' type='submit'>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
