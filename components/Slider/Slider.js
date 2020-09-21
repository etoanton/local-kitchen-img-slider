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
  const [currentPageNum, setCurrentPage] = useState(0);

  const onMomentumScrollEnd = useCallback(e => {
    const { contentOffset } = e.nativeEvent;
    const viewSize = e.nativeEvent.layoutMeasurement;
    const pageNum = Math.floor(contentOffset.x / viewSize.width);
    setCurrentPage(pageNum);
  }, [currentPageNum]);

  const normalizePageNumber = pageN => {
    if (pageN === menuItems.length) {
      return 0;
    } else if (pageN > menuItems.length) {
      return 1;
    } else if (pageN < 0) {
      return menuItems.length - 1;
    }
    return pageN;
  }

  useEffect(() => {
    const normalizedPageNum = normalizePageNumber(currentPageNum);
    if (selectedCategory !== menuItems[normalizedPageNum].category) {
      setCategory(menuItems[normalizedPageNum].category);
    }

    // support loop
    if (normalizedPageNum !== currentPageNum) {
      sliderRef.current.scrollToIndex({ index: normalizedPageNum, animated: false, });
    }
  }, [menuItems, currentPageNum, sliderRef])

  const handleCategoryChange = useCallback(nextCategory => {
    const idx = menuItems.findIndex(({ category }) => category === nextCategory);
    if (idx !== -1) {
      sliderRef.current.scrollToIndex({ index: idx, animated: false, });
      setCurrentPage(idx);
      setCategory(nextCategory);
    }
  }, [menuItems]);

  const { color } = menuItems[normalizePageNumber(currentPageNum)];

  const content = menuItems.concat(menuItems.slice(0, 2));

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
          data={content}
          renderItem={({ item }) => <SlideItem src={item.src} color={item.color} />}
          keyExtractor={item => item.id}
          ref={sliderRef}
          style={styles.imageSliderContainer}
          onMomentumScrollEnd={onMomentumScrollEnd}
          {...flatListConfig}
        />
      </View>
      <View style={styles.progressContainer}>
        <Progress
          menuItems={menuItems}
          selectedCategory={selectedCategory}
          currentPage={normalizePageNumber(currentPageNum)}
        />
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
