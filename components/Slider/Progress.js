import React from 'react';

import { StyleSheet, View } from 'react-native';

const Progress = ({ menuItems, selectedCategory, currentPage }) => {
  const offset = menuItems.findIndex(({ category }) => category === selectedCategory);
  const categoryItems = menuItems.slice(offset).filter(({ category }) => category === selectedCategory);

  const activeIdx = currentPage - offset;

  return (
    <View style={styles.container}>
      {Array.from(Array(categoryItems.length)).map((_, idx) => (
        <View key={idx} style={styles.itemContainer}>
          <View style={idx === activeIdx ? { ...styles.item, ...styles.item__active } : styles.item} />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  itemContainer: {
    paddingHorizontal: 3,
  },
  item: {
    backgroundColor: '#afafaf',
    width: 4,
    height: 4,
    borderRadius: 2,
  },
  item__active: {
    backgroundColor: '#000000',
  }
});

export default Progress;