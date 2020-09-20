import React from 'react';

import { StyleSheet, ScrollView } from 'react-native';

import Category from './Category';

const Categories = ({ availableCategories, selectedCategory, onChange }) => {
  return (
    <ScrollView style={styles.categoriesList} horizontal>
      {availableCategories.map(category => (
        <Category
          key={category}
          category={category}
          selectedCategory={selectedCategory}
          onChange={onChange}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  categoriesList: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
});

export default Categories;