import React, { useState } from 'react';
import '../../styles/TransactionForm.css';

const ExpenseForm = () => {
  const [from, setFrom] = useState("Alice's wallet");
  const [currency, setCurrency] = useState('USD');
  const [tags, setTags] = useState('');
  const [customTag, setCustomTag] = useState('');
  const [date, setDate] = useState('2024-08-14');
  const [note, setNote] = useState('');

  const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'INR'];
  const expenseTags = ['Grocery', 'Rent', 'Restaurant', 'Income Tax', 'Social Security', 'Utilities', 'Food', 'Shopping', 'Vacation', 'Clothes'];

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      transactionType: 'Expense',
      from,
      currency,
      tags: tags || customTag,
      date,
      note
    };
    // TODO: Send formData to backend
    console.log('Expense form submitted:', formData);
  };

  const handleTagChange = (e) => {
    if (e.target.value === 'custom') {
      setTags('');
    } else {
      setTags(e.target.value);
      setCustomTag('');
    }
  };

  return (
    <div className="transaction-form-container">
      <h2 className="form-title">NEW EXPENSE</h2>
      <form onSubmit={handleSubmit} className="transaction-form">
        <div className="form-group">
          <label htmlFor="from">From</label>
          <select id="from" value={from} onChange={(e) => setFrom(e.target.value)}>
            <option value="Alice's wallet">Alice's wallet</option>
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
          <label htmlFor="tags">Tags</label>
          <div className="tags-container">
            <select value={tags} onChange={handleTagChange} className="tags-select">
              <option value="">Select a tag</option>
              {expenseTags.map(tag => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
              <option value="custom">Custom</option>
            </select>
            {tags === '' && (
              <input
                type="text"
                value={customTag}
                onChange={(e) => setCustomTag(e.target.value)}
                placeholder="Enter custom tag"
                className="custom-tag-input"
              />
            )}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="note">Note</label>
          <textarea
            id="note"
            placeholder="Add a note for this expense"
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
          Add Expense
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;