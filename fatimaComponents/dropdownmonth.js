import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';


import colors from '../components/colors'
const DropdownMonth = ({ onSelectMonth }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState('');

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleSelectMonth = (month) => {
    setSelectedMonth(month);
    onSelectMonth(month);
    toggleDropdown();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.dropdownButton} onPress={toggleDropdown}>
        <Text style={styles.dropdownButtonText}>{selectedMonth || 'Select Month'}</Text>
      </TouchableOpacity>
      {showDropdown && (
        <View style={styles.dropdown}>
          {months.map((month, index) => (
            <TouchableOpacity
              key={index}
              style={styles.dropdownItem}
              onPress={() => handleSelectMonth(month)}
            >
              <Text style={styles.dropdownItemText}>{month}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    backgroundColor:colors.dark,
    borderRadius:30,
    

  },
  dropdownButton: {
    padding: 10,
  
    borderRadius: 5,
    alignItems: 'center',
  },
  dropdownButtonText: {
    
    color: 'white',
    fontSize: 16,
  },
  dropdown: {
    marginTop: 5,
    backgroundColor: 'white',
    borderRadius: 5,
    elevation: 3,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    
  },
  dropdownItemText: {
    fontSize: 16,
    color:colors.dark,
    
  },
});

export default DropdownMonth;