import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/firebase/config';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    contactNumber: '',
    email: '',
    question: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: { target: { name: string; value: unknown; }; }) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const validateForm = () => {
    const { fullName, email, question } = formData;
    if (!fullName.trim()) {
      setError('Please enter your full name');
      return false;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address');
      return false;
    }
    if (!question.trim()) {
      setError('Please enter your question');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    try {
      // Add a new document to the 'queries' collection
      const docRef = await addDoc(collection(db, 'queries'), {
        ...formData,
        status: 'new', // You can add a status field
        createdAt: serverTimestamp() // Add server timestamp
      });

      console.log('Document written with ID: ', docRef.id);
      setSubmitted(true);
    } catch (err) {
      console.error('Error adding document: ', err);
      setError('An error occurred. Please try again.');
    }
  };

  if (submitted) {
    return (
      <div className="bg-[#D9D9D9] p-8 rounded-r-2xl text-center">
        <h3 className="text-2xl font-bold text-[#B80000] mb-4">
          Thank You!
        </h3>
        <p className="text-black">Your question has been submitted successfully.</p>
      </div>
    );
  }

  return (
    <div className="bg-[#D9D9D9] p-8 rounded-r-2xl">
      <h3 className="text-2xl font-bold text-[#B80000] mb-4 text-center">
        Questions
      </h3>
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-center">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          className="w-full mb-4 px-2 py-2 text-black rounded-lg"
          placeholder="Full Name"
        />
        <input
          type="tel"
          name="contactNumber"
          value={formData.contactNumber}
          onChange={handleChange}
          className="w-full mb-4 px-2 py-2 text-black rounded-lg"
          placeholder="Contact Number"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full mb-4 px-2 py-2 text-black rounded-lg"
          placeholder="Email"
        />
        <textarea
          name="question"
          value={formData.question}
          onChange={handleChange}
          className="w-full mb-4 px-2 py-2 text-black rounded-lg"
          placeholder="Question"
        ></textarea>
        <button 
          type="submit"
          className="w-full bg-[#B80000] text-white font-bold rounded-lg py-2 flex items-center justify-center"
        >
          <Send className="mr-2" size={20} />
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactForm;