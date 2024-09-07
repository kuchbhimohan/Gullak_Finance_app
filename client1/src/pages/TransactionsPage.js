import React, { useState } from 'react';
import IncomeForm from '../components/dashboard/IncomeForm';
import ExpenseForm from '../components/dashboard/ExpenseForm';
import TransferForm from '../components/dashboard/TransferForm';
import '../styles/TransactionForm.css';

const TransactionsPage = () => {
  const [activeForm, setActiveForm] = useState('Expense');

  const renderForm = () => {
    switch (activeForm) {
      case 'Income':
        return <IncomeForm />;
      case 'Transfer':
        return <TransferForm />;
      default:
        return <ExpenseForm />;
    }
  };

  return (
    <div className="transactions-page">
      <h1>Transactions</h1>
      <div className="transaction-type-buttons">
        {['Expense', 'Transfer', 'Income'].map(type => (
          <button
            key={type}
            className={`type-button ${activeForm === type ? 'active' : ''}`}
            onClick={() => setActiveForm(type)}
          >
            {type}
          </button>
        ))}
      </div>
      {renderForm()}
    </div>
  );
};

export default TransactionsPage;