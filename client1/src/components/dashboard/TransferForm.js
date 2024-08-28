import React, { useState, useEffect } from 'react';
// import { createTransfer, getUserProfile } from '../../services/api';
import { getUserProfile } from '../../services/api';
import '../../styles/TransactionForm.css';
import { createTransfer} from '../../services/api';

const TransferForm = () => {
  const [to, setTo] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [note, setNote] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [userId, setUserId] = useState(null);

  const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'INR'];

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await getUserProfile(); // Fetch user profile
        setUserId(response.data.user); // Set user ID from response
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserId();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!userId) {
      setError('User not authenticated');
      return;
    }

    const formData = {
      to,
      amount: parseFloat(amount),
      currency,
      date,
      note,
      user: userId // Include user ID in the form data
    };

    try {
      const response = await createTransfer(formData);
      console.log('Transfer form submitted:', response.data);
      setSuccess('Transfer added successfully!');
      resetForm();
    } catch (err) {
      console.error('Error submitting transfer:', err);
      if (err.response?.data?.message === 'Insufficient funds in the account') {
        alert('Insufficient funds in the account. Please enter a smaller amount.');
      } else {
        setError(err.response?.data?.message || 'Failed to add transfer. Please try again.');
      }
    }
  };

  const resetForm = () => {
    setTo('');
    setAmount('');
    setCurrency('USD');
    setDate(new Date().toISOString().slice(0, 10));
    setNote('');
  };

  return (
    <div className="transaction-form-container">
      <h2 className="form-title">NEW TRANSFER</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <form onSubmit={handleSubmit} className="transaction-form">
        <div className="form-group">
          <label htmlFor="to">To (Receiver's Name)</label>
          <input
            id="to"
            type="text"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder="Enter receiver's name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            required
            min="0"
            step="0.01"
          />
        </div>
        <div className="form-group">
          <label htmlFor="currency">Currency</label>
          <select id="currency" value={currency} onChange={(e) => setCurrency(e.target.value)}>
            {currencies.map(curr => (
              <option key={curr} value={curr}>{curr}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="note">Note</label>
          <textarea
            id="note"
            placeholder="Add a note for this transfer"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows="2"
          />
        </div>
        <button type="submit" className="submit-button">
          Add Transfer
        </button>
      </form>
    </div>
  );
};

export default TransferForm;