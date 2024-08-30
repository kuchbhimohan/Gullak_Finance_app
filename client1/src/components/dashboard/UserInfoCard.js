import React, { useState, useEffect } from 'react';
import { Card, Button, Statistic, Row, Col, Spin } from 'antd';
import { UserOutlined, WalletOutlined, SwapOutlined } from '@ant-design/icons';
import { getUserInfo, getTransactionCounts } from '../../services/api';

const UserInfoCard = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [transactionCounts, setTransactionCounts] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
        try {
          setLoading(true);
          setError(null);
      
          let userInfoResponse, transactionCountsResponse;
      
          try {
            userInfoResponse = await getUserInfo();
            console.log('User Info Response:', userInfoResponse);
          } catch (userInfoError) {
            console.error('Error fetching user info:', userInfoError);
            console.error('User Info Error Response:', userInfoError.response);
            throw new Error('Failed to fetch user info');
          }
      
          try {
            transactionCountsResponse = await getTransactionCounts();
            console.log('Transaction Counts Response:', transactionCountsResponse);
          } catch (transactionCountsError) {
            console.error('Error fetching transaction counts:', transactionCountsError);
            console.error('Transaction Counts Error Response:', transactionCountsError.response);
            throw new Error('Failed to fetch transaction counts');
          }
      
          setUserInfo(userInfoResponse.data);
          setTransactionCounts(transactionCountsResponse.data);
        } catch (error) {
          console.error('Error in fetchData:', error);
          setError('Failed to load user information. Please try again later.');
        } finally {
          setLoading(false);
        }
      };

    fetchData();
  }, []);

  if (loading) {
    return <Card><Spin size="large" /></Card>;
  }

  if (error) {
    return <Card><p>{error}</p></Card>;
  }

  if (!userInfo || !transactionCounts) {
    return <Card><p>No user information available.</p></Card>;
  }

  return (
    <Card
      title={<h2><UserOutlined  /> User Information</h2>}
      extra={
        <Button type="primary" onClick={() => setShowDetails(!showDetails)}>
          {showDetails ? 'Hide Details' : 'Show Details'}
        </Button>
      }
      style={{ width: '100%', marginBottom: '20px' }}
    >
      <Row gutter={16}>
        <Col span={12}>
          <Statistic title="Name" value={userInfo.name} />
        </Col>
        <Col span={12}>
          <Statistic 
            title="Current Balance" 
            value={userInfo.currentBalance} 
            prefix={<WalletOutlined />} 
            precision={2}
          />
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: '20px' }}>
        <Col span={12}>
          <Statistic 
            title="Total Transactions" 
            value={transactionCounts.total} 
            prefix={<SwapOutlined />} 
          />
        </Col>
        <Col span={12}>
          <Statistic title="Gender" value={userInfo.gender} />
        </Col>
      </Row>
      {showDetails && (
        <Row gutter={16} style={{ marginTop: '20px' }}>
          <Col span={8}>
            <Statistic title="Income Transactions" value={transactionCounts.income} />
          </Col>
          <Col span={8}>
            <Statistic title="Expense Transactions" value={transactionCounts.expense} />
          </Col>
          <Col span={8}>
            <Statistic title="Transfer Transactions" value={transactionCounts.transfer} />
          </Col>
        </Row>
      )}
    </Card>
  );
};

export default UserInfoCard;