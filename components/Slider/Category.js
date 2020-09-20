import React from 'react';

import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const Category = ({ selectedCategory, category, onChange }) => {
  const textStyle = {
    ...styles.categoryItem,
    ...(selectedCategory === category ? styles.categoryItem__active : {})
  };

  return (
    <TouchableOpacity style={styles.categoryItemContainer} onPress={() => onChange(category)}>
      <Text style={textStyle}>{category}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  categoryItemContainer: {
    paddingRight: 10,
  },
  categoryItem: {
    color: '#afafaf',
  },
  categoryItem__active: {
    color: '#616161',
  },
});

export default Category;