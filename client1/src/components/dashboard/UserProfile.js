import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import { getUserProfile, updateUserProfile, createUserProfile } from '../../services/api';
import '../../styles/UserProfile.css';

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState({
    name: '',
    dateOfBirth: '',
    gender: '',
    country: '',
    state: '',
    aadhaarNumber: '',
    bankName: '',
    ifscCode: '',
    accountNumber: '',
    cardNumber: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [profileExists, setProfileExists] = useState(false);

  const countryOptions = countryList().getData().map(country => ({
    value: country.value,
    label: country.label,
    flag: `https://flagcdn.com/24x18/${country.value.toLowerCase()}.png`
  }));

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      setIsLoading(true);
      const response = await getUserProfile();
      setUserProfile(response.data);
      setProfileExists(true);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setProfileExists(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserProfile(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleCountryChange = (selectedOption) => {
    setUserProfile(prevState => ({
      ...prevState,
      country: selectedOption ? selectedOption.value : ''
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!userProfile.name) newErrors.name = 'Name is required';
    if (!userProfile.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!userProfile.gender) newErrors.gender = 'Gender is required';
    if (!userProfile.country) newErrors.country = 'Country is required';
    if (!userProfile.state) newErrors.state = 'State is required';
    if (!userProfile.aadhaarNumber) newErrors.aadhaarNumber = 'Aadhaar number is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        if (profileExists) {
          await updateUserProfile(userProfile);
          alert('Profile updated successfully!');
        } else {
          await createUserProfile(userProfile);
          setProfileExists(true);
          alert('Profile created successfully!');
        }
      } catch (error) {
        console.error('Error saving user profile:', error);
        alert('Failed to save profile. Please try again.');
      }
    }
  };

  const CustomOption = ({ innerProps, label, data }) => (
    <div {...innerProps} className="country-option">
      <img src={data.flag} alt={`${label} flag`} className="country-flag" />
      <span>{label}</span>
    </div>
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <motion.div 
      className="user-profile-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <form onSubmit={handleSubmit} className="user-profile-form">
        <div className="form-section">
          <h2>Personal Information</h2>
          <motion.input 
            whileFocus={{ scale: 1.02 }}
            type="text" 
            name="name" 
            placeholder="Full Name" 
            value={userProfile.name} 
            onChange={handleInputChange} 
            required 
          />
          {errors.name && <span className="error">{errors.name}</span>}
          
          <motion.input 
            whileFocus={{ scale: 1.02 }}
            type="date" 
            name="dateOfBirth" 
            value={userProfile.dateOfBirth} 
            onChange={handleInputChange} 
            required 
          />
          {errors.dateOfBirth && <span className="error">{errors.dateOfBirth}</span>}
          
          <motion.select 
            whileFocus={{ scale: 1.02 }}
            name="gender" 
            value={userProfile.gender} 
            onChange={handleInputChange} 
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </motion.select>
          {errors.gender && <span className="error">{errors.gender}</span>}
          
          <Select
            options={countryOptions}
            value={countryOptions.find(option => option.value === userProfile.country)}
            onChange={handleCountryChange}
            placeholder="Select Country"
            components={{ Option: CustomOption }}
            styles={{
              control: (provided) => ({
                ...provided,
                '&:hover': { borderColor: '#007bff' },
              }),
              option: (provided) => ({
                ...provided,
                display: 'flex',
                alignItems: 'center',
              }),
            }}
            required
          />
          {errors.country && <span className="error">{errors.country}</span>}
          
          <motion.input 
            whileFocus={{ scale: 1.02 }}
            type="text" 
            name="state" 
            placeholder="State" 
            value={userProfile.state} 
            onChange={handleInputChange} 
            required 
          />
          {errors.state && <span className="error">{errors.state}</span>}
          
          <motion.input 
            whileFocus={{ scale: 1.02 }}
            type="text" 
            name="aadhaarNumber" 
            placeholder="Aadhaar Number" 
            value={userProfile.aadhaarNumber} 
            onChange={handleInputChange} 
            required 
          />
          {errors.aadhaarNumber && <span className="error">{errors.aadhaarNumber}</span>}
        </div>
        
        <div className="form-section">
          <h2>Bank Details (Optional)</h2>
          <motion.input 
            whileFocus={{ scale: 1.02 }}
            type="text" 
            name="bankName" 
            placeholder="Bank Name" 
            value={userProfile.bankName} 
            onChange={handleInputChange} 
          />
          <motion.input 
            whileFocus={{ scale: 1.02 }}
            type="text" 
            name="ifscCode" 
            placeholder="IFSC Code" 
            value={userProfile.ifscCode} 
            onChange={handleInputChange} 
          />
          <motion.input 
            whileFocus={{ scale: 1.02 }}
            type="text" 
            name="accountNumber" 
            placeholder="Account Number" 
            value={userProfile.accountNumber} 
            onChange={handleInputChange} 
          />
          <motion.input 
            whileFocus={{ scale: 1.02 }}
            type="text" 
            name="cardNumber" 
            placeholder="Card Number" 
            value={userProfile.cardNumber} 
            onChange={handleInputChange} 
          />
        </div>
        
        <motion.button 
          type="submit" 
          className="submit-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {profileExists ? 'Update Profile' : 'Create Profile'}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default UserProfile;