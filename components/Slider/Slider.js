import React, { useState, useCallback, useRef, useEffect } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';

import Categories from './Categories';
import SlideItem from './SlideItem';
import Progress from './Progress';

const getCategories = items => {
  const uniqueCategories = items.reduce((acc, item) => (acc[item.category] = item, acc), {})
  return Object.keys(uniqueCategories);
};

const flatListConfig = {
  horizontal: true,
  pagingEnabled: true,
  initialNumToRender: 3,
  showsHorizontalScrollIndicator: false,
  initialScrollIndex: 0,
};

const Slider = ({ menuItems }) => {
  const availableCategories = getCategories(menuItems);

  const sliderRef = useRef(null);
  const [selectedCategory, setCategory] = useState(availableCategories[0]);
  const [currentPage, setCurrentPage] = useState(0);

  const onMomentumScrollEnd = useCallback(e => {
    console.log('onMomentumScrollEnd');
    const { contentOffset } = e.nativeEvent;
    const viewSize = e.nativeEvent.layoutMeasurement;
    const pageNum = Math.floor(contentOffset.x / viewSize.width);
    setCurrentPage(pageNum);
  }, [currentPage]);

  const onScroll = e => {
    console.log('onScroll');
    const { contentOffset } = e.nativeEvent;
    const viewSize = e.nativeEvent.layoutMeasurement;
    const maxWidth = viewSize.width * (menuItems.length - 1);

    if (contentOffset.x > maxWidth) {
      setTimeout(() => {
        sliderRef.current.scrollToIndex({ index: 0, animated: false });
        setCurrentPage(0);
      }, 0)
    }

    if (contentOffset.x < 0) {
      setTimeout(() => {
        sliderRef.current.scrollToIndex({ index: menuItems.length - 1, animated: false });
        setCurrentPage(menuItems.length - 1);
      }, 0)
    }
  };

  useEffect(() => {
    if (selectedCategory !== menuItems[currentPage].category) {
      setCategory(menuItems[currentPage].category);
    }
  }, [menuItems, currentPage])

  const handleCategoryChange = useCallback(nextCategory => {
    const idx = menuItems.findIndex(({ category }) => category === nextCategory);
    if (idx !== -1) {
      sliderRef.current.scrollToIndex({ index: idx, animated: false, });
      setCurrentPage(idx);
      setCategory(nextCategory);
    }
  }, [menuItems]);

  const { color } = menuItems[currentPage];

  return (
    <View style={styles.sliderContainer}>
      <View style={styles.categoriesContainer}>
        <Categories
          availableCategories={availableCategories}
          selectedCategory={selectedCategory}
          onChange={handleCategoryChange}
        />
      </View>
      <View style={styles.backgroundContainer} backgroundColor={color} />
      <View style={styles.contentContainer}>
        <FlatList
          data={menuItems}
          renderItem={({ item }) => <SlideItem src={item.src} color={item.color} />}
          keyExtractor={item => item.id}
          ref={sliderRef}
          style={styles.imageSliderContainer}
          onScroll={onScroll}
          onMomentumScrollEnd={onMomentumScrollEnd}
          {...flatListConfig}
        />
      </View>
      <View style={styles.progressContainer}>
        <Progress menuItems={menuItems} selectedCategory={selectedCategory} currentPage={currentPage} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sliderContainer: {
    height: 320,
    position: 'relative',
  },
  categoriesContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 250,
  },
  contentContainer: {
    paddingTop: 20,
  },
  imageSliderContainer: {},
  progressContainer: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    alignItems: 'center',
    // zIndex: 10,
  },
});

export default Slider;
