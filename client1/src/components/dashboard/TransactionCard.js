import React, { useState, useEffect } from 'react';
import { Card, Table, Typography, message } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined, SwapOutlined } from '@ant-design/icons';
import { getRecentTransactions } from '../../services/api';
import '../../styles/TransactionCard.css';

const { Title } = Typography;

const TransactionCard = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const response = await getRecentTransactions(1, 5);
      setTransactions(response.transactions);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      message.error('Failed to fetch transactions');
    }
    setLoading(false);
  };

  const columns = [
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type) => {
        const icons = {
          income: <ArrowUpOutlined style={{ color: '#52c41a' }} />,
          expense: <ArrowDownOutlined style={{ color: '#f5222d' }} />,
          transfer: <SwapOutlined style={{ color: '#1890ff' }} />
        };
        const color = type === 'income' ? '#52c41a' : '#f5222d';
        return <span style={{ color }}>{icons[type]} {type.charAt(0).toUpperCase() + type.slice(1)}</span>;
      },
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount, record) => {
        const color = record.type === 'income' ? '#52c41a' : '#f5222d';
        return <span style={{ color, fontWeight: 'bold' }}>${amount.toFixed(2)}</span>;
      },
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Note',
      dataIndex: 'note',
      key: 'note',
      ellipsis: true,
    },
  ];

  return (
    <Card
      title={<Title level={4}>Recent Transactions</Title>}
      className="transaction-card"
    >
      <Table
        dataSource={transactions}
        columns={columns}
        rowKey="_id"
        pagination={false}
        size="small"
        loading={loading}
      />
    </Card>
  );
};

export default TransactionCard;
