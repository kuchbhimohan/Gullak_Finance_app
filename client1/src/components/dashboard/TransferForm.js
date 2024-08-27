import React, { useState } from 'react';
import '../../styles/TransactionForm.css';

const TransferForm = () => {
  const [from, setFrom] = useState("Alice's wallet");
  const [to, setTo] = useState("Bob's wallet");
  const [currency, setCurrency] = useState('USD');
  const [date, setDate] = useState('2024-08-14');
  const [note, setNote] = useState('');

  const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'INR'];

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      transactionType: 'Transfer',
      from,
      to,
      currency,
      date,
      note
    };
    // TODO: Send formData to backend
    console.log('Transfer form submitted:', formData);
  };

  return (
    <div className="transaction-form-container">
      <h2 className="form-title">NEW TRANSFER</h2>
      <form onSubmit={handleSubmit} className="transaction-form">
        <div className="form-group">
          <label htmlFor="from">From</label>
          <select id="from" value={from} onChange={(e) => setFrom(e.target.value)}>
            <option value="Alice's wallet">Alice's wallet</option>
            {/* Add more wallet options here */}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="to">To</label>
          <select id="to" value={to} onChange={(e) => setTo(e.target.value)}>
            <option value="Bob's wallet">Bob's wallet</option>
            {/* Add more wallet options here */}
          </select>
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
          <label htmlFor="note">Note</label>
          <textarea
            id="note"
            placeholder="Add a note for this transfer"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows="2"
          />
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
        <button type="submit" className="submit-button">
          Add Transfer
        </button>
      </form>
    </div>
  );
};

export default TransferForm;